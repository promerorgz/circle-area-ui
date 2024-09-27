import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

import { determineCircleArea } from "../api/area";
import Form from "./Form";
import Results from "./Results";
import styles from "./styles.module.css";

const Main = () => {
  const [radius, setRadius] = useState<any>("");
  const [area, setArea] = useState<any>();
  const [serverError, setServerError] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setServerError("");
    setArea("");
    setRadius(e.target.value);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setServerError(false);
    setIsLoading(true);
    try {
      const area = await determineCircleArea(radius);
      setArea(area);
      setIsLoading(false);
    } catch (e: any) {
      setServerError(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError("");
    if (isNaN(parseInt(radius))) {
      setError("Value must be provided. Value must be numeric");
      setIsValid(false);
    }
    if (parseInt(radius) > 100 || parseInt(radius) < 1) {
      setError("Value must be between 1-100");
      setIsValid(false);
    }
    if (parseInt(radius) <= 100 || parseInt(radius) >= 1) {
      setIsValid(true);
    }
  }, [radius]);

  return (
    <div className={styles.container}>
      <div className={`${styles.column} ${styles.left}`}>
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          radius={radius}
          error={error}
        />
      </div>
      <div className={styles.column}>
        <Results
          handleSubmit={handleSubmit}
          error={error}
          serverError={serverError}
          isLoading={isLoading}
          area={area}
          radius={radius}
          isValid={isValid}
        ></Results>
      </div>
    </div>
  );
};

export default Main;
