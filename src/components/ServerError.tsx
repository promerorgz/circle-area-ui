import { ApiError } from "../api/area";
import styles from "./styles.module.css";

interface ServerErrorI {
  error: ApiError;
}

const ServerError = ({ error }: ServerErrorI) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.label}>Error:</div>
      <p>{error.body}</p>
      <p style={{ color: "black" }}>Your input: {JSON.stringify(error.data)}</p>
    </div>
  );
};

export default ServerError;
