export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const parsedDate = new Date(date.setMinutes(date.getMinutes() + date.getTimezoneOffset()));

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  const now = Date.now();
  const diffInSeconds = Math.round((parsedDate.getTime() - now) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always", style: "short" });

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds || unit === "second") {
      return rtf.format(Math.round(diffInSeconds / seconds), unit);
    }
  }
}
