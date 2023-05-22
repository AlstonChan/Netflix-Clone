import { enc } from "crypto-js";
import sha256 from "crypto-js/sha256";

import type { IncomingMessage, ServerResponse } from "http";

export default function generateCsrfToken(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  },
  res: ServerResponse<IncomingMessage>
) {
  const existingToken = req.cookies?.csrfToken;

  const secrets = Math.random().toString(36).substring(2);
  // Calculate the SHA-256 hash of the token
  const hash = existingToken || sha256(secrets).toString(enc.Hex);

  // Store the token in the user's session or any other secure storage mechanism
  // For example, you can set it as a cookie
  res.setHeader(
    "Set-Cookie",
    `csrfToken=${hash}; Path=/; HttpOnly; SameSite=Strict; Secure;`
  );

  return hash;
}
