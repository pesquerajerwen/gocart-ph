import crypto from "crypto";
import { NextApiRequest } from "next";

export async function encodeBase64(input: string) {
  const encoded = Buffer.from(input).toString("base64");
  return encoded;
}

export async function getPayMongoAuthHeaderSingleKey() {
  const secretKey = process.env.PAYMONGO_SECRET_KEY;
  const base64Key = await encodeBase64(`${secretKey}:`);
  return `Basic ${base64Key}`;
}

export async function getPayMongoAuthHeaderBothKey() {
  const secretKey = process.env.PAYMONGO_SECRET_KEY;
  const apiKey = process.env.PAYMONGO_API_KEY;

  const base64Key = await encodeBase64(`${secretKey}:${apiKey}`);
  return `Basic ${base64Key}`;
}

export function verifyPaymongoSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
  mode: "test" | "live"
) {
  // Match all parts (t, te, li)
  const matches = signatureHeader.match(
    /t=(\d+),te=([a-f0-9]*),li=([a-f0-9]*)/i
  );
  if (!matches) {
    console.error("❌ Invalid signature format:", signatureHeader);
    return false;
  }

  const timestamp = matches[1];
  const testSignature = matches[2];
  const liveSignature = matches[3];

  // Select correct one based on mode
  const signature = mode === "live" ? liveSignature : testSignature;

  if (!signature) {
    console.error(`❌ Missing ${mode} signature`);
    return false;
  }

  // Construct signed payload
  const signedPayload = `${timestamp}.${rawBody}`;

  // Compute HMAC SHA-256
  const computed = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  // Constant-time comparison
  const sigBuf = Buffer.from(signature, "hex");
  const compBuf = Buffer.from(computed, "hex");

  if (sigBuf.length !== compBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, compBuf);
}

export function getRequestRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    req.on("error", reject);
  });
}
