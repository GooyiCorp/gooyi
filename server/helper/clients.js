import NodeMailer from 'nodemailer'

export const sendAutoMail = async (options) => {
    const transporter = NodeMailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    })
    try {
        const info = await transporter.sendMail(options)
        console.log(info)
        return true
    }  catch (error) {
        console.log(error)
        return false
    }
}


