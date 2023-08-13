import { AUTH_COOKIE_ID } from "lib/constants";
import { GET_ALL_CATEGORIES } from "lib/queries/GET_ALL_CATEGORIES";
import { surreal } from "lib/surreal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies[AUTH_COOKIE_ID];

  if (!token) {
    res.status(401).end();
    return;
  }

  try {
    await surreal.authenticate(token);
  } catch (error: unknown) {
    res.status(403).end();
    return;
  }

  switch (req.method) {
    case "GET": {
      const [response] = await surreal.query(GET_ALL_CATEGORIES);
      res.json(response.result);
      break;
    }
    default:
      res.status(405).end();
      break;
  }
}
