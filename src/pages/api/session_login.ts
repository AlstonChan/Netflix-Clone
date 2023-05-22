import { adminAuth } from "@/lib/firebaseAdmin";

import type { NextApiRequest, NextApiResponse } from "next";
import validateCsrfToken from "@/lib/csrf/validateCsrfToken";

type ResponseData = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { idToken, csrfToken, tokenIsRemembered } = JSON.parse(req.body);
  console.log(req.cookies);

  const fourteenDays = 60 * 60 * 24 * 14 * 1000;
  const oneHour = 60 * 5 * 1000;
  // const oneHour = 60 * 60 * 1000;

  const sessionExpiration = tokenIsRemembered ? fourteenDays : oneHour;

  // Guard against CSRF attacks.
  if (!validateCsrfToken(req, csrfToken) && req.method === "POST") {
    res.status(401).json({ status: "failed" });
    res.end();
    return;
  }

  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  const decodedIdToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    const sessions = await adminAuth.createSessionCookie(idToken, {
      expiresIn: sessionExpiration,
    });
    res.setHeader(
      "Set-Cookie",
      `sessionId=${sessions} ;Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${sessionExpiration}`
    );
    res.status(200).json({ status: "success" });
    res.end();
  } else {
    res.status(401).json({ status: "Recent sign in required!" });
    res.end();
  }
}
