let lastAssignedIndex = 0;

export function assignLeadToEmployee(
  leadId: string,
  employeeIds: string[]
) {
  const employeeId = employeeIds[lastAssignedIndex];
  lastAssignedIndex = (lastAssignedIndex + 1) % employeeIds.length;

  return employeeId;
}
