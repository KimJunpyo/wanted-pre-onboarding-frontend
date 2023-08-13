import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {postSignIn} from "../Utils/AuthApis";
import AuthButton from "../Components/AuthButton";
import {regex} from "../Utils/constantValue";
import Input from "../Components/Input";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postSignIn(email, password);
      localStorage.setItem("accessToken", response.data.access_token);
      navigate("/todo");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleChangeData = (e, type, setState, setValidState) => {
    setValidState(regex[type].test(e.target.value));
    setState(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          testid="email-input"
          value={email}
          handleChangeFunc={(e) =>
            handleChangeData(e, "email", setEmail, setValidEmail)
          }
        />
        <Input
          testid="password-input"
          value={password}
          handleChangeFunc={(e) =>
            handleChangeData(e, "password", setPassword, setValidPassword)
          }
        />
        <AuthButton
          validEmail={validEmail}
          validPassword={validPassword}
          type="primary"
        >
          SignIn
        </AuthButton>
      </form>
    </div>
  );
}

export default SignIn;
