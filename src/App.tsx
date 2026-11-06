import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Header />
      <Form />

      <div className="footer">
        <hr />
        <p>
          © 2025 - BPCalculator -{" "}
          <a className="privacy" href="#">
            Privacy
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
