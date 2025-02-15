import type { SettingsForm } from "@/types";

export function getStoredValues(key: string, defaultValues: SettingsForm) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValues;
}
