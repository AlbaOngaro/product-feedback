import { Surreal } from "surrealdb.js";
import { NextApiRequest, NextApiResponse } from "next";

import { surreal } from "lib/surreal";

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
    const info = await (surreal as Surreal).info();
    res.json(info);
  } catch (error: unknown) {
    console.error(error);
    res.status(401);
  }

  res.end();
}
