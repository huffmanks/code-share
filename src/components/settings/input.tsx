import styles from "@/styles/settings-input.module.css";
import type { SettingsForm, SettingsFormField } from "@/types";
import type { Dispatch, StateUpdater } from "preact/hooks";

interface SettingsInputProps {
  field: SettingsFormField;
  settings: SettingsForm;
  setSettings: Dispatch<StateUpdater<SettingsForm>>;
}

export function SettingsInput({ field, settings, setSettings }: SettingsInputProps) {
  const handleChange = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    const key = target.name as keyof SettingsForm;
    setSettings((prev) => ({
      ...prev,
      [key]: target.value,
    }));
  };

  return (
    <>
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
    </>
  );
}
