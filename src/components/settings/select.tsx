import styles from "@/styles/settings-select.module.css";
import type { SettingsForm, SettingsFormField } from "@/types";
import type { Dispatch, StateUpdater } from "preact/hooks";

interface SettingsSelectProps {
  field: SettingsFormField;
  settings: SettingsForm;
  setSettings: Dispatch<StateUpdater<SettingsForm>>;
}

export function SettingsSelect({ field, settings, setSettings }: SettingsSelectProps) {
  const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
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
      <select className={styles.input} id={`${field.id}:form-item-label`} value={settings[field.name]} name={field.name} onChange={handleChange} aria-describedby={`${field.id}:form-item-description`}>
        {field.selectOptions!.map((option) => (
          <option key={option.identifier} value={option.identifier}>
            {option.identifier}
          </option>
        ))}
      </select>
      <p id={`${field.id}:form-item-description`} className={styles.description}>
        {`e.g. ${field.placeholder}` || `Select your preferred ${field.label.toLowerCase()}`}
      </p>
    </>
  );
}
