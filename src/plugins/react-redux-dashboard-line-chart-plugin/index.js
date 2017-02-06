import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { pluginsSelector } from 'selectors';
import * as actions from 'actions';
import moment from 'moment';
import { Row, Column } from 'hedron';
import { Loader, Section } from 'components';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartIndex: 0,
      options: {
        height: 400,
        curveType: 'function',
        legend: {
          position: 'top',
          alignment: 'center',
          maxLines: 5
        },
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps, this.state.chartIndex);
  }

  componentDidMount() {
    const { pluginData, fromTable } = this.props;
    if(!fromTable) {
      this.props.loadPluginsData(pluginData);
    } else {
      this.updateChart(this.props, this.state.chartIndex);
    }
  }

  updateChart(props, index) {
    const chartIndex = index ? index : 0;
    if(!props.tableData) {
      if(props.pluginData.data.length < 1) {
        return;
      }
    }
    const pluginData = (props.tableData) ? props.tableData : props.pluginData.data[chartIndex];
    let data = [];
    if(props.fromTable) {
      const dataMapping = pluginData.data[pluginData.mapping.data];
      dataMapping.forEach(element => {
        const keys = pluginData.mapping.keys;
        const point = [
          moment(element[keys.timestamp]).format("DD/MM/YYYY"),
          Number(element[keys.value]),
          0
        ];
        data.push(point);
      });

      if(data.length > 0) {
        data.unshift(["Time", pluginData.mapping.statuses[0], pluginData.mapping.statuses[1]]);
      }
    }

    if(pluginData.data && pluginData.data.length > 0) {
      let values = [];
      let statuses = [];
      pluginData.mapping.statuses.forEach(el => {
        values.push([]);
        statuses.push([]);
      });
      pluginData.data.forEach(element => {
        const keys = pluginData.mapping.keys;
        const point = [
          Number(element[keys.timestamp]),
          Number(element[keys.value]),
          element[keys.label]
        ];
        pluginData.mapping.statuses.forEach((status, i) => {
          if(element[keys.label] === status) {
            values[i].push(point);
          }
        });
      });
      const timestamps = values[0].map(el => moment(el[0]).format('YYYY/MM/DD HH:mm'));
      values.forEach(element => {
        const series = element.map(element => element[1]);
        pluginData.mapping.statuses.forEach((status, i) => {
          if(element.length > 0) {
            if(element[0][2] === status) {
              statuses[i] = series;
            }
          }
        });
      });
      data = timestamps.map((element, index) => {
        let currentEl = [element];
        statuses.forEach(status => currentEl.push(status[index]));
        return currentEl;
      });
      data.unshift(pluginData.mapping.labels);
    }
    this.setState({
      data,
      chartIndex,
      options: {
        ...this.state.options,
        curveType: pluginData.mapping.curveType ? pluginData.mapping.curveType : 'function',
        colors: pluginData.mapping && pluginData.mapping.colors ? pluginData.mapping.colors : []
      }
    });
  }

  render() {
    const pluginData = this.props.pluginData;
    const loader = (
      <Loader message={"Loading data..."} fontSize={18} height={this.state.options.height} />
    );
    return (
      <Section backgroundColor={'white'} padding={'0 0 15px 0'}>
        {pluginData && pluginData.data && pluginData.data.length > 1 &&
          <Section backgroundColor={'#f8f8f8'} style={{ borderBottom: '1px solid #e8e8e8'}}>
            <Row alignItems={'center'} justifyContent={'center'} divisions={pluginData.data.length}>
              {pluginData.data.map((category, index) => (
                <Column key={index} fluid sm={1} onClick={() => this.updateChart(this.props, index)}>
                  {category.data.length > 0 &&
                    <Section
                      padding={'15px'}
                      textAlign={'center'}
                      fontSize={14}
                      style={{ borderLeft: '1px solid #e8e8e8'}}
                    >
                      <Section cursor={'pointer'}>{category.label}</Section>
                    </Section>
                  }
                </Column>
              ))}
            </Row>
          </Section>
        }
        {(this.state.data.length > 0) ?
          <Chart
            graph_id={this.props.fromTable ? this.props.tableData.uuid : this.props.pluginData.uuid}
            chartType="LineChart"
            data={this.state.data}
            options={this.state.options}
            width={'100%'}
            height={(pluginData && pluginData.data && pluginData.data.length > 1) ?
              `${(this.state.options.height)}px` : `${this.state.options.height + 45}px`}
            loader={loader}
          />
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

LineChart.displayName = 'LineChart';

export default connect(
  createStructuredSelector({
    pluginData: pluginsSelector.selectPluginData(),
  }),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(LineChart);
