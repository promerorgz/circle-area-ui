import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import styles from "./styles.module.css";

interface FormProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>
  ) => any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
  radius: number;
  error: string;
}

const Form = ({ handleSubmit, handleChange, radius, error }: FormProps) => {
  return (
    <form className={styles["form"]} onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.inputContainer}>
        <label htmlFor="area-input" className={styles.label}>
          Enter Radius
        </label>
        <input
          autoComplete="false"
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
