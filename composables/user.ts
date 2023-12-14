export const useUser = () => {
  return useState("session", () => useCookie("current_session"));
};
