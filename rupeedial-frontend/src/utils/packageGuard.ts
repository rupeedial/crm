import { PackageType } from "@/context/AuthContext";

export const canBuyLeads = (pkg: PackageType) =>
  pkg === "TRY" || pkg === "PRO";

export const canSubmitCase = (pkg: PackageType) =>
  pkg === "TRY" || pkg === "PRO";

export const canWithdrawPayout = (pkg: PackageType) =>
  pkg === "PRO";

export const isReadOnly = (pkg: PackageType) =>
  pkg === "FREE";
