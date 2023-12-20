import Error from "../helper/error.js";


export function create_admin_validate(data) {
    const errors = new Error()
    .isRequired(data.name, 'name')
    .isRequired(data.username, 'username')
    .isRequired(data.password, 'password')

    return errors.get()
}

export function login_validate(data) {
    const errors = new Error()
    .isRequired(data.username, 'username')
    .isRequired(data.password, 'password')

    return errors.get()
}