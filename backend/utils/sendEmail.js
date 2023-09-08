const nodeMailer = require("nodemailer")

exports.sendEail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,

            pass: process.env.SMPT_PASSWORD
        },
    })
    const mailOption = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.messgae,
    }
    await transporter.sendMail(mailOption);
}