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
