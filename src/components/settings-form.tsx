import { defaultSettingsFormValues, LS_SETTINGS_KEY, settingsFormFields } from "@/lib/constants";
import { getStoredValues } from "@/lib/getStoredValues";
import styles from "@/styles/form.module.css";
import type { SettingsForm } from "@/types";
import { useState } from "preact/hooks";

export function SettingsForm() {
  const [settings, setSettings] = useState<SettingsForm>(() => getStoredValues(LS_SETTINGS_KEY, defaultSettingsFormValues));

  const handleChange = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    const key = target.name as keyof SettingsForm;
    setSettings((prev) => ({
      ...prev,
      [key]: target.value,
    }));
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const settingsToStore = settingsFormFields.reduce((acc, field) => {
        acc[field.name] = settings[field.name] || field.defaultValue;
        return acc;
      }, {} as SettingsForm);

      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settingsToStore));

      setSettings(settingsToStore);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {settingsFormFields.map((field) => (
          <div key={field.id} className={styles["form-item"]}>
            <label className={styles.label} htmlFor={`${field.id}:form-item-label`}>
              {field.label}
            </label>
            <input
              className={styles.input}
              placeholder={field.placeholder}
              id={`${field.id}:form-item-label`}
              value={settings[field.name]}
              name={field.name}
              onFocus={(e) => (e.target as HTMLInputElement).select()}
              onInput={handleChange}
              aria-describedby={`${field.id}:form-item-description`}
            />
            <p id={`${field.id}:form-item-description`} className={styles.description}>
              e.g. {field.placeholder}
            </p>
          </div>
        ))}
        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
