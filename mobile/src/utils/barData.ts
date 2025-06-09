import React from "react";
import dayjs from "dayjs";
import { COLORS } from "../constants";

type HistoryEntry = {
  date: string;
  cgpa: number;
};

type Mode = "weekly" | "monthly" | "yearly";

const getLabels = (mode: Mode) => {
  if (mode === "weekly")
    return ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  if (mode === "monthly")
    return Array.from({ length: 7 }, (_, i) =>
      dayjs()
        .subtract(6 - i, "month")
        .format("MMM")
    );
  if (mode === "yearly")
    return Array.from({ length: 7 }, (_, i) => `${dayjs().year() - 6 + i}`);
  return [];
};

const getUnit = (mode: Mode) => {
  switch (mode) {
    case "weekly":
      return { unit: "week", subunit: "day", count: 7, format: "ddd" };
    case "monthly":
      return { unit: "month", subunit: "month", count: 7, format: "MMM" };
    case "yearly":
      return { unit: "year", subunit: "year", count: 7, format: "YYYY" };
  }
};

export const useBarChartNavigation = (
  history: HistoryEntry[],
  mode: Mode = "weekly"
) => {
  const [offset, setOffset] = React.useState(0);

  const { unit, subunit, count, format } = getUnit(mode);
  const labels = React.useMemo(() => getLabels(mode), [mode]);

  const rangeStart = React.useMemo(
    () =>
      dayjs()
        .startOf(unit as any)
        .subtract(offset, unit as any),
    [offset]
  );
  const rangeEnd = React.useMemo(
    () => rangeStart.add(1, unit as any),
    [rangeStart]
  );

  const rangeLabel = React.useMemo(() => {
    const start = rangeStart.format("MMM D");
    const end = rangeEnd.subtract(1, "day").format("MMM D");
    return `${start} - ${end}`;
  }, [rangeStart, rangeEnd]);

  const filtered = React.useMemo(() => {
    return history.filter(
      (entry) =>
        dayjs(entry.date).isAfter(rangeStart) &&
        dayjs(entry.date).isBefore(rangeEnd)
    );
  }, [history, rangeStart, rangeEnd]);

  const barData = React.useMemo(() => {
    const sums: Record<string, number> = Object.fromEntries(
      labels.map((l) => [l, 0])
    );
    const counts: Record<string, number> = Object.fromEntries(
      labels.map((l) => [l, 0])
    );
    const startDates: Record<string, string> = {};

    labels.forEach((label, index) => {
      let start: dayjs.Dayjs;
      if (mode === "weekly") {
        start = rangeStart.startOf("week").add(index, "day");
      } else {
        start = dayjs()
          .startOf(unit as any)
          .subtract(offset * count + (count - 1 - index), subunit as any);
      }
      startDates[label] = start.toISOString();
    });

    filtered.forEach((entry) => {
      const label = dayjs(entry.date).format(format);
      if (label in sums) {
        sums[label] += (entry.cgpa / 4) * 100;
        counts[label] += 1;
      }
    });

    return labels.map((label) => {
      const avg = counts[label] ? sums[label] / counts[label] : 0;
      return {
        label,
        value: parseFloat(avg.toFixed(2)),
        startDate: startDates[label],
        frontColor: COLORS.secondary,
        showGradient: avg !== 0,
      };
    });
  }, [filtered, labels, offset]);

  const goPrevious = () => setOffset((prev) => prev + 1);
  const goNext = () => setOffset((prev) => Math.max(prev - 1, 0));

  return {
    barData,
    rangeLabel,
    goPrevious,
    goNext,
    canGoNext: offset > 0,
    offset,
    rangeStart: rangeStart.toDate(),
    rangeEnd: rangeEnd.toDate(),
  };
};
