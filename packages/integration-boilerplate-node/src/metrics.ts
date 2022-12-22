import otel, {
  Counter,
  Histogram,
  Meter,
  MetricOptions,
  UpDownCounter,
  ValueType,
} from "@opentelemetry/api";

export class MetricsManager {
  private counters: Record<string, Counter> = {};
  private updownCounters: Record<string, UpDownCounter> = {};
  private histograms: Record<string, Histogram> = {};

  private metricsPrefix: string;
  private meter: Meter;

  constructor(integrationName: string) {
    if ((integrationName ?? "").length === 0) {
      throw new Error(
        "Cannot initialize metrics manager without an integration name"
      );
    }

    const meter = otel.metrics.getMeter(integrationName);
    this.meter = meter;

    const metricsPrefix = `saasquatch.integrations.${integrationName}`;
    this.metricsPrefix = metricsPrefix;

    this.createCounter("webhook_request", {
      description: "Incremented each time a webhook request is received",
      valueType: ValueType.INT,
    });

    this.createCounter("form_request", {
      description: "Incremented each time a form request is received",
      valueType: ValueType.INT,
    });

    this.createCounter("introspection_request", {
      description: "Incremented each time an introspection request is received",
      valueType: ValueType.INT,
    });

    this.createUpDownCounter("requests_processing", {
      description:
        "The number of requests that the server is currently processing",
      valueType: ValueType.INT,
    });

    this.createHistogram("response_time", {
      description:
        "The response time of the integration HTTP server measured in microseconds",
      unit: "microseconds",
      valueType: ValueType.INT,
    });
  }

  public createCounter(name: string, options?: MetricOptions): void {
    // to avoid confusion, creating a counter and updown counter with the same name will be
    // disallowed
    if (
      this.counters[name] !== undefined ||
      this.updownCounters[name] !== undefined
    ) {
      throw new Error(`Custom counter "${name}" already exists`);
    }

    this.counters[name] = this.meter.createCounter(
      `${this.metricsPrefix}.${name}`,
      options
    );
  }

  public createUpDownCounter(name: string, options?: MetricOptions): void {
    // to avoid confusion, creating a counter and updown counter with the same name will be
    // disallowed
    if (
      this.updownCounters[name] !== undefined ||
      this.counters[name] !== undefined
    ) {
      throw new Error(`Custom counter "${name}" already exists`);
    }

    this.updownCounters[name] = this.meter.createCounter(
      `${this.metricsPrefix}.${name}`,
      options
    );
  }

  public increment(name: string): void {
    if (this.counters[name] !== undefined) {
      this.counters[name]!.add(1);
    } else if (this.updownCounters[name] !== undefined) {
      this.updownCounters[name]!.add(1);
    }
  }

  public decrement(name: string): void {
    this.updownCounters[name]?.add(-1);
  }

  public createHistogram(name: string, options?: MetricOptions): void {
    if (this.histograms[name] !== undefined) {
      throw new Error(`Histogram "${name}" already exists`);
    }

    this.histograms[name] = this.meter.createHistogram(
      `${this.metricsPrefix}.${name}`,
      options
    );
  }

  public recordHistogramVal(name: string, val: number): void {
    this.histograms[name]?.record(val);
  }
}
