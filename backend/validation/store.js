import Error from "../helper/error.js";

export function store_create_validate(store) {
    // Check null values
    let error = new Error()
    .isRequired(store.name, "Store's name")
    .isRequired(store.category, "Store's category")
    .isRequired(store.description, "Store's description")
    .isRequired(store.longitude, "Store's longitude")
    .isRequired(store.latitude, "Store's latitude")
    .isRequired(store.street, "Store's street")
    .isRequired(store.postcode, "Store's postcode")
    .isRequired(store.city, "Store's city")
    .isRequired(store.opening_hours, "Store's opening hours")
    // Check enter dates
    const enter_date = Date.parse(store.enter_date)
    if (!enter_date) error.appendError("Enter date format is invalid")
    else {
        error = error.isRequired(store.enter_date, "Store's enter date")
    }
    // Check opening hours values
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d$/
    const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    week.forEach(function (key, index) {
        if (store.opening_hours[key]) {
            if (!regex.test(store.opening_hours[key])) {
                error.appendError(`Opening hours format in ${key} is invalid`);
            }
        } else {
            error = error.isRequired(store.opening_hours[key], `Opening hours in ${key}`);
        }
    })
    return error.get()
}

export function find_stores_validate(data) {
    const error = new Error()
    .isRequired(data.longitude, 'Longitude')
    .isRequired(data.latitude, 'Latitude')

    return error.get()
}