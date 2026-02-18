/* ================= AI GLOBAL SETTINGS ================= */

const STORAGE_KEY = "rupeedial_ai_enabled";

/* ================= INTERNAL STATE ================= */

// default true, but load from storage
let aiEnabled: boolean =
  localStorage.getItem(STORAGE_KEY) !== null
    ? localStorage.getItem(STORAGE_KEY) === "true"
    : true;

/* ================= GETTERS ================= */

/** 🔍 Check if AI is enabled */
export const isAIEnabled = (): boolean => {
  return aiEnabled;
};

/* ================= SETTERS ================= */

/** ✅ Explicitly enable / disable AI */
export const setAIEnabled = (value: boolean): void => {
  aiEnabled = value;
  localStorage.setItem(STORAGE_KEY, String(value));
};

/** 🔁 Toggle AI state */
export const toggleAI = (): boolean => {
  aiEnabled = !aiEnabled;
  localStorage.setItem(STORAGE_KEY, String(aiEnabled));
  return aiEnabled;
};

/* ================= INFO (UI / TOOLTIP) ================= */

/** ℹ️ Human readable AI status */
export const getAIStatusLabel = (): string => {
  return aiEnabled ? "AI Automation Enabled" : "AI Automation Disabled";
};
