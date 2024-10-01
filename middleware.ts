import PocketBase from "pocketbase";
import { next, rewrite } from "@vercel/edge";

// This middleware will block all unauthenticated requests. In order for the users
// to go through the login flow, we need to NOT protect /public/** and /api/**.
export const config = {
  matcher: ["/", "/((?!public/|api/).*)"],
};

export default async function authentication(request: Request) {
  const pb = new PocketBase("https://api.rössing.de");
  const cookie = request.headers.get("cookie");
  if (!cookie) return rewrite("/public/login.html");
  pb.authStore.loadFromCookie(cookie);
  try {
    await pb.collection("users").authRefresh();
    if (pb.authStore.model?.zukunft) {
      return next();
    } else {
      return rewrite("/public/not_a_member.html");
    }
  } catch {
    return rewrite("/public/login.html");
  }
}
