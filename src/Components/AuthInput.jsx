import {regex} from "../Utils/constantValue";

function AuthInput({testId, value, setValue, setValidState}) {
  const handleChangeData = (e, type, setState, setValidState) => {
    setValidState(regex[type].test(e.target.value));
    setState(e.target.value);
  };

  const sliceTestId = () => {
    const dashIndex = testId.indexOf("-");
    return testId.slice(0, dashIndex);
  };

  return (
    <input
      data-testid={testId}
      value={value}
      onChange={(e) =>
        handleChangeData(e, sliceTestId(), setValue, setValidState)
      }
    />
  );
}

export default AuthInput;
