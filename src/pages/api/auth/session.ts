import { surreal } from "lib/surreal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies["token"];

  if (!token) {
    res.status(401).end();
    return;
  }

  try {
    await surreal.authenticate(token);
    const info = await surreal.info();
    res.json(info);
  } catch (error: unknown) {
    console.error(error);
    res.status(401);
  }

  res.end();
}
