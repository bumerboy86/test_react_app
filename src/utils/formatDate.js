export const formatDateTo = (isoDate, format = "DDMMYYYY", separator = ".") => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  const parts = {
    DD: String(date.getDate()).padStart(2, "0"),
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
  };

  const tokens = format.match(/(YYYY|YY|MM|DD)/g);

  if (!tokens) return "";

  return tokens.map((t) => parts[t] || "").join(separator);
};
