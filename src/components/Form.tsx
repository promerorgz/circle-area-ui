import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import styles from "./styles.module.css";

interface FormProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>
  ) => any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
  radius: number;
  error: string;
  setRadius: Dispatch<number>;
  setArea: Dispatch<any>;
  setServerError: Dispatch<any>;
}

const Form = ({
  handleSubmit,
  handleChange,
  setRadius,
  radius,
  error,
  setArea,
  setServerError,
}: FormProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "ArrowUp") {
      setArea("");
      setServerError("");
      setRadius(Number(radius) + (e.shiftKey ? 10 : 1));
    }
    if (key === "ArrowDown") {
      setArea("");
      setServerError("");
      setRadius(Number(radius) - (e.shiftKey ? 10 : 1));
    }
  };
  return (
    <form
      className={styles["form"]}
      onSubmit={handleSubmit}
      autoComplete="false"
    >
      <div className={styles.inputContainer}>
        <label htmlFor="area-input" className={styles.label}>
          Enter Radius
        </label>
        <input
          onKeyDown={handleKeyDown}
          autoComplete="one-time-code"
          max={100}
          min={1}
          id="area-input"
          className={styles["area-input"]}
          placeholder="1-100"
          onChange={handleChange}
          value={radius}
        ></input>
      </div>
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "8px",
            paddingBottom: "8px",
          }}
        >
          {error}
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button
          // disabled={!radius || !!error}
          className={`${styles.submitButton} ${styles.label}`}
          type="submit"
        >
          {`Submit`}
        </button>
      </div>
    </form>
  );
};

export default Form;
