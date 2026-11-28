import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "20s", target: 2 },
    { duration: "5s", target: 45 },
    { duration: "30s", target: 45 },
    { duration: "5s", target: 4 },
    { duration: "20s", target: 2 },
    { duration: "5s", target: 0 },
  ],

  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate==1"],
  },
};

export default function () {
  const response = http.get(__ENV.K6_BASE_URL, {
    headers: {
      "x-vercel-protection-bypass": __ENV.VERCEL_AUTOMATION_BYPASS_SECRET,
    },
  });

  check(response, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
