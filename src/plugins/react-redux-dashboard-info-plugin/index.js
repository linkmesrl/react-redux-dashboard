import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { pluginsSelector } from 'selectors';
import * as actions from 'actions';
import { Row, Column } from 'hedron';
import { Section } from 'components';
import { theme } from 'components';

class Info extends Component {
  getEndpointData(endpointData) {
    let dataToRender;
    if(!endpointData.mapping || endpointData.data === undefined) {
      dataToRender = <div>No data</div>;
      return dataToRender;
    } else {
      if(endpointData && endpointData.data && endpointData.mapping) {
        if(endpointData.mapping.keys.value) {
          if(endpointData.mapping.keys.value.type === "double") {
            dataToRender = Number(endpointData.data[endpointData.mapping.keys.name]).toFixed(2);
          } else {
            dataToRender = endpointData.data[endpointData.mapping.keys.value.name];
          }
        }
      }
    }
    return dataToRender;
  }
  openModal = (endpointData) => (e) => {
    const mapping = endpointData.mapping;
    const label = mapping && mapping.keys.label ? mapping.keys.label : "";
    if(endpointData.columns) {
      this.props.getDashboardModal({
        pluginLabel: `${this.props.pluginData.title}: ${label}`,
        columns: endpointData.columns,
        mapping: endpointData.mapping ? endpointData.mapping : {},
        endpoint: endpointData.endpoint,
        dashboard: this.props.pluginData.dashboard,
      });
    }
  }
  componentDidMount() {
    const { pluginData } = this.props;
    this.props.loadPluginsData(pluginData);
  }
  render() {
    const mappingData = this.props.pluginData.data[0] && this.props.pluginData.data[0].mapping.data;
    const infoData = mappingData ? mappingData : this.props.pluginData.data;

    return (
      <Row
        alignItems={'center'}
        justifyContent={'center'}
        style={{ height: 200, backgroundColor: 'white' }}
      >
        {this.props.pluginData && this.props.pluginData.data.length > 0 ?
          <div style={{ width: '100%' }}>
            <Row
              divisions={infoData.length}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {infoData.length > 0 && infoData.map((endpointData, i) => (
                <Column fluid key={i} sm={1}>
                  <Section fontWeight={'bold'} fontSize={16} textAlign={'center'}>
                    {endpointData.mapping && endpointData.mapping.keys &&
                      <div>{endpointData.mapping.keys.label}</div>
                    }
                  </Section>
                </Column>
              ))}
            </Row>
            <Row
              divisions={infoData.length}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {infoData.map((endpointData, i) => (
                <Column fluid key={i} sm={1}>
                  <Section
                    textAlign={'center'}
                    fontSize={26}
                    color={theme.blue}
                    style={{ marginTop: 10 }}
                    onClick={this.openModal(endpointData)}
                  >
                    {this.getEndpointData(endpointData)}
                  </Section>
                </Column>
              ))}
            </Row>
          </div>
        :
          <Row alignItems={'center'} justifyContent={'center'}>No data</Row>
        }
      </Row>
    )
  }
}

Info.displayName = 'Info';

export default connect(
  createStructuredSelector({
    pluginData: pluginsSelector.selectPluginData(),
  }),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(Info);
