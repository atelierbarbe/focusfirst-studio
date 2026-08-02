export function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const notifyTo = process.env.RESEND_NOTIFY_TO;

  if (!apiKey || !from || !notifyTo) {
    return null;
  }

  return { apiKey, from, notifyTo };
}
