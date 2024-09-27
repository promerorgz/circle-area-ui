import axios, { AxiosResponse } from "axios";

export interface ApiError {
  code: string | undefined;
  errorMessage: string | undefined;
  body: string | undefined;
  data: JSON;
}

const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://localhost:8080";

export const determineCircleArea = async (
  radius: number
): Promise<number | ApiError | null> => {
  console.log({ radius });
  try {
    const response: AxiosResponse<number> = await axios.post(
      `${SERVER_URL}/api/circle/area`,
      {
        radius,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log({ error });
    // eslint-disable-next-line no-throw-literal
    throw {
      code: error.code,
      errorMessage: error.message,
      body: error.response.data,
      data: JSON.parse(error.config.data),
      ...error,
    };
  }
};
