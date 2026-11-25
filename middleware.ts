import { next } from "@vercel/functions";

export const config = {
  matcher: ["/"],
};

export default function middleware(request: Request) {
  const cookies = request.headers.get("cookie") || "";

  const existingGroup = cookies
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("canary_group="))
    ?.split("=")[1];

  let group: "stable" | "canary";

  if (existingGroup === "stable" || existingGroup === "canary") {
    group = existingGroup;
  } else {
    group = Math.random() < 0.1 ? "canary" : "stable";
  }

  const response = next();

  response.headers.set("x-canary-group", group);

  response.headers.append(
    "Set-Cookie",
    `canary_group=${group}; Path=/; Max-Age=3600; SameSite=Lax; Secure`,
  );

  return response;
}
