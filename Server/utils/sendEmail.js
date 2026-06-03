import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.verify();
    console.log("✅ Email transporter is ready");
    console.log("EMAIL_HOST =", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
    console.log("CLIENT_URL =", process.env.CLIENT_URL);

    const info = await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    console.log("EMAIL_HOST =", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
    console.log("CLIENT_URL =", process.env.CLIENT_URL);
    console.log(error)
    throw error
    // Non-fatal — server continues
  }
};



export const passwordResetTemplate = (resetUrl, userName = "User") => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <div style="background:#22c55e;padding:24px;text-align:center;">
        <h1 style="color:white;margin:0;">Job Portal</h1>
      </div>

      <div style="padding:32px;">
        <h2 style="color:#333;">Password Reset Request</h2>

        <p style="color:#555;font-size:16px;line-height:1.6;">
          Hello <strong>${userName}</strong>,
        </p>

        <p style="color:#555;font-size:16px;line-height:1.6;">
          We received a request to reset your password. Click the button below to create a new password.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a
            href="${resetUrl}"
            style="
              background:#22c55e;
              color:white;
              text-decoration:none;
              padding:14px 28px;
              border-radius:8px;
              display:inline-block;
              font-weight:bold;
            "
          >
            Reset Password
          </a>
        </div>

        <p style="color:#666;font-size:14px;">
          This link will expire in <strong>1 hour</strong>.
        </p>

        <p style="color:#666;font-size:14px;">
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <hr style="border:none;border-top:1px solid #eee;margin:25px 0;" />

        <p style="color:#888;font-size:12px;word-break:break-all;">
          If the button doesn't work, copy and paste this URL into your browser:
        </p>

        <p style="color:#22c55e;font-size:12px;word-break:break-all;">
          ${resetUrl}
        </p>
      </div>

      <div style="background:#f8fafc;padding:18px;text-align:center;color:#888;font-size:12px;">
        © ${new Date().getFullYear()} Job Portal. All rights reserved.
      </div>

    </div>
  </body>
  </html>
  `;
};