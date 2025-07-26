import type { SettingsForm } from "@/types";

export const borderColorVariants = ["var(--sl-color-blue)", "var(--sl-color-red)", "var(--sl-color-green)", "var(--sl-color-orange)", "var(--sl-color-purple)", "var(--sl-color-yellow)"];

export const colorVariants = [
  "var(--sl-color-blue-high)",
  "var(--sl-color-red-high)",
  "var(--sl-color-green-high)",
  "var(--sl-color-orange-high)",
  "var(--sl-color-purple-high)",
  "var(--sl-color-yellow-high)",
];

export const LS_SETTINGS_KEY = "codeshare-v1-settings";

export const defaultSettingsLocalStorage: SettingsForm = {
  username: "$USERNAME",
  ipAddress: "$IP_ADDRESS",
  dockerPath: "/PATH_TO_DOCKER_APPS",
  externalHddPath: "/PATH_TO_EXTERNAL_HDD",
  externalHddUuid: "$EXTERNAL_HDD_UUID",
  nfsSharePath: "/PATH_TO_NFS_SHARE",
  nfsMountPath: "/PATH_TO_NFS_MOUNT",
};

export const settingsFormFields = [
  {
    id: "799b2c11-b269-43cd-8e05-f29a641d26eb",
    label: "Username",
    placeholder: "doej",
    name: "username",
    defaultValue: defaultSettingsLocalStorage.username,
  },
  {
    id: "e10ff1e0-3211-4730-afbc-9bb7ac290b19",
    label: "IP address",
    placeholder: "192.168.1.2",
    name: "ipAddress",
    defaultValue: defaultSettingsLocalStorage.ipAddress,
  },
  {
    id: "2acef3b3-bc47-4c1f-a12a-b7b10183bea7",
    label: "Docker path",
    placeholder: "/opt/docker-apps",
    name: "dockerPath",
    defaultValue: defaultSettingsLocalStorage.dockerPath,
  },
  {
    id: "86ac4f08-750b-42e1-9326-c545af487da0",
    label: "External HDD path",
    placeholder: "/mnt/flex",
    name: "externalHddPath",
    defaultValue: defaultSettingsLocalStorage.externalHddPath,
  },
  {
    id: "afab9f7e-5b71-47a0-9a26-037889b200ea",
    label: "External HDD UUID",
    placeholder: "23d23c78-172a-4d51-9178-3ac30dfb6252",
    name: "externalHddUuid",
    defaultValue: defaultSettingsLocalStorage.externalHddUuid,
  },
  {
    id: "e41d238a-34ec-4e14-bed3-ea8d55ac989d",
    label: "NFS share path",
    placeholder: "/home/user/Videos",
    name: "nfsSharePath",
    defaultValue: defaultSettingsLocalStorage.nfsSharePath,
  },
  {
    id: "7211b2bf-2984-4b7e-9394-d6d244824772",
    label: "NFS mount path",
    placeholder: "/home/user/videos-nfs",
    name: "nfsMountPath",
    defaultValue: defaultSettingsLocalStorage.nfsMountPath,
  },
] as const;

export const defaultSettingsFormValues: SettingsForm = {
  username: "",
  ipAddress: "",
  dockerPath: "",
  externalHddPath: "",
  externalHddUuid: "",
  nfsSharePath: "",
  nfsMountPath: "",
};
