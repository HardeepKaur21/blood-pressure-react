import "./InputFields.css";

type InputFieldsProps = {
  systolic: string;
  diastolic: string;
  setSystolic: React.Dispatch<React.SetStateAction<string>>;
  setDiastolic: React.Dispatch<React.SetStateAction<string>>;
};

function InputFields({
  systolic,
  diastolic,
  setSystolic,
  setDiastolic,
}: InputFieldsProps) {
  function saveSystolicInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSystolic(event.target.value);
    console.log(systolic);
  }

  function saveDiastolicInput(event: React.ChangeEvent<HTMLInputElement>) {
    setDiastolic(event.target.value);
    console.log(diastolic);
  }

  return (
    <>
      <div>
        <label htmlFor="systolic">Systolic</label>
        <input
          type="number"
          id="systolic"
          placeholder="100"
          onChange={saveSystolicInput}
        />
      </div>

      <div className="diastolic-input">
        <label htmlFor="diastolic">Diastolic</label>
        <input
          type="number"
          id="diastolic"
          placeholder="60"
          onChange={saveDiastolicInput}
        />
      </div>
    </>
  );
}

export default InputFields;
