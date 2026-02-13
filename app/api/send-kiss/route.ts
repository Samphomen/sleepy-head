import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const { image, cardChoice } = await request.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Strip base64 prefix
        const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || "Ishaqcole@gmail.com",
            subject: `She chose: ${cardChoice}!`,
            html: `
                <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 500px; margin: 0 auto; text-align: center; padding: 40px 20px; background-color: #0a0a0a; color: #fff;">
                    <h1 style="font-size: 28px; color: #fb7185; margin-bottom: 8px;">Date Sealed!</h1>
                    <p style="font-size: 16px; color: #999; margin: 16px 0;">She chose: <strong style="color: #fff;">${cardChoice}</strong></p>
                    <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
                    <p style="font-size: 13px; color: #666;">Her blown kiss is attached below</p>
                    <p style="font-size: 11px; color: #444; margin-top: 30px;">From Sleepy Head</p>
                </div>
            `,
            attachments: [
                {
                    filename: "blown-kiss.jpg",
                    content: base64Image,
                    encoding: "base64",
                },
            ],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
