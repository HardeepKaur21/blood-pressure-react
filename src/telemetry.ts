import { getWebInstrumentations, initializeFaro } from "@grafana/faro-react";

import { TracingInstrumentation } from "@grafana/faro-web-tracing";

initializeFaro({
  url: "https://faro-collector-prod-eu-west-6.grafana.net/collect/e1a934ddd6905e02003400253de3a414",
  app: {
    name: "blood-pressure-react",
    version: "1.0.0",
    environment: import.meta.env.PROD ? "production" : "development",
  },
  instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()],
});
