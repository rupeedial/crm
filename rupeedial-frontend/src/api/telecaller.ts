import api from "./client";

/* ================= TELECALLER APIs ================= */

export const getTelecallerLeads = async () => {
  const res = await api.get("/employee/telecaller/leads");
  return res.data;
};

export const getTelecallerQueue = async () => {
  const res = await api.get("/employee/telecaller/queue");
  return res.data;
};

export const updateCallStatus = async (payload: any) => {
  const res = await api.post("/employee/telecaller/update-status", payload);
  return res.data;
};

export const getOverdueLeads = async () => {
  const res = await api.get("/employee/leads/overdue");
  return res.data;
};

export const getTodayCallbacks = async () => {
  const res = await api.get("/employee/leads/today-callbacks");
  return res.data;
};

export const getNewLeadsToday = async () => {
  const res = await api.get("/employee/leads/new-today");
  return res.data;
};
