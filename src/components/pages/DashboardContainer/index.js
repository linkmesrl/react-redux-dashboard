import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { dashboardsSelector, pluginsSelector } from 'selectors';
import * as actions from 'actions';

import { Dashboard } from 'components';

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.loadDashboardPlugins(this.props.routeParams.name);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.routeParams.name !== nextProps.routeParams.name) {
      nextProps.loadDashboardPlugins(nextProps.routeParams.name);
    }
  }
  addPluginInDashboard = (plugin, dashboard) => {
    this.props.addPluginInDashboard(plugin, dashboard);
  }
  render() {
    const {
      getDashboardModal,
      closeDashboardModal,
      dashboardData,
      updateDashboard,
      getDashboardPluginsList,
      removePluginInDashboard,
      setDashboardLayouts
    } = this.props;
    return (
      <div>
        {dashboardData &&
          <Dashboard
            dashboardData={dashboardData}
            getDashboardModal={getDashboardModal}
            closeDashboardModal={closeDashboardModal}
            updateDashboard={updateDashboard}
            getDashboardPluginsList={getDashboardPluginsList}
            addPluginInDashboard={this.addPluginInDashboard}
            onRemovePlugin={removePluginInDashboard}
            setDashboardLayouts={setDashboardLayouts}
          />
        }
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    dashboardData: dashboardsSelector.selectDashboardData(),
    plugins: pluginsSelector.selectPlugins()
  }),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(DashboardContainer);
