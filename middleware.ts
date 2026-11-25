import { next, rewrite } from "@vercel/functions";

const stableURL =
  "https://blood-pressure-react-b16r8tec4-h-and-s-studio.vercel.app";

export const config = {
  matcher: ["/", "/assets/:path*", "/favicon.svg"],
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

  let response: Response;

  if (group === "stable") {
    const destination = new URL(request.url);
    destination.hostname = new URL(stableURL).hostname;

    response = rewrite(destination);
  } else {
    response = next();
  }

  response.headers.set("x-canary-group", group);

  if (new URL(request.url).pathname === "/") {
    response.headers.append(
      "Set-Cookie",
      `canary_group=${group}; Path=/; Max-Age=3600; SameSite=Lax; Secure`,
    );
    response.headers.set("Cache-Control", "private, no-store");
  }

  return response;
}
