import React, { Component } from 'react';
import { Row, Column } from 'hedron';
import { Button, Section, H2, ModalAddPlugin, ModalDashboard, WidgetList } from 'components';

class Dashboard extends Component {
  onAddPlugin = () => {
    const { dashboardData } = this.props;
    this.props.getDashboardPluginsList(dashboardData);
  }

  onRemovePlugin = (uuid) => (e) => {
    const { dashboardData, onRemovePlugin } = this.props;
    onRemovePlugin({ uuid, dashboard: dashboardData.name });
  }

  closeModal = () => {
    const { dashboardData, closeDashboardModal } = this.props;
    closeDashboardModal({ dashboard: dashboardData.name });
  }

  onDatesChange = (type, date) => {
    const { dashboardData: { name } } = this.props;
    const target = (type === 'startDate') ? 'tsFrom': 'tsTo';
    this.props.updateDashboard({ name, date, target });
  }

  onSourcesChange = (sources) => {
    const { dashboardData: { name } } = this.props;
    this.props.updateDashboard({ name, sources });
  }

  onPrimaryCategoryChange = (primarycategory) => {
    const { dashboardData: { name } } = this.props;
    this.props.updateDashboard({ name, primarycategory });
  }

  render() {
    const { dashboardData } = this.props;
    return (
      <div>
        <Row divisions={12} justifyContent={'space-between'} alignItems={'center'}>
          <Column fluid xs={12} sm={3}>
            <H2>{dashboardData.name}</H2>
          </Column>
          <Column fluid xs={12} sm={9}>
            <Section textAlign={'right'} padding={'20px 0'}>
              <Button onClick={this.onAddPlugin}>Add widget</Button>
            </Section>
          </Column>
        </Row>
        {
          dashboardData.plugins.length > 0 ?
            <WidgetList
              dashboardData={dashboardData}
              setDashboardLayouts={this.props.setDashboardLayouts}
              onRemovePlugin={this.onRemovePlugin}
            />
          :
            <Row justifyContent={'center'}>
              <Section padding={'40px'} fontSize={18}>No widgets</Section>
            </Row>
        }
        {dashboardData.modal &&
          <div>
            {
              dashboardData.modal.type === "addPlugin" ?
                <ModalAddPlugin
                  addPluginInDashboard={this.props.addPluginInDashboard}
                  modalData={dashboardData.modal}
                  onClose={this.closeModal}
                />
              :
                <ModalDashboard
                  modalData={dashboardData.modal}
                  onClose={this.closeModal}
                />
            }
          </div>
        }
      </div>
    );
  }
}

export default Dashboard;
