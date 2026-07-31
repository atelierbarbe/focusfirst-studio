export {};

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      options?: Record<string, string | boolean>
    ) => void;
  }
}
