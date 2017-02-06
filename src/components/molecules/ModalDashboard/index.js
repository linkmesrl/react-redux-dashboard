import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Row } from 'hedron';
import ReactTable from 'react-table';
import 'assets/react-table.css';
import moment from 'moment';

const ModalContainer = ({
  className,
  modalData: { pluginLabel, label, data, columns, isOpen },
  onClose, children
}) => {
  const modalLabel = label ? `${pluginLabel}: ${label.replace(/_/g, ' ')}` : pluginLabel;
  let tableColumns;
  if(columns.length > 0) {
    tableColumns = columns.map(column => ({
      header: column.label,
      accessor: column.value,
      render: props => {
        let result;
        if(column.mapping) {
          if(column.mapping.type === 'double') {
            result = Number(props.value).toFixed(2);
          } else if(column.mapping.type === 'date') {
            result = moment(props.value).format(column.mapping.format);
          }
        } else {
          result = props.value;
        }
        return <div>{result}</div>;
      }
    }));
  }

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
          {columns.length > 0 &&
            <ReactTable
              data={data}
              columns={tableColumns}
            />
          }
        </ModalContent>
      </Modal>
    </div>
  );
};

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
  padding: 20px;
  margin-top: 60px;
`;

const ModalDashboard = styled(ModalContainer)`
  border-radius: 5px;
`;

export default ModalDashboard;
