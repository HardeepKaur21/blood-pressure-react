import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 10,

  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate==1"],
  },
};

export default function () {
  const url = __ENV.K6_BASE_URL;

  const response = http.get(url, {
    headers: {
      "x-vercel-protection-bypass": __ENV.VERCEL_AUTOMATION_BYPASS_SECRET,
    },
  });

  check(response, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
