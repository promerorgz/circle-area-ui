import axios, { AxiosResponse } from "axios";

const SERVER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://localhost:8080";

export const determineCircleArea = async (
  radius: number
): Promise<number | null> => {
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
    throw new Error(`Something went wrong: ${error?.message}`);
  }
};
