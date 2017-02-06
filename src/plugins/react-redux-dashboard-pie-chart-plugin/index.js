import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { pluginsSelector } from 'selectors';
import * as actions from 'actions';
import { Row } from 'hedron';
import { Loader, Section } from 'components';
import { numberWithCommas } from 'util/helpers';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartIndex: 0,
      options: {
        height: 460,
        legend: { position: 'top', alignment: 'center', maxLines: 5 }
      }
    };
    this.chartEvents = [{
      eventName: 'select',
      callback: (Chart) => {
        if(Chart.chart.getSelection().length > 0) {
          if(this.props.pluginData.data[this.state.chartIndex].columns.length > 0) {
            const rowSelected = Chart.chart.getSelection()[0].row + 1;
            const label = this.state.data[rowSelected][0].split(' ')[0];

            const mapping = this.props.pluginData.data[this.state.chartIndex].mapping;
            let customEndpoint;
            if(mapping.custom) {
              if(mapping.custom.endpoint) {
                customEndpoint = mapping.custom.endpoint;
              }
            }

            this.props.getDashboardModal({
              label,
              pluginLabel: this.props.pluginData.title,
              columns: this.props.pluginData.data[this.state.chartIndex].columns,
              mapping: this.props.pluginData.data[this.state.chartIndex].mapping,
              endpoint: customEndpoint ? customEndpoint : this.props.pluginData.data[this.state.chartIndex].endpoint,
              custom: { endpoint: !!customEndpoint, values: [label, new Date().valueOf()] },
              dashboard: this.props.pluginData.dashboard
            });
          }
        }
      }
    }];
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps);
  }

  componentDidMount() {
    const { pluginData } = this.props;
    this.props.loadPluginsData(pluginData);
  }

  updateChart(props, index) {
    const chartIndex = index ? index : 0;
    if(props.pluginData.data.length < 1) {
      return;
    }
    const pluginData = props.pluginData.data[chartIndex];
    let elWithNoValue = 0;
    if(pluginData.data && pluginData.data.length > 0) {
      const data = pluginData.data.reduce((result, current) => {
        if(pluginData.mapping) {
          let value;
          let valueForChart;
          const keys = pluginData.mapping.keys;
          let label = current[keys.label];
          if(keys.without) {
            label = label.replace(keys.without, '');
          }
          if(Number(current[keys.value.name]) === 0) {
            elWithNoValue++;
          }
          valueForChart = Number(current[keys.value.name]);
          if(keys.value.type === 'number') {
            value = Number(current[keys.value.name]);
          } else if(keys.value.type === 'double') {
            value = numberWithCommas(Number(current[keys.value.name]).toFixed(2));
          }
          result.push([`${label} [${value}]`, valueForChart]);
        }
        return result;
      }, [["Topping","Slices"]]);
      this.setState({ data, chartIndex, elWithNoValue });
    } else {
      this.setState({ elWithNoValue: this.state.data.length - 1, data: [] });
    }
  }

  render() {
    const loader = (
      <Loader message={"Loading data..."} fontSize={18} height={this.state.options.height} />
    );

    return (
      <Section backgroundColor={'white'}>
        {this.state.data.length > 0 &&
          this.state.elWithNoValue !== (this.state.data.length - 1) ?
            <Chart
              graph_id={this.props.pluginData.uuid}
              chartType="PieChart"
              data={this.state.data}
              width={'100%'}
              height={`${this.state.options.height}px`}
              chartEvents={this.chartEvents}
              options={this.state.options}
              loader={loader}
            />
          :
            <Row
              alignItems={'center'}
              justifyContent={'center'}
              style={{ height: this.state.options.height }}
            >
              No data
            </Row>
        }
      </Section>
    );
  }
}

PieChart.displayName = 'PieChart';

export default connect(
  createStructuredSelector({
    pluginData: pluginsSelector.selectPluginData(),
  }),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(PieChart);
