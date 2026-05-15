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
  serverIpAddress: "$SERVER_IP_ADDRESS",
  clientIpAddress: "$CLIENT_IP_ADDRESS",
  hostname: "$HOSTNAME",
  timeZone: "$TIME_ZONE",
  dockerPath: "/PATH_TO_DOCKER_APPS",
  externalHddPath: "/PATH_TO_EXTERNAL_HDD",
  externalHddUuid: "$EXTERNAL_HDD_UUID",
  nfsSharePath: "/PATH_TO_NFS_SHARE",
  nfsMountPath: "/PATH_TO_NFS_MOUNT",
  rsyncLocalPath: "/PATH_TO_RSYNC_LOCAL_PATH",
  rsyncRemotePath: "/PATH_TO_RSYNC_REMOTE_PATH",
  smbSharePath: "/PATH_TO_SMB_SHARE",
};

export type Category = "Networking" | "Docker" | "HDD" | "File sharing";
export type CategorySlug = "networking" | "docker" | "hdd" | "file-sharing";

export type TimeZone = {
  identifier: string;
  offset: string;
};

export type SettingsFormField = {
  id: string;
  label: string;
  placeholder: string;
  name: keyof SettingsForm;
  selectOptions?: Array<TimeZone>;
  defaultValue: string;
  category: Category;
  categorySlug: CategorySlug;
};

export const timeZones: Array<TimeZone> = [
  { identifier: "America/Anchorage", offset: "UTC -9" },
  { identifier: "America/Chicago", offset: "UTC -6" },
  { identifier: "America/Denver", offset: "UTC -7" },
  { identifier: "America/Halifax", offset: "UTC -4" },
  { identifier: "America/Los_Angeles", offset: "UTC -8" },
  { identifier: "America/New_York", offset: "UTC -5" },
  { identifier: "America/Noronha", offset: "UTC -2" },
  { identifier: "America/Phoenix", offset: "UTC -7" },
  { identifier: "America/Sao_Paulo", offset: "UTC -3" },
  { identifier: "Atlantic/Azores", offset: "UTC -1" },
  { identifier: "Europe/Athens", offset: "UTC +2" },
  { identifier: "Europe/Berlin", offset: "UTC +1" },
  { identifier: "Europe/London", offset: "UTC +0" },
  { identifier: "Europe/Moscow", offset: "UTC +3" },
  { identifier: "Europe/Paris", offset: "UTC +1" },
  { identifier: "Africa/Cairo", offset: "UTC +2" },
  { identifier: "Africa/Johannesburg", offset: "UTC +2" },
  { identifier: "Africa/Lagos", offset: "UTC +1" },
  { identifier: "Asia/Bangkok", offset: "UTC +7" },
  { identifier: "Asia/Dhaka", offset: "UTC +6" },
  { identifier: "Asia/Dubai", offset: "UTC +4" },
  { identifier: "Asia/Karachi", offset: "UTC +5" },
  { identifier: "Asia/Kolkata", offset: "UTC +5:30" },
  { identifier: "Asia/Seoul", offset: "UTC +9" },
  { identifier: "Asia/Shanghai", offset: "UTC +8" },
  { identifier: "Asia/Singapore", offset: "UTC +8" },
  { identifier: "Asia/Tokyo", offset: "UTC +9" },
  { identifier: "Australia/Hobart", offset: "UTC +11" },
  { identifier: "Australia/Perth", offset: "UTC +8" },
  { identifier: "Australia/Sydney", offset: "UTC +10" },
  { identifier: "Pacific/Auckland", offset: "UTC +12" },
  { identifier: "Pacific/Honolulu", offset: "UTC -10" },
];

export const settingsFormFields: Array<SettingsFormField> = [
  {
    id: "799b2c11-b269-43cd-8e05-f29a641d26eb",
    label: "Username",
    placeholder: "doej",
    name: "username",
    defaultValue: defaultSettingsLocalStorage.username,
    category: "Networking" as Category,
    categorySlug: "networking" as CategorySlug,
  },
  {
    id: "75a2b73b-6022-4566-adf8-61ea265d73bd",
    label: "Hostname",
    placeholder: "ok-mac-pro",
    name: "hostname",
    defaultValue: defaultSettingsLocalStorage.hostname,
    category: "Networking" as Category,
    categorySlug: "networking" as CategorySlug,
  },
  {
    id: "b5ec8740-a206-409d-9bce-0e711b87c85a",
    label: "Time zone",
    placeholder: "America/New_York",
    name: "timeZone",
    selectOptions: timeZones,
    defaultValue: defaultSettingsLocalStorage.timeZone,
    category: "Networking" as Category,
    categorySlug: "networking" as CategorySlug,
  },
  {
    id: "e10ff1e0-3211-4730-afbc-9bb7ac290b19",
    label: "Server: IP address",
    placeholder: "192.168.100.100",
    name: "serverIpAddress",
    defaultValue: defaultSettingsLocalStorage.serverIpAddress,
    category: "Networking" as Category,
    categorySlug: "networking" as CategorySlug,
  },
  {
    id: "645786c3-c668-4369-a33f-bba7f477579c",
    label: "Client: IP address",
    placeholder: "192.168.100.101",
    name: "clientIpAddress",
    defaultValue: defaultSettingsLocalStorage.clientIpAddress,
    category: "Networking" as Category,
    categorySlug: "networking" as CategorySlug,
  },
  {
    id: "2acef3b3-bc47-4c1f-a12a-b7b10183bea7",
    label: "Docker: Stacks path",
    placeholder: "~/.opt/stacks",
    name: "dockerPath",
    defaultValue: defaultSettingsLocalStorage.dockerPath,
    category: "Docker" as Category,
    categorySlug: "docker" as CategorySlug,
  },
  {
    id: "86ac4f08-750b-42e1-9326-c545af487da0",
    label: "External HDD: Source path",
    placeholder: "/mnt/flex",
    name: "externalHddPath",
    defaultValue: defaultSettingsLocalStorage.externalHddPath,
    category: "HDD" as Category,
    categorySlug: "hdd" as CategorySlug,
  },
  {
    id: "afab9f7e-5b71-47a0-9a26-037889b200ea",
    label: "External HDD: UUID",
    placeholder: "23d23c78-172a-4d51-9178-3ac30dfb6252",
    name: "externalHddUuid",
    defaultValue: defaultSettingsLocalStorage.externalHddUuid,
    category: "HDD" as Category,
    categorySlug: "hdd" as CategorySlug,
  },
  {
    id: "e41d238a-34ec-4e14-bed3-ea8d55ac989d",
    label: "NFS: Source path",
    placeholder: "/home/user/Videos",
    name: "nfsSharePath",
    defaultValue: defaultSettingsLocalStorage.nfsSharePath,
    category: "File sharing" as Category,
    categorySlug: "file-sharing" as CategorySlug,
  },
  {
    id: "7211b2bf-2984-4b7e-9394-d6d244824772",
    label: "NFS: Destination path",
    placeholder: "/home/user/videos-nfs",
    name: "nfsMountPath",
    defaultValue: defaultSettingsLocalStorage.nfsMountPath,
    category: "File sharing" as Category,
    categorySlug: "file-sharing" as CategorySlug,
  },
  {
    id: "7682f870-cdae-4d8b-90c7-83942c3c2d3c",
    label: "Rsync: Source path",
    placeholder: "/home/user/Videos",
    name: "rsyncLocalPath",
    defaultValue: defaultSettingsLocalStorage.rsyncLocalPath,
    category: "File sharing" as Category,
    categorySlug: "file-sharing" as CategorySlug,
  },
  {
    id: "b0b67018-8f4f-4866-b274-05c637d485ac",
    label: "Rsync: Destination path",
    placeholder: "/home/user/videos-rsync",
    name: "rsyncRemotePath",
    defaultValue: defaultSettingsLocalStorage.rsyncRemotePath,
    category: "File sharing" as Category,
    categorySlug: "file-sharing" as CategorySlug,
  },
  {
    id: "a6ad266d-441b-4881-b0c2-2437f916883f",
    label: "SMB: Source path",
    placeholder: "/home/user/Videos",
    name: "smbSharePath",
    defaultValue: defaultSettingsLocalStorage.smbSharePath,
    category: "File sharing" as Category,
    categorySlug: "file-sharing" as CategorySlug,
  },
];

export const defaultSettingsFormValues: SettingsForm = {
  username: "",
  serverIpAddress: "",
  clientIpAddress: "",
  hostname: "",
  timeZone: "",
  dockerPath: "",
  externalHddPath: "",
  externalHddUuid: "",
  nfsSharePath: "",
  nfsMountPath: "",
  rsyncLocalPath: "",
  rsyncRemotePath: "",
  smbSharePath: "",
};
