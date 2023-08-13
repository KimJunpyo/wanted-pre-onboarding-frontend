import {styled} from "styled-components";

function Input({testid, value, handleChangeFunc}) {
  return (
    <InputStyle
      data-testid={testid}
      value={value}
      onChange={handleChangeFunc}
    />
  );
}

const InputStyle = styled.input`
  outline: none;
  border: 2px solid #e3e3e3;
  border-radius: 15px;
  padding: 3px;
  padding-left: 6px;
  margin: 0px 12px;
  color: #363636;
  font-size: 14px;
`;

export default Input;
