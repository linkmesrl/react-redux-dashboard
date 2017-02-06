import { takeEvery, delay } from 'redux-saga';
import { call, put, select, race, take } from 'redux-saga/effects';
import * as actions from 'actions';

import { Api, appConfigs } from 'util/Api';
import dashboards from 'util/dashboards';
import pluginsConfig from 'util/plugins';
import endpoints from 'util/endpoints';
import uniqid from 'uniqid';
let pluginsLoaded;

/* Require plugin index from disk */
function* loadPluginsFromDisk() {
  const requirePlugin = (indexJSPath) => new Promise((resolve) => {
    const indexJS = indexJSPath.substring(2, indexJSPath.length);
    return require.ensure([], require => {
      const result = require(`plugins/${indexJS}`);
      resolve(result);
    });
  });

  yield put(actions.resetPlugins());
  const pluginsPackages = require.context('../plugins/', true, /[^\/]+\/index\.js$/);
  pluginsLoaded = yield Promise.all(pluginsPackages.keys().map((item) => requirePlugin(item)));
  for (let i = 0; i < pluginsLoaded.length; i++) {
    yield put(actions.addPlugin(pluginsLoaded[i].default));
  }
}

/* Inital plugins load */
function* loadPlugins() {
  try {
    /* Load plugins from disk */
    yield loadPluginsFromDisk();

    /* Load dashboards config */
    for (let j = 0; j < dashboards.length; j++) {
      let getDashboard = (state) => state.dashboardsReducer.dashboards.filter(
        dashboard => dashboard.name === dashboards[j].name
      );
      let dashboardData = yield select(getDashboard);
      if(dashboardData[0] && dashboardData[0].plugins.length === 0) {
        for (let k = 0; k < dashboards[j].plugins.length; k++) {
          yield put(actions.addPluginInDashboard({
            dashboard: dashboards[j].name,
            plugin: dashboards[j].plugins[k],
            updateDashboard: (k === dashboards[j].plugins.length - 1)
          }));
        }
      }
    }
  } catch (e) {
    yield put({ type: "LOAD_PLUGINS_FAILED", message: e.message });
  }
}

function* loadDashboardPlugins(action) {
  try {
    /* Load plugins from disk */
    yield loadPluginsFromDisk();

    yield put({ type: 'CANCEL_POLLING' });
    /* Get dashboard plugins */
    const getDashboard = (state) => state.dashboardsReducer.dashboards.filter(
      dashboard => dashboard.name === action.name
    );
    const dashboardData = yield select(getDashboard);

    if(pluginsLoaded.length > 0) {
      yield addDashboardPlugins(pluginsLoaded, dashboardData);
    }
  } catch (e) {
    yield put({ type: "LOAD_PLUGINS_FAILED", message: e.message });
  }
}

/* Render plugins loaded for different dashboards */
function* addDashboardPlugins(plugins, dashboardData) {
  let pluginsConfig = [];
  if(dashboardData[0]) {
    for (let i = 0; i < dashboardData[0].plugins.length; i++) {
      let pluginConfig = {
        dashboard: dashboardData[0].name,
        plugin: dashboardData[0].plugins[i]
      };
      const component = plugins.filter(
        plugin => plugin.default.WrappedComponent.displayName === pluginConfig.plugin.name
      );
      pluginConfig.plugin.component = component[0].default;
      pluginsConfig.push({
        ...pluginConfig
      });
    }
    for(let j = 0; j < pluginsConfig.length; j++) {
      yield put(actions.renderDashboardPlugin({
        uuid: pluginsConfig[j].plugin.uuid,
        name: pluginsConfig[j].plugin.name,
        title: pluginsConfig[j].plugin.title,
        component: pluginsConfig[j].plugin.component,
        config: {
          endpoints: pluginsConfig[j].plugin.config.endpoints
        },
        dashboard: pluginsConfig[j].dashboard,
        data: [],
        layout: pluginsConfig[j].plugin.layout
      }));
    }
  }
}

/* Load plugin configuration from REST APIs and save it */
function* loadAndSavePluginData(action) {
  try {
    const pluginData = action.pluginConfig.config;
    let data = [];
    for(let i = 0; i < pluginData.endpoints.length; i++) {
      const endpointsData = pluginData.endpoints;
      const params = {
        endpoint: endpoints[endpointsData[i].url].url
      };
      const dataFromEndpoint = yield loadFromServer(params);
      data.push({
        label: endpointsData[i].label,
        color: endpointsData[i].color,
        data: dataFromEndpoint,
        endpoint: endpointsData[i].url,
        mapping: endpointsData[i].mapping,
        columns: endpointsData[i].columns
      });
    }
    const pluginConfig = {
      ...action.pluginConfig,
      data
    }
    yield put(actions.updateDashboardPlugin(pluginConfig));
  } catch(e) {
    console.log(e);
  }
}

/* Update dashboard without re-rendering plugins */
function* updateDashboard(action) {
  try {
    yield put({ type: 'CANCEL_POLLING' });
    const getDashboard = (state) => state.dashboardsReducer.dashboards.filter(
      dashboard => dashboard.name === action.dashboard.name
    );
    let dashboardData = yield select(getDashboard);
    for (let i = 0; i < dashboardData[0].plugins.length; i++) {
      yield put(actions.loadPluginsData(dashboardData[0].plugins[i]));
    }
  } catch (e) {
    yield put({ type: "UPDATE_DASHBOARD_FAILED", message: e.message });
  }
}

/* Get plugins list */
function* getDashboardPluginsList(action) {
  yield put(actions.getDashboardModal({
    pluginLabel: 'Add Plugin',
    dashboard: action.dashboard.name,
    result: pluginsConfig,
    type: "addPlugin"
  }));
}

/* Open dashboard modal */
function* openDashboardModal(action) {
  try {
    let result;
    const label = action.data.label ? action.data.label : '';

    let endpointModal;
    if(action.data.endpoint) {
      if(action.data.custom.endpoint) {
        endpointModal = endpoints[action.data.endpoint].url;
        action.data.custom.values.forEach(val => {
          endpointModal += "/" + val;
        });
      } else {
        const lastIndexOfSlash = endpoints[action.data.endpoint].url.lastIndexOf('/') + 1;
        const endpointOffset = action.data.label ? 0 : 1;
        endpointModal = endpoints[action.data.endpoint].url.substr(0, lastIndexOfSlash - endpointOffset);
        if(action.data.label) {
          endpointModal += action.data.label;
        }
      }
      const params = {
        endpoint: endpointModal
      };
      result = yield loadFromServer(params);
    }

    if(action.data.result) {
      result = action.data.result;
    }
    yield put(actions.openDashboardModal({
      pluginLabel: action.data.pluginLabel,
      dashboard: action.data.dashboard,
      columns: action.data.columns || [],
      label: label,
      data: result || [],
      show: true,
      type: action.data.type
    }));
  } catch (e) {
    console.log(e);
  }
}

function* addPluginInDashboard(pluginToAdd) {
  // Plugins
  const getPlugins = (state) => state.pluginsReducer.plugins;
  const pluginsList = yield select(getPlugins);
  // Dashboard data
  const getDashboard = (state) => state.dashboardsReducer.dashboards.filter(
    dashboard => dashboard.name === pluginToAdd.action.dashboard
  );
  const dashboardData = yield select(getDashboard);

  let pluginLayout;
  if(pluginToAdd.action.plugin.layout.x && pluginToAdd.action.plugin.layout.y) {
    pluginLayout = pluginToAdd.action.plugin.layout;
  } else {
    pluginLayout = {
      x: 0,
      y: Infinity,
      ...pluginToAdd.action.plugin.layout
    };
  }

  let pluginConfig = {
    uuid: uniqid(),
    name: pluginToAdd.action.plugin.name,
    title: pluginToAdd.action.plugin.title,
    dashboard: dashboardData[0].name,
    config: {
      endpoints: pluginToAdd.action.plugin.endpoints
    },
    data: [],
    layout: pluginLayout
  };

  const pluginComponent = pluginsList.filter(
    plugin => plugin.component.WrappedComponent.displayName === pluginToAdd.action.plugin.name
  );
  pluginConfig.component = pluginComponent[0].component;

  yield put(actions.addDashboardPlugin({ ...pluginConfig }));

  if(pluginToAdd.action.updateDashboard) {
    yield put(actions.updateDashboard({ name: dashboardData[0].name }));
    yield put(actions.closeDashboardModal({ dashboard: dashboardData[0].name }));
  }
}

function* removePluginInDashboard(pluginToRemove) {
  yield put(actions.removeDashboardPlugin({
    uuid: pluginToRemove.action.uuid,
    dashboard: pluginToRemove.action.dashboard
  }));
}

/* Call to REST API to retreive data */
function* loadFromServer(params) {
  const { result, error } = yield call(Api.fetchData, params);
  if(result) {
    return result;
  } else {
    yield put({ type: 'LOAD_PLUGIN_SERVER_DATA_FAILED', error });
  }
}

function* pollData(action) {
  while (true) {
    yield put(actions.loadPluginsDataSucceded(action.pluginConfig));
    yield call(delay, appConfigs.refreshInterval);
  }
}

function* watchPollData(action, cancelAction) {
  yield race({
    task: pollData(action),
    cancel: take('CANCEL_POLLING')
  })
}

export default function* pluginSaga() {
  yield takeEvery('LOAD_PLUGINS_REQUESTED', loadPlugins);
  yield takeEvery('LOAD_DASHBOARD_PLUGINS_REQUESTED', loadDashboardPlugins);
  yield takeEvery('LOAD_PLUGIN_DATA', watchPollData);
  yield takeEvery('LOAD_PLUGIN_DATA_SUCCEDED', loadAndSavePluginData);
  yield takeEvery('UPDATE_DASHBOARD_REQUESTED', updateDashboard);
  yield takeEvery('GET_DASHBOARD_MODAL', openDashboardModal);
  yield takeEvery('GET_DASHBOARD_PLUGINS_LIST', getDashboardPluginsList);
  yield takeEvery('ADD_PLUGIN_IN_DASHBOARD', addPluginInDashboard);
  yield takeEvery('REMOVE_PLUGIN_IN_DASHBOARD', removePluginInDashboard)
}
