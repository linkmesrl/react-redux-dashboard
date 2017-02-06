import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { pluginsSelector } from 'selectors';
import * as actions from 'actions';
import { Row, Column } from 'hedron';
import { Loader, Section } from 'components';

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartIndex: 0,
      options: {
        height: 415,
        legend: { position: 'top' },
        colors: []
      }
    };

    this.chartEvents = [{
      eventName: 'select',
      callback: (Chart) => {
        if(Chart.chart.getSelection().length > 0) {
          if(this.props.pluginData.data[this.state.chartIndex].columns.length > 0) {
            const rowSelected = Chart.chart.getSelection()[0].row + 1;
            const label = this.state.data[rowSelected][0].split(' ')[0];
            this.props.getDashboardModal({
              label,
              pluginLabel: this.props.pluginData.title,
              columns: this.props.pluginData.data[this.state.chartIndex].columns,
              endpoint: this.props.pluginData.data[this.state.chartIndex].endpoint,
              dashboard: this.props.pluginData.dashboard
            });
          }
        }
      }
    }];
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps, this.state.chartIndex);
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

      let graphArr = [];
      if(pluginData.mapping.keys.values) {
        graphArr = [
          "Topping",
          pluginData.mapping.keys.values[0].label,
          pluginData.mapping.keys.values[1].label
        ];
      }
      if(pluginData.mapping.keys.value) {
        graphArr = [
          "Topping",
          pluginData.mapping.keys.value.label
        ];
      }

      const data = pluginData.data.reduce((result, current) => {
        if(pluginData.mapping) {
          let value;
          const keys = pluginData.mapping.keys;
          const label = current[keys.label];

          if(keys.values) {
            if(Number(current[keys.values[0].name]) === 0) {
              elWithNoValue++;
            }
            let values = [];
            keys.values.forEach((key, i) => {
              if(key.type === 'number') {
                values.push(Number(current[key.name]));
              } else if(key.type === 'double') {
                values.push(Number(current[key.name]).toFixed(2));
              }
            });
            values.unshift(label);
            result.push(values);
          }

          if(keys.value) {
            if(keys.value.type === 'number') {
              value = Number(current[keys.value.name]);
            } else if(keys.value.type === 'double') {
              value = Number(current[keys.value.name]).toFixed(2);
            }
            result.push([`${label} [${value}]`, value]);
          }
        }
        return result;
      }, [graphArr]);

      const colors = pluginData.mapping && pluginData.mapping.color && [pluginData.mapping.color];
      this.setState({
        data,
        chartIndex,
        options: {
          ...this.state.options,
          colors
        },
        elWithNoValue
      });
    } else {
      this.setState({ elWithNoValue: this.state.data.length - 1 });
    }
  }

  render() {
    const pluginData = this.props.pluginData.data;
    const loader = (
      <Loader message={"Loading data..."} fontSize={18} height={this.state.options.height} />
    );
    return (
      <Section backgroundColor={'white'}>
        {pluginData.length > 1 &&
          <Section backgroundColor={'#f8f8f8'} style={{ borderBottom: '1px solid #e8e8e8'}}>
            <Row alignItems={'center'} justifyContent={'center'} divisions={pluginData.length}>
              {pluginData.map((category, index) => (
                <Column key={index} fluid sm={1} onClick={() => this.updateChart(this.props, index)}>
                  {category.data && category.data.length > 0 &&
                    <Section
                      padding={'15px'}
                      textAlign={'center'}
                      fontSize={14}
                      style={{ borderLeft: '1px solid #e8e8e8'}}
                    >
                      <Section cursor={'pointer'}>{category.mapping.keys.value.label}</Section>
                    </Section>
                  }
                </Column>
              ))}
            </Row>
          </Section>
        }
        {this.state.data.length > 0 &&
          this.state.elWithNoValue !== (this.state.data.length - 1) ?
            <div>
              <Chart
                graph_id={this.props.pluginData.uuid}
                chartType="ColumnChart"
                data={this.state.data}
                options={this.state.options}
                width={'100%'}
                height={(pluginData && pluginData.length > 1) ? `${(this.state.options.height)}px` : `${this.state.options.height + 45}px`}
                chartEvents={this.chartEvents}
                loader={loader}
              />
            </div>
          :
            <Row
              alignItems={'center'}
              justifyContent={'center'}
              style={{ height: this.state.options.height + 45 }}
            >
              No data
            </Row>
        }
      </Section>
    );
  }
}

ColumnChart.displayName = 'ColumnChart';

export default connect(
  createStructuredSelector({
    pluginData: pluginsSelector.selectPluginData(),
  }),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(ColumnChart);
