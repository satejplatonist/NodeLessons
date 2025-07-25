import { mailtrapClient,sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async(email,verificationCode) =>
{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}",verificationCode),
            category: "Email Verification"
        })
        console.log(`Email sent sucessfully ${response}`);
    } catch (error) {
        console.log(`Error sending email ${error}`)
        throw new Error(`Error sending email ${error}`);
    }
}

export const sendWelcomeEmail = async(email,name) => 
{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "d45334bc-9d49-476c-97e6-8dd97014fa22",
            template_variables: {
                "name": name,
                "company_info_name": "Satej Auth Company"
            }
        });

        console.log(`Welcome Email sent sucessfully ${response}`);

    } catch (error) {
        console.log(`Error sending welcome email ${error}`)
        throw new Error(`Error sending welcome email ${error}`);
    }
}


export const sendPasswordResetEmail = async(email,resetURL) => 
{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject: 'password reset email',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: 'Password Reset'
        })
    } catch (error) {
        console.log(`Error sending password reset email ${error}`)
        throw new Error(`Error sending password reset email ${error}`)
    }
}

export const sendResetSuccessEmail = async(email) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject: "password reset sucess email",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
        console.log(`Password - Reset sucess Email sent sucessfully ${response}`);
    } catch (error) {
        console.log(`Error sending password reset sucess email ${error}`)
        throw new Error(`Error sending password reset sucess email ${error}`)
    }
}