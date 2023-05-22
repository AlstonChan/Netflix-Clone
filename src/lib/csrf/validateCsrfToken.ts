import type { NextApiRequest } from "next";

export default function validateCsrfToken(
  req: NextApiRequest,
  userGivenToken: string
): boolean {
  const secrets = req.cookies?.csrfToken;

  if (!secrets) return false;

  if (userGivenToken === secrets) {
    return true;
  } else return false;
}
