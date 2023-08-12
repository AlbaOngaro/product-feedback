import { NextApiRequest, NextApiResponse } from "next";

import { surreal } from "lib/surreal";
import { GET_ALL_SUGGESTIONS } from "lib/queries/GET_ALL_SUGGESTIONS";
import { GET_SUGGESTION } from "lib/queries/GET_SUGGESTION";
import { Suggestion } from "lib/types";

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
  } catch (error: unknown) {
    res.status(403).end();
    return;
  }

  switch (req.method) {
    case "GET": {
      const params = req.query.params;

      if (params?.length !== 1) {
        const [response] = await surreal.query(GET_ALL_SUGGESTIONS);

        if (response.status === "ERR") {
          res.status(500).send(response.detail);
          break;
        }

        res.json(response.result);
        break;
      }

      const [suggestion] = params;

      const [response] = await surreal.query(GET_SUGGESTION, {
        suggestion,
      });

      if (
        response.status === "ERR" ||
        !response.result ||
        !Array.isArray(response.result)
      ) {
        res.status(500).send(response.detail);
        break;
      }

      res.json(response.result[0] as unknown as Suggestion);
      break;
    }
    case "POST": {
      try {
        const [response] = await surreal.create("suggestion", req.body);
        res.json(response);
        break;
      } catch (error: unknown) {
        res.status(500).end();
        break;
      }
    }
    default:
      res.status(405).end();
      break;
  }
}
