import Error from "../helper/error.js";

export function email_validate(email) {
  const error = new Error().isRequired(email, "Email");
  const regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regEX.test(email) && !email) error.appendError("Invalid email address.");
  return error.get();
}
export function register_validate(data) {
  const error = new Error()
    .isRequired(data.first_name, "First Name")
    .isRequired(data.last_name, "Last Name")
    .isOnlyRequiredOneOf([
      { field: data.email, name: "Email" },
      { field: data.phone, name: "Phone" },
    ])
    .isRequired(data.key, "Key");

  const regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regEX.test(data.email) && data.email)
    error.appendError("Invalid email address.");

  return error.get();
}
export function redirect_validate(data) {
  const error = new Error()
    .isRequired(data.exp, "Expired time")
    .isRequired(data.accessToken, "Access token")
    .isRequired(data.refreshToken, "Refresh token");

  return error.get();
}
