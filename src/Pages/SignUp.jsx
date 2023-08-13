import {useState} from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const regex = {
    email: /@/,
    password: /^.{8,}$/,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const handleChangeData = (e, type, setState, setValidState) => {
    setValidState(regex[type].test(e.target.value));
    setState(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          value={email}
          onChange={(e) =>
            handleChangeData(e, "email", setEmail, setValidEmail)
          }
        />
        <input
          data-testid="password-input"
          value={password}
          onChange={(e) =>
            handleChangeData(e, "password", setPassword, setValidPassword)
          }
        />
        <button
          style={{width: "50px", height: "20px"}}
          data-testid="signup-button"
          disabled={!validEmail || !validPassword}
        />
      </form>
    </div>
  );
}

export default SignUp;
