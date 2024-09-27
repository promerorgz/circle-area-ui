import { FormEvent, MouseEvent } from "react";
import { ApiError } from "../api/area";
import ServerError from "./ServerError";
import styles from "./styles.module.css";

interface ResultProps {
  handleSubmit: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>
  ) => any | Promise<void>;
  radius: number;
  area: string | number;
  isLoading: boolean;
  serverError: ApiError;
  error: string;
  isValid: boolean;
}

const Results = ({
  handleSubmit,
  radius,
  area,
  isLoading,
  serverError,
  error,
  isValid,
}: ResultProps) => {
  if (isLoading) return <div className={styles.loading}>...</div>;

  if (serverError.body) return <ServerError error={serverError} />;

  return !isValid || error ? null : (
    <div className={styles.resultContainer}>
      <div
        className={styles.circle}
        onClick={handleSubmit}
        style={{
          width: `${radius}mm`,
          height: `${radius}mm`,
        }}
      >
        <div className={styles.radiusContainer}>
          <div className={styles.radiusLine}>{radius}</div>
        </div>
      </div>

      {area && (
        <>
          <div className={styles.label}>Area is:</div>
          <div className={`${styles.success} `}>{area}</div>
          <div>Explanation:</div>
          <div>π({radius}^2)</div>
          <div>
            {Math.PI} * {radius * radius}
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
