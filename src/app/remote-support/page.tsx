"use client";

import { useEffect, useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default function RemoteSupportPage() {
  const [link, setLink] = useState("https://download.anydesk.com/AnyDesk.exe");
  const [id, setId] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    if (/Mac/i.test(ua)) setLink("https://download.anydesk.com/anydesk.dmg");
    else if (/Linux/i.test(ua)) setLink("https://download.anydesk.com/anydesk.tar.gz");
  }, []);

  const clearSignature = () => sigCanvas.current?.clear();

const generatePdf = async (signature: string, timestamp: string, ip: string) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("Remote Support Agreement", { x: 50, y: 370, size: 20, font, color: rgb(0, 0, 0) });
  page.drawText(`AnyDesk ID: ${id}`, { x: 50, y: 340, size: 14, font });
  page.drawText(`Date/Time: ${timestamp}`, { x: 50, y: 320, size: 14, font });
  page.drawText(`IP Address: ${ip}`, { x: 50, y: 300, size: 14, font });
  page.drawText(`Agreed to Terms: ${agreed ? "Yes" : "No"}`, { x: 50, y: 280, size: 14, font });

  const sigImage = await pdfDoc.embedPng(signature);
  page.drawImage(sigImage, { x: 50, y: 100, width: 200, height: 100 });

  const pdfBytes = await pdfDoc.save();

  // Convert to standard Uint8Array backed by ArrayBuffer
  const properArray = new Uint8Array(pdfBytes.length);
  properArray.set(pdfBytes);

  // Create blob safely
  const blob = new Blob([properArray.buffer], { type: "application/pdf" });
  return URL.createObjectURL(blob);
};


  const sendSupportRequest = async () => {
    if (!agreed) return alert("You must agree to the terms.");
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) return alert("Please sign the agreement.");

    setLoading(true);

    try {
      const signatureData = sigCanvas.current.toDataURL("image/png");
      const timestamp = new Date().toISOString();
      const ip = (await fetch("https://api.ipify.org?format=json").then((r) => r.json())).ip;

      // Generate PDF URL
      const pdfUrl = await generatePdf(signatureData, timestamp, ip);

      // Send to Web3Forms
      const formData = {
        accessKey: process.env.WEB3FORMS_ACCESS_KEY,
        subject: "Remote Support Agreement",
        from: process.env.FROM_EMAIL,
        to: process.env.SUPPORT_EMAIL,
        data: {
          anydeskId: id,
          agreed,
          timestamp,
          ip,
        },
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Web3Forms response:", data);

      setSent(true);
      alert("Support request sent successfully! Your agreement PDF will open now.");
      window.open(pdfUrl, "_blank");
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-bold">Remote Support</h2>
        <p className="text-gray-600">
          Download AnyDesk, agree to the terms, sign below, then send us your AnyDesk ID.
        </p>

        <a
          href={link}
          className="inline-block px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition"
        >
          Download AnyDesk
        </a>

        {!sent ? (
          <div className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Enter your AnyDesk ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <div className="border p-2 rounded-lg">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 400, height: 150, className: "border rounded-lg" }}
              />
              <button onClick={clearSignature} className="mt-2 text-sm text-red-600 underline">
                Clear Signature
              </button>
            </div>

{/* Disclaimer Section */}
<div className="border rounded-lg p-4 max-h-60 overflow-y-auto text-left text-sm bg-white">
  <h3 className="text-lg font-semibold mb-2">Remote Support Disclaimer & Agreement</h3>
  <p>
    By requesting and/or accepting our remote support services, you (“Client”) acknowledge and agree to the following terms and conditions:
  </p>
  <ol className="list-decimal list-inside space-y-2 mt-2">
    <li>
      <strong>Scope of Services:</strong> We provide remote technical support to assist with troubleshooting, installation, configuration, and maintenance of software and systems as agreed with the Client. We do not perform any illegal, unethical, or unauthorized activities.
    </li>
    <li>
      <strong>Consent to Remote Access:</strong> By sharing your AnyDesk ID and signing this agreement, you expressly authorize our support technicians to remotely access your device for the sole purpose of delivering the agreed support services. You may terminate the remote session at any time.
    </li>
    <li>
      <strong>Confidentiality:</strong> All data, files, configurations, and information accessed during the support session will be treated as strictly confidential. We will not copy, disclose, or use any of your information for any purpose other than the agreed support task.
    </li>
    <li>
      <strong>No Unauthorized Actions:</strong> We will not:
      <ul className="list-disc list-inside ml-4">
        <li>Perform any actions outside the agreed scope of work.</li>
        <li>Install, run, or configure any software without your consent.</li>
        <li>Access or modify personal files, emails, or confidential data not related to the support issue.</li>
        <li>Engage in or facilitate any illegal activity.</li>
      </ul>
    </li>
    <li>
      <strong>Liability:</strong> While every effort is made to ensure safe and effective support, the Client understands that remote support carries inherent risks, including but not limited to data loss or system disruption. The Client is responsible for maintaining backups. Our liability for damages is limited to the value of the services rendered.
    </li>
    <li>
      <strong>Indemnification:</strong> The Client agrees to indemnify and hold harmless our company and technicians against any claims, losses, or damages arising from the misuse of the services or providing false/unauthorized access.
    </li>
    <li>
      <strong>Agreement to Terms:</strong> By checking “I agree” and submitting your AnyDesk ID with signature, you confirm that:
      <ul className="list-disc list-inside ml-4">
        <li>You are authorized to request these services.</li>
        <li>You have read, understood, and accepted the above terms.</li>
        <li>You release us from any liability beyond what is stated herein.</li>
      </ul>
    </li>
  </ol>
</div>

{/* Checkbox */}
<label className="flex items-center gap-2 mt-3">
  <input
    type="checkbox"
    checked={agreed}
    onChange={() => setAgreed(!agreed)}
    className="w-4 h-4"
  />
  I have read and agree to the Remote Support Disclaimer & Agreement.
</label>


            <button
              onClick={sendSupportRequest}
              disabled={!id || !agreed || loading}
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send to Support"}
            </button>
          </div>
        ) : (
          <div className="text-green-700 p-4 border rounded-lg">
            ✅ We received your ID and signed agreement. A technician will connect shortly.
          </div>
        )}

        <p className="text-gray-500 text-sm mt-4">
          If you encounter issues, contact us at{" "}
          <a href="tel:+263771254430" className="text-blue-700 underline">
            +263 771 254 430
          </a>
        </p>
      </div>
    </section>
  );
}



