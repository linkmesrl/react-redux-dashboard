import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { pluginsSelector } from 'selectors';
import * as actions from 'actions';
import ReactTable from 'react-table';
import 'assets/react-table.css';
import moment from 'moment';
import { Row } from 'hedron';
import { numberWithCommas } from 'util/helpers';
import _ from 'lodash';

class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableColumns: [],
      chartIndex: 0,
      showPagination: true
    };
  }
  componentWillReceiveProps(nextProps) {
    this.updateTable(nextProps);
  }
  componentDidMount() {
    const { pluginData, fromTable } = this.props;
    if(!fromTable) {
      this.props.loadPluginsData(pluginData);
    } else {
      this.updateTable(this.props);
    }
  }
  updateTable(props, index) {
    const chartIndex = index ? index : 0;
    if(!this.props.fromTable) {
      if(props.pluginData.data.length < 1) {
        return;
      }
    }
    const pluginData = this.props.fromTable ? props.tableData : props.pluginData.data[chartIndex];
    let tableColumns = [];
    let tableDataRows;

    if(pluginData.columns) {
      tableColumns = pluginData.columns.map(column => ({
        header: column.label,
        accessor: column.value,
        render: columnProps => {
          let result;
          if(column.mapping) {
            if(column.mapping.type === 'double') {
              result = numberWithCommas(Number(columnProps.value).toFixed(2));
            } else if(column.mapping.type === 'date') {
              result = moment(Number(columnProps.value)).format(column.mapping.format);
            } else if(column.mapping.type === 'timeAgo') {
              const poDate = new Date(Number(columnProps.value));
              const nowDate = new Date();
              let diffMs = (nowDate.getTime() - poDate.getTime()) / 1000;
              const diffDays = Math.floor(diffMs / 86400);
              diffMs -= diffDays * 86400;
              const diffHours = Math.floor(diffMs / 3600) % 24;
              diffMs -= diffHours * 3600;
              var diffMinutes = Math.floor(diffMs / 60) % 60;
              result = diffDays + 'd ' + diffHours + 'h ' + diffMinutes + 'm';
            }
          } else {
            result = columnProps.value;
          }
          if(this.props.onTrClick) {
            return <div onClick={this.props.onTrClick(columnProps)}>{result}</div>;
          } else {
            return <div>{result}</div>;
          }
        }
      }));
    }

    let dataToRender = pluginData.data ? pluginData.data : [];
    let showPagination = true;
    const sorting = pluginData && pluginData.mapping && pluginData.mapping.sorting ? [pluginData.mapping.sorting] : [];
    this.setState({ data: dataToRender, tableColumns, tableDataRows, showPagination, sorting });
  }
  render() {
    let rowsPerPage = 10;
    if(this.state.tableDataRows) {
      rowsPerPage = this.state.tableDataRows;
    }

    return (
      <div style={{ backgroundColor: 'white' }}>
        {this.state.data && this.state.tableColumns &&
          <div>
            {(this.state.data.length > 0 && this.state.tableColumns.length > 0) ?
                <div style={{ padding: (rowsPerPage >= 10) ? 18 : 10 }}>
                  <ReactTable
                    data={this.state.data}
                    columns={this.state.tableColumns}
                    pageSize={rowsPerPage}
                    minRows={rowsPerPage}
                    showPageSizeOptions={false}
                    theadStyle={{ boxShadow: 'none' }}
                    showPagination={this.state.showPagination}
                    sorting={this.state.sorting.length > 0 && this.state.sorting}
                  />
                </div>
              :
                <Row style={{ minHeight: (rowsPerPage >= 10) ? 460 : 200 }} justifyContent={'center'}>
                  <Row alignItems={'center'} justifyContent={'center'}>No data</Row>
                </Row>
            }
          </div>
        }
      </div>
    );
  }
}

TableChart.displayName = 'TableChart';

export default connect(
  createStructuredSelector({
    pluginData: pluginsSelector.selectPluginData(),
  }),
  dispatch => bindActionCreators(
    { ...actions },
    dispatch
  )
)(TableChart);
