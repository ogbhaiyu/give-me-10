export const SITE_NAME = "Ten";
export const AMOUNT = 10;

/**
 * Paste your Remitly payment-request link here (Remitly app -> Request ->
 * enter amount -> share link), or set NEXT_PUBLIC_REMITLY_URL in .env.local.
 * Leave empty to fall back to remitly.com.
 */
const LINK_FROM_CONFIG = "https://remit.ly/qywuuuft";

const LINK_FROM_ENV = process.env.NEXT_PUBLIC_REMITLY_URL?.trim() ?? "";

const DEFAULT_LINK = "https://www.remitly.com";

export const REMITLY_URL = LINK_FROM_ENV || LINK_FROM_CONFIG;

export const paymentUrl = REMITLY_URL || DEFAULT_LINK;

export const isPaymentConfigured = REMITLY_URL.length > 0;

export const money = `$${AMOUNT}`;
