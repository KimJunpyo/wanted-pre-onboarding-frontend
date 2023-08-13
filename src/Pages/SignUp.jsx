import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {postSignUp} from "../Utils/AuthApis";
import AuthButton from "../Components/AuthButton";
import Input from "../Components/Input";
import {regex} from "../Utils/constantValue";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postSignUp(email, password);
      navigate("/signin");
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
          testId="email-input"
          value={email}
          handleChangeFunc={(e) =>
            handleChangeData(e, "email", setEmail, setValidEmail)
          }
        />
        <Input
          testId="password-input"
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
          SignUp
        </AuthButton>
      </form>
    </div>
  );
}

export default SignUp;
