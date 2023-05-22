import { adminAuth } from "@/lib/firebaseAdmin";

import type { NextApiRequest, NextApiResponse } from "next";
import type { UserRecord } from "firebase-admin/lib/auth/user-record";

type ResponseData = {
  user: UserRecord | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const deniedAccess = () => {
    res.setHeader(
      "Set-Cookie",
      `sessionId=null ;Path=/; HttpOnly; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`
    );
    res.setHeader("Content-Type", "application/json");
    res.status(401).json({ user: null });
    res.end();
  };

  try {
    if (req.body && req.method === "POST") {
      const { sessionId } = JSON.parse(req.body);

      const decodedIdToken = await adminAuth.verifySessionCookie(
        sessionId,
        true
      );

      console.log(decodedIdToken);

      if (decodedIdToken && req.method === "POST") {
        const user = await adminAuth.getUser(decodedIdToken.uid);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ user });
        res.end();
      } else return deniedAccess();
    } else return deniedAccess();
  } catch (error: any) {
    deniedAccess();
  }
}
