import otel from "@opentelemetry/api";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { Resource } from "@opentelemetry/resources";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

export function installInstrumentation(
  serviceName: string,
  hostName: string
): void {
  const metricExporter = new OTLPMetricExporter({});
  const meterProvider = new MeterProvider({
    resource: new Resource({
      // Service version is required according to Datadog docs but we don't
      // really have a concept of "service versions" so it will be hard coded to
      // 1.0.0
      [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.HOST_NAME]: hostName,
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
        process.env["DEPLOYMENT_ENVIRONMENT"] ?? "staging",
    }),
  });

  meterProvider.addMetricReader(
    new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 3000,
    })
  );

  otel.metrics.setGlobalMeterProvider(meterProvider);
}
