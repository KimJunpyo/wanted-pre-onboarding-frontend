function AuthButton({validEmail, validPassword}) {
  return (
    <button
      style={{width: "50px", height: "20px"}}
      data-testid="signup-button"
      disabled={!validEmail || !validPassword}
    />
  );
}

export default AuthButton;
