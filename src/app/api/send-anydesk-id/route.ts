import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, osLink, signature, agreed, timestamp, ip } = body || {};

    if (!id || typeof id !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid ID" }, { status: 400 });
    }

    // Send to Web3Forms
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: "Remote Support Request",
        from_name: id,
        reply_to: "noreply@yourdomain.com",
        data: {
          id,
          osLink,
          signature,
          agreed,
          timestamp,
          ip,
        },
      }),
    });

    const data = await res.json();
    console.log("Web3Forms response:", data);

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("send-anydesk-id error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
