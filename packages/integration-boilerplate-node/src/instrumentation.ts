import otel from "@opentelemetry/api";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import {
  ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

export function installInstrumentation(
  serviceName: string,
  hostName: string,
  deploymentEnv: string,
  url?: string,
): void {
  const metricExporter = new OTLPMetricExporter({ url });
  const meterProvider = new MeterProvider({
    resource: resourceFromAttributes({
      // Service version is required according to Datadog docs but we don't
      // really have a concept of "service versions" so it will be hard coded to
      // 1.0.0
      [ATTR_SERVICE_NAME]: serviceName,
      [ATTR_SERVICE_VERSION]: "1.0.0",
      "host.name": hostName,
      [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: deploymentEnv,
    }),
    readers: [
      new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: 3000,
      }),
    ],
  });

  otel.metrics.setGlobalMeterProvider(meterProvider);
}
