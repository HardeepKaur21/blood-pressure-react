import { useState } from "react";
import InputFields from "./InputFields";
import { faro } from "@grafana/faro-react";
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
      const category = calculateResult(sys, dia);
      setResult(category);

      faro.api?.pushEvent("calculator_submitted", {
        category: category,
      });
    } else {
      setErrorMessage(true);
      faro.api?.pushEvent("calculator_validation_error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>BP Category Calculator</h1>
        <hr />
        <InputFields setSystolic={setSystolic} setDiastolic={setDiastolic} />
        <button
          type="submit"
          data-faro-user-action-name="calculate-blood-pressure"
        >
          Submit
        </button>
        {!errorMessage && <div id="result">{result}</div>}
        {errorMessage && <div className="error">Invalid Input</div>}
      </form>
    </>
  );
}

export default Form;
