export async function sendConfirmationSms(number, code) {
    console.log(number);
    const payload = {
        mobileNumber: number,
        message: `Use the code ${code} to authenticate with our great app!`,
    };

    return { status: 204 };
    return fetch("https://m183.gibz-informatik.ch/api/sms/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "MgA4ADQANAAzADAAOQA4ADMANAA4ADkANwAzADAAOAA5ADEA",
        },
        body: JSON.stringify(payload),
    });
}

export function generateConfirmationCode(number) {
    return Math.random().toString().slice(-number);
}
