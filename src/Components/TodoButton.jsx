import {styled} from "styled-components";

function TodoButton({children, testid, handleClickFunc, type}) {
  return (
    <ButtonStyle type={type} data-testid={testid} onClick={handleClickFunc}>
      {children}
    </ButtonStyle>
  );
}

export const ButtonStyle = styled.button`
  border: none;
  margin: 2px;
  color: white;
  background-color: ${(props) =>
    props.type === "primary" ? "#4bbf69" : "#f24646"};
  width: 3.5rem;
  height: 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export default TodoButton;
