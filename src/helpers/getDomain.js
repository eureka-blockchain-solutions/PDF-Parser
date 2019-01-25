const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

export const getDomain = () => {
  if (isProduction()) {
    // TODO: insert prod url
    return "";
  }
  return "http://localhost:8080";
};
