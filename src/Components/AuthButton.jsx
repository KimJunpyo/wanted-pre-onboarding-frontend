import ButtonStyle from "./TodoButton";

function AuthButton({children, validEmail, validPassword, type}) {
  return (
    <ButtonStyle
      data-testid="signup-button"
      disabled={!validEmail || !validPassword}
      type={type}
    >
      {children}
    </ButtonStyle>
  );
}

export default AuthButton;
