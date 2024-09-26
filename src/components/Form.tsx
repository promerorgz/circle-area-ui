import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from "react";

import styles from "./styles.module.css";
import { determineCircleArea } from "../api/area";

const Form = (props: PropsWithChildren) => {
  const [radius, setRadius] = useState<any>("");
  const [area, setArea] = useState<any>();
  const [error, setError] = useState<string>("");
  const [serverError, setServerError] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setError("");
    if (value > 100 || value < 1) {
      setError("Radius must be a value between 1-100");
    }
    value ? setRadius(value) : setRadius("");
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const area = await determineCircleArea(radius);
      setArea(area);
      setIsLoading(false);
    } catch (e: any) {
      setServerError(e);
    }
  };

  return (
    <div className={styles.splitscreen}>
      <div className={styles.column}>
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <div className={styles["input-container"]}>
            <label htmlFor="area-input" className={styles.label}>
              Enter Radius
            </label>
            <input
              max={100}
              min={1}
              id="area-input"
              className={styles["area-input"]}
              placeholder="1-100"
              onChange={handleChange}
              value={radius}
            ></input>
          </div>
          {error && <div className={styles.errorContainer}>{error}</div>}
          <div className={styles.buttonContainer}>
            <button
              disabled={!radius || !!error}
              className={`${styles.submitButton} ${styles.label}`}
              type="submit"
            >
              {`Submit >`}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.column}>
        <div>{isLoading && `Loading...`}</div>
        <div className={styles.errorContainer}>
          {serverError && serverError}
        </div>
        <div
          style={{
            padding: "50px",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: `${radius * 2}mm`,
              height: `${radius * 2}mm`,
              border: "1px solid white",
              backgroundColor: "red",
              transition: "width 1s ease 0s, height 1s ease 0s",
            }}
          >
            <div
              style={{
                position: "relative",
                border: "1px solid black",
                top: "50%",
                width: "50%",
              }}
            ></div>
          </div>
        </div>
        <div className={styles.success}>The area is: {area}</div>
      </div>
    </div>
  );
};

export default Form;
