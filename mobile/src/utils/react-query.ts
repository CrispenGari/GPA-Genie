import { SERVER_URL } from "../constants";
import { TBody, TResponse } from "../types";

export const predictCGPA = async ({ body }: { body: TBody }) => {
  const url = `${SERVER_URL}/api/v1/cgpa/predict`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body, null, 2),
  });
  const data = await res.json();
  return data as TResponse;
};
