import { useState } from "react";
import InputFields from "./InputFields";
import { calculateResult } from "../utils/calculateResult";
import "./Form.css";

function Form() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    const sys = Number(systolic);
    const dia = Number(diastolic);
    event.preventDefault();
    setErrorMessage(false);

    if (sys >= 70 && sys <= 190 && sys > dia && dia >= 40 && dia <= 100) {
      setResult(calculateResult(sys, dia));
    } else {
      setErrorMessage(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>BP Category Calculator</h1>
        <hr />
        <InputFields setSystolic={setSystolic} setDiastolic={setDiastolic} />
        <button type="submit">Submit</button>
        {!errorMessage && <div id="result">{result}</div>}
        {errorMessage && <div className="error">Invalid Input</div>}
      </form>
    </>
  );
}

export default Form;
