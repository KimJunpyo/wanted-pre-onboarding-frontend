function SignIn() {
  return (
    <div>
      <form>
        <input data-testid="email-input" />
        <input data-testid="password-input" />
        <button data-testid="signin-button" />
      </form>
    </div>
  );
}

export default SignIn;
