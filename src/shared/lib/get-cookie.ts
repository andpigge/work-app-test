import { getCookie as getCookieFun } from "typescript-cookie";

export const getCookie = (name: string) => {
  if (typeof window === "undefined") return;

  return getCookieFun(name);
};
