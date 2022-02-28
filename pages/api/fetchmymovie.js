export default async function handler(req, res) {
  const { requiredKey, requestedData } = req.body;
  try {
    if (requiredKey === process.env.FETCH_KEY && req.method === "POST") {
      if (requestedData === "myl") {
        res.status(200).json({ quack: "quack" });
        res.end();
      } else {
        res.status(400);
        res.end(`Error 400 | Bad Request`);
      }
    } else {
      res.status(403);
      res.end(`Error 403 | Unauthorized`);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.end(`Error 500 | Internal Server Error`);
  }
}
