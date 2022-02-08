import { unsetAuthCookies } from "next-firebase-auth";
import initAuth from "../../lib/initAuth";

initAuth();

const handler = async (req, res) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    console.group();
    console.info("\x1b[33m", `Error Code: ${e.code}`);
    console.log("\x1b[31m", `Error Message: ${e.message}`);
    console.groupEnd();
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ success: true });
};

export default handler;
