const dev = "http://localhost:5000";
const prod = "http://ec2-54-152-57-39.compute-1.amazonaws.com:5000";

export const baseURL =
  window.location.hostname.split(":")[0] === "localhost" ||
  window.location.hostname.includes("192")
    ? dev
    : prod;
