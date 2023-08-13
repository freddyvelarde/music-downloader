import loadingSpinner from "../../assets/loading-spinner.svg";
import "./spinner.css";

export default function Spinner() {
  return (
    <div id="spinner-container">
      <img src={loadingSpinner} id="spinner" alt="loading..." />
    </div>
  );
}
