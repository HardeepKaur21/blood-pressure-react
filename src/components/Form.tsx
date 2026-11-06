import { useState } from "react";
import InputFields from "./InputFields";
import "./Form.css";

function Form() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>BP Category Calculator</h1>
        <hr />
        <InputFields
          systolic={systolic}
          setSystolic={setSystolic}
          setDiastolic={setDiastolic}
          diastolic={diastolic}
        />
        <button type="submit">Submit</button>
        <div id="result">Low Blood Pressure</div>
      </form>
    </>
  );
}

export default Form;
