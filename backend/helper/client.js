import NodeMailer from "nodemailer"


export const sendSuccess = (res, message, data = null) => {
    let responseJson = {
        success: true,
        message: message
    }
    if (data) responseJson.data = data
    return res.status(200).json(responseJson)
}

export const sendError = (res, message, code = 400) => {
    return res.status(code).json({
        success: false,
        message: message
    })
}

export const sendServerError = res =>
    res.status(500).json({
        success: false,
        message: 'Server Interval Error.'
    })

export const sendAutoMail = async (options) => {
    const transport = NodeMailer.createTransport({
        host: "smtp.ionos.de",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_HOST,
            pass: process.env.PASS_MAIL_HOST
        },
    })
    try {
        await transport.sendMail(options)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export function generate_key() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}