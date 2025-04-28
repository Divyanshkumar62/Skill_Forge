import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    // service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendEmailReminder = async (to: string, subject: string, text: string) => {
    try {
        await transporter.sendMail({
            from: `"SkillForge" <${process.env.EMAIL_USER}>`,
            to, 
            subject,
            text
        });
        console.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error){
        console.error("Error sending email:", error);
    }
}