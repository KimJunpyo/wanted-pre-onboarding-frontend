import {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthInput from "../Components/AuthInput";
import {postSignIn} from "../Utils/apis";
import AuthButton from "../Components/AuthButton";

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <AuthInput
          testId="email-input"
          value={email}
          setValue={setEmail}
          setValidState={setValidEmail}
        />
        <AuthInput
          testId="password-input"
          value={password}
          setValue={setPassword}
          setValidState={setValidPassword}
        />
        <AuthButton validEmail={validEmail} validPassword={validPassword} />
      </form>
    </div>
  );
}

export default SignIn;
