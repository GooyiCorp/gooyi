import Error from "../helper/error.js";

export function create_coupon_validate(coupon) {
    const error = new Error()
        .isRequired(coupon.title, "Title")
        .isRequired(coupon.start_date, "Start Date")
        .isRequired(coupon.end_date, "End Date")
        .isRequired(coupon.expired_in, "Expired In")
        .isRequired(coupon.description, "Description")
        .isRequired(coupon.amount, "Amount")
        .isRequired(coupon.coupon_priorities, "Coupon Priorities");

    return error.get();
}

