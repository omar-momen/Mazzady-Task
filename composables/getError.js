export const getError = (error) => {
  // Extract error message
  return error?.data?.message || "msg failed";
};
