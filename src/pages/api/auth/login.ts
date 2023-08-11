import { NextApiHandler } from "next";

import { Credentials } from "lib/types";

import { pb } from "lib/pocketbase";

const handler: NextApiHandler = async (req, res) => {
  const credentials = req.body as Credentials;

  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(credentials.email, credentials.password);

    const cookie = pb.authStore.exportToCookie(
      {
        secure: true,
        sameSite: true,
        httpOnly: true,
        path: "/",
      },
      "token",
    );

    res.setHeader("set-cookie", cookie).status(200).json(authData);
  } catch (error: unknown) {
    console.error(error);
    res.status(403);
  }

  res.end();
};

export default handler;
