import { NextApiRequest, NextApiResponse } from "next";

import { pb } from "lib/pocketbase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = req.headers.cookie;

  if (!cookies) {
    res.status(401).end();
    return;
  }

  pb.authStore.loadFromCookie(cookies, "token");

  try {
    const authData = await pb.collection("users").authRefresh();
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
  } catch (_) {
    pb.authStore.clear();
    res.status(401).end();
  }
}
