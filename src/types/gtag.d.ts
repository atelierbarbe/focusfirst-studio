export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: "consent" | "config" | "event" | "js" | string,
      action: string | Date,
      options?: Record<string, string | boolean | number>
    ) => void;
  }
}
