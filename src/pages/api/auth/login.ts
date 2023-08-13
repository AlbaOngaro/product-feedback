import { NextApiHandler } from "next";
import { setCookie } from "nookies";

import { Credentials } from "lib/types";
import { surreal } from "lib/surreal";
import { AUTH_COOKIE_ID } from "lib/constants";

const handler: NextApiHandler = async (req, res) => {
  const credentials = req.body as Credentials;

  try {
    const token = await surreal.signin({
      NS: "test",
      DB: "test",
      SC: "allusers",
      user: credentials.email,
      pass: credentials.password,
    });

    if (!token) {
      throw new Error("Something wrong, in the neighborhood");
    }

    setCookie({ res }, AUTH_COOKIE_ID, token, {
      secure: true,
      sameSite: true,
      httpOnly: true,
      path: "/",
    });
  } catch (error: unknown) {
    console.error(error);
    res.status(401);
  }

  res.end();
};

export default handler;
