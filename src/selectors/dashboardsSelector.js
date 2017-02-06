import { createSelector } from 'reselect';

const selectGlobal = (state) => state.dashboardsReducer;

const selectDashboards = () => createSelector(
 selectGlobal,
 (globalState) => globalState.dashboards
);

const getDashboard = (state, props) => {
  return state.dashboardsReducer.dashboards.filter(dashboard => dashboard.name === props.params.name);
}
const selectDashboardData = () => createSelector(
  getDashboard,
  (dashboardState) => dashboardState[0]
)

export {
 selectDashboards,
 selectDashboardData
};
