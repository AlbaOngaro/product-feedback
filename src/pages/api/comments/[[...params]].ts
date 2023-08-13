import { NextApiRequest, NextApiResponse } from "next";

import { surreal } from "lib/surreal";
import { AUTH_COOKIE_ID } from "lib/constants";

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
    case "POST": {
      const { suggestion, ...comment } = req.body;
      const result = await surreal.query(
        `
				LET $comment = INSERT INTO comment ${JSON.stringify(comment)};
				RELATE $suggestion->comments->$comment;
			`,
        {
          suggestion,
        },
      );
      res.json(result);
      break;
    }
    default:
      res.status(405).end();
  }
}
