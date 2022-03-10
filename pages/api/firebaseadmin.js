import { getFirebaseAdmin } from "next-firebase-auth";

const uid = "K5vJqakUzlSpoPdWN23yiJ15F4Z2";

const handler = async (req, res) => {
  try {
    const auth = getFirebaseAdmin().auth();
    const { profilePic, userCredential } = req.body;

    console.log(userCredential);

    auth.getUser(uid).then((userRecord) => {
      // The claims can be accessed on the user record.
      console.log(userRecord.customClaims);
      res.status(200).json({ success: userRecord });
    });

    // .setCustomUserClaims(userCredential.user.uid, {
    //   profilePicNum: profilePic,
    // })
    // .then((userRecord) => {
    //   // See the UserRecord reference doc for the contents of userRecord.
    //   res.status(200).json({ success: userRecord });
    //   res.end();
    // })
    // .catch((error) => {
    //   console.log("Error fetching user data:", error);
    // });
  } catch (e) {
    console.group();
    console.info("\x1b[33m", `Error Code: ${e.code}`);
    console.log("\x1b[31m", `Error Message: ${e.message}`);
    console.groupEnd();
    res.status(500).json({ error: "Unexpected error." });
    res.end();
  }
};

export default handler;
