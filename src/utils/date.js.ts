export const defaultDueDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
}