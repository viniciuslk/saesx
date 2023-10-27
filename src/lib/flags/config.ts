import type { Configuration } from "@happykit/flags/config";

export type AppFlags = {
  can_delete_pub: boolean
};

export const config: Configuration<AppFlags> = {
  envKey: process.env.NEXT_PUBLIC_FLAGS_ENV_KEY!,
  endpoint: process.env.NEXT_PUBLIC_FLAGS_ENDPOINT,
};