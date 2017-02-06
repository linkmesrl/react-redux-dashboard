import { createSelector } from 'reselect';

const selectGlobal = (state) => state.pluginsReducer;

const selectPlugins = () => createSelector(
 selectGlobal,
 (globalState) => globalState.plugins
);

const getPluginData = (state, props) => {
  const dashboard = state.dashboardsReducer.dashboards.filter(dashboard => dashboard.name === props.dashboard);
  return dashboard[0].plugins.filter(plugin => plugin.uuid === props.uuid);
}
const selectPluginData= () => createSelector(
  getPluginData,
  (pluginState) => pluginState[0]
);

export {
 selectPlugins,
 selectPluginData,
};
