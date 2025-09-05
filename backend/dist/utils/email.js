"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailReminder = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env['EMAIL_HOST'],
    port: Number(process.env['EMAIL_PORT']),
    // service: 'gmail',
    auth: {
        user: process.env['EMAIL_USER'],
        pass: process.env['EMAIL_PASS'],
    },
});
const sendEmailReminder = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: `"SkillForge" <${process.env['EMAIL_USER']}>`,
            to,
            subject,
            text
        });
        console.log(`Email sent to ${to} with subject "${subject}"`);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendEmailReminder = sendEmailReminder;
//# sourceMappingURL=email.js.map