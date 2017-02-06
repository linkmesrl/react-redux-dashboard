import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.greyLight};
  border: 1px solid ${props => props.theme.greyMed};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
`;

export default Button;
