import React, { Component } from 'react';
import { Section, Widget } from 'components';
import { Responsive, WidthProvider as widthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = widthProvider(Responsive);
import 'react-grid-layout/css/styles.css';

class WidgetList extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.dashboardData.plugins.every(plugin => plugin.component)) {
      if(!this.state.loaded) {
        this.setState({ loaded: true });
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentDashboard = this.props.dashboardData;
    const nextDashboard = nextProps.dashboardData;
    return (
      (nextDashboard.layouts !== currentDashboard.layouts) ||
      (nextState.loaded !== this.state.loaded) ||
      (nextDashboard.plugins.length !== currentDashboard.plugins.length) ||
      (nextDashboard.name === currentDashboard.name)
    );
  }
  onLayoutChange = (layout, allLayouts) => {
    this.props.setDashboardLayouts({
      dashboard: this.props.dashboardData.name,
      layouts: allLayouts
    });
  }
  render() {
    const { dashboardData, onRemovePlugin } = this.props;
    let dashboardLayout = [];
    if(dashboardData.layouts) {
      dashboardLayout = dashboardData.layouts['lg'] ? dashboardData.layouts['lg'] : [];
    }
    return (
      <Section padding={'20px 0'}>
        {this.state.loaded ?
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{lg: 900, md: 0, sm: 0, xs: 0, xxs: 0}}
            cols={{ lg: 2, md: 1, sm: 1, xs: 1, xxs: 1 }}
            layouts={this.props.dashboardData.layouts}
            rowHeight={240}
            containerPadding={[0, 0]}
            onLayoutChange={this.onLayoutChange}
            onDragStop={this.onDragStop}
            margin={[20, 20]}
          >
            {dashboardData.plugins.map((renderedPlugin, i) => (
              <div
                key={renderedPlugin.uuid}
                data-grid={renderedPlugin.layout}
              >
                {renderedPlugin.component &&
                  <Widget
                    dashboard={dashboardData.name}
                    layout={dashboardLayout.filter(el => el.i === renderedPlugin.uuid)[0]}
                    uuid={renderedPlugin.uuid}
                    title={renderedPlugin.title}
                    WidgetComponent={renderedPlugin.component}
                    onRemovePlugin={onRemovePlugin}
                  />
                }
              </div>
            ))}
          </ResponsiveReactGridLayout>
        :
          <Section padding={'20px'} textAlign={'center'} fontSize={20}>Loading plugins...</Section>
        }
      </Section>
    );
  }
}

export default WidgetList;
