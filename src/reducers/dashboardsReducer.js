import * as constants from '../actions';

const initialState = {
  dashboards: [
    {
      "name": "demo",
      "layouts": {},
      "plugins": []
    }
  ],
};

const dashboardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_DASHBOARD:
      return state.dashboards.filter(dashboard => dashboard.name === action.name)[0];
    case constants.ADD_DASHBOARD_PLUGIN:
      return Object.assign({}, state, {
        dashboards: state.dashboards.map(dashboard => {
          if(dashboard.name === action.data.dashboard) {
            return {
              ...dashboard,
              plugins: [
                ...dashboard.plugins,
                {
                  ...action.data
                }
              ]
            }
          }
          return dashboard;
        })
      });
    case constants.RENDER_DASHBOARD_PLUGIN:
      return Object.assign({}, state, {
        dashboards: state.dashboards.map(dashboard => {
          if(dashboard.name === action.data.dashboard) {
            return {
              ...dashboard,
              plugins: dashboard.plugins.map(plugin => {
                if(plugin.uuid === action.data.uuid) {
                  return {
                    ...plugin,
                    component: action.data.component
                  }
                } else {
                  return plugin;
                }
              })
            }
          } else {
            return dashboard;
          }
        })
      });
    case constants.UPDATE_DASHBOARD_PLUGIN:
      return Object.assign({}, state, {
        dashboards: state.dashboards.map(dashboard => {
          if(dashboard.name === action.data.dashboard) {
            return {
              ...dashboard,
              plugins: dashboard.plugins.map(plugin => {
                if(plugin.uuid === action.data.uuid) {
                  return action.data;
                }
                return plugin;
              })
            }
          }
          return dashboard;
        })
      });
    case constants.REMOVE_DASHBOARD_PLUGIN:
      return Object.assign({}, state, {
        dashboards: state.dashboards.map(dashboard => {
          if(dashboard.name === action.data.dashboard) {
            return {
              ...dashboard,
              plugins: dashboard.plugins.filter(plugin => plugin.uuid !== action.data.uuid)
            }
          }
          return dashboard;
        })
      });
    case constants.OPEN_DASHBOARD_MODAL:
      return Object.assign({}, state, {
        dashboards: state.dashboards.map(dashboard => {
          if(dashboard.name === action.params.dashboard) {
            return {
              ...dashboard,
              modal: {
                type: action.params.type,
                dashboard: action.params.dashboard,
                isOpen: action.params.show,
                data: action.params.data,
                columns: action.params.columns,
                label: action.params.label,
                pluginLabel: action.params.pluginLabel,
              }
            }
          }
          return dashboard;
        })
      });
    case constants.CLOSE_DASHBOARD_MODAL:
      return Object.assign({}, state, {
        dashboards: state.dashboards.map(dashboard => {
          if(dashboard.name === action.params.dashboard) {
            return {
              ...dashboard,
              modal: {
                type: '',
                isOpen: false,
                data: [],
                columns: [],
                label: '',
                pluginLabel: ''
              }
            }
          }
          return dashboard;
        })
      });
    case constants.SET_DASHBOARD_LAYOUTS:
      return Object.assign({}, state, {
        dashboards: state.dashboards.map(dashboard => {
          if(dashboard.name === action.dashboardData.dashboard) {
            return {
              ...dashboard,
              layouts: action.dashboardData.layouts
            }
          }
          return dashboard;
        })
      })
    default:
      return state;
  }
}

export default dashboardsReducer;
