import { NextApiHandler } from "next";
import { setCookie } from "nookies";

import { Credentials } from "lib/types";
import { surreal } from "lib/surreal";
import { AUTH_COOKIE_ID } from "lib/constants";

const handler: NextApiHandler = async (req, res) => {
  const credentials = req.body as Credentials;

  try {
    const token = await surreal.signup({
      NS: "test",
      DB: "test",
      SC: "allusers",
      user: credentials.email,
      pass: credentials.password,
    });

    setCookie({ res }, AUTH_COOKIE_ID, token, {
      secure: true,
      sameSite: true,
      httpOnly: true,
      path: "/",
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(500);
  }

  res.end();
};

export default handler;
