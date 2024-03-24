import { STORE_ROLE } from "../constant/role.js";
import Error from "../helper/error.js";

export function create_mod_validate(data) {
  const error = new Error()
    .isRequired(data.store_id, "Store ID")
    .isRequired(data.email, "Email")
    .isRequired(data.name, "Name")
    .isRequired(data.phone, "Phone")
    .isRequired(data.role, "Role")


  const regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regEX.test(data.email) && data.email) error.appendError("Invalid email address.");
  if (data.role && !(data.role.toUpperCase() in STORE_ROLE)) error.appendError("Invalid role.");
  return error.get();
}
export function mod_login_validate(data) {
  const error = new Error()
    .isRequired(data.email, "Email")
    .isRequired(data.password, "Password");
  const regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regEX.test(data.email) && data.email)
    error.appendError("Invalid email address.");
  return error.get();
}

export function mod_password_validate(password) {
  const error = new Error()
    .isRequired(password, "Password")
    .isValidLength(password, "Password", 8, 20);

  return error.get();
}
