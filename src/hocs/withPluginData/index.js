import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { pluginsSelector } from 'selectors';
import * as actions from 'actions';

const withPluginData = Component => {
  class PluginData extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }
  return connect(
    createStructuredSelector({
      pluginData: pluginsSelector.selectPluginData(),
    }),
    dispatch => bindActionCreators(
      { ...actions },
      dispatch
    )
  )(PluginData);
}

export default withPluginData;
