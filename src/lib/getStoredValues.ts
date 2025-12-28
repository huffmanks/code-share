import type { SettingsForm } from "@/types";

export function getStoredValues(key: string, defaultValues: SettingsForm): SettingsForm {
  if (typeof window === "undefined") return defaultValues;

  const stored = localStorage.getItem(key);

  if (!stored) {
    return defaultValues;
  }

  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultValues;
  }
}
