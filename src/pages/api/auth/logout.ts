import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("set-cookie", "token=;Max-Age=0;path=/").end();
}
