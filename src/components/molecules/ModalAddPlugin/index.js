import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Row, Column } from 'hedron';
import { Button, Section } from 'components';
import endpoints from 'util/endpoints';

class ModalContainer extends Component {
  addPlugin = (plugin, dashboard) => (e) => {
    this.props.addPluginInDashboard({ plugin, dashboard, updateDashboard: true });
  }
  render() {
    const {
      className,
      modalData: { pluginLabel, dashboard, label, data, isOpen },
      onClose
    } = this.props;
    const modalLabel = label ? `${pluginLabel}: ${label.replace(/_/g, ' ')}` : pluginLabel;
    return (
      <div className={className}>
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel={modalLabel}
        >
          <ModalHeader>
            <Row alignItems={'center'}>
              <ModalTitle>{modalLabel}</ModalTitle>
              <ModalClose onClick={onClose}>X</ModalClose>
            </Row>
          </ModalHeader>
          <ModalContent>
            {data.map((plugin, i) => (
              <Section key={i} padding={'20px 0'} style={{ borderBottom: '1px solid #ddd' }}>
                <Row divisions={4} justifyContent={'center'} alignItems={'center'}>
                  <Column fluid sm={3}>
                    <Row justifyContent={'center'}>
                      <Column fluid>
                        <h4 style={{ margin: 0 }}>{`${plugin.title} (${plugin.name})`}</h4>
                      </Column>
                      <Column fluid>
                        {plugin.endpoints.map((el, i) => (
                          <Section key={i} color={'#888'}>
                            {endpoints[el.url].url}
                          </Section>
                        ))}
                      </Column>
                    </Row>
                  </Column>
                  <Column fluid sm={1}>
                    <Section textAlign={'right'}>
                      <Button onClick={this.addPlugin(plugin, dashboard)}>Add</Button>
                    </Section>
                  </Column>
                </Row>
              </Section>
            ))}
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

const ModalHeader = styled.div`
  border-bottom: 1px solid ${props => props.theme.greyMed};
  position: fixed;
  z-index: 9999;
  right: 41px;
  left: 41px;
`;

const ModalTitle = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: ${props => props.theme.greyLight};
  text-transform: capitalize;
`;

const ModalClose = styled.div`
  padding: 20px 25px;
  background-color: ${props => props.theme.greyMed};
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 10px;
  margin: 60px 20px 20px;
`;

const ModalAddPlugin = styled(ModalContainer)`
  border-radius: 5px;
`;

export default ModalAddPlugin;
