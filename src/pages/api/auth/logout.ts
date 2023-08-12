import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  destroyCookie({ res }, "token");
  res.end();
}
