"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  final: number;
  label: string;
  scrambleMin: number;
  scrambleMax: number;
  format: (n: number) => string;
};

const METRICS: Metric[] = [
  {
    final: 8860,
    label: "Svenska företag inom bearbetning av metall, plåt och komposit",
    scrambleMin: 1000,
    scrambleMax: 9999,
    format: (n) => new Intl.NumberFormat("sv-SE").format(n),
  },
  {
    final: 171,
    label: "Kartlagda företag i vår databas",
    scrambleMin: 10,
    scrambleMax: 999,
    format: (n) => String(n),
  },
  {
    final: 0,
    label: "Antal presenterade matchningar",
    scrambleMin: 0,
    scrambleMax: 0,
    format: (n) => String(n),
  },
];

const FRAMES = 40;
const INTERVAL_MS = 40;

export default function MetricsSection() {
  const [values, setValues] = useState(
    METRICS.map((m) => (m.final === 0 ? 0 : m.scrambleMin))
  );
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        METRICS.forEach((metric, i) => {
          if (metric.final === 0) return;

          let frame = 0;
          const interval = setInterval(() => {
            frame++;
            if (frame >= FRAMES) {
              clearInterval(interval);
              setValues((prev) => {
                const next = [...prev];
                next[i] = metric.final;
                return next;
              });
            } else {
              const rand =
                Math.floor(
                  Math.random() * (metric.scrambleMax - metric.scrambleMin + 1)
                ) + metric.scrambleMin;
              setValues((prev) => {
                const next = [...prev];
                next[i] = rand;
                return next;
              });
            }
          }, INTERVAL_MS);

          intervals.current.push(interval);
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      intervals.current.forEach(clearInterval);
    };
  }, []);

  return (
    <section className="metrics-section" ref={ref}>
      <div className="container">
        <div className="metrics-grid">
          {METRICS.map((metric, i) => (
            <div key={i} className="metric-item">
              <span className="metric-number">{metric.format(values[i])}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
