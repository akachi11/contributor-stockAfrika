export const setUserSession = (user: unknown, token: string) => {
  if (user && token) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("SA-token", token);
  }
};

export const getuser = () => {
  const user = localStorage.getItem("user");
  if (!user || user === "undefined") {
    return null;
  }
  try {
    return JSON.parse(user);
  } catch (e) {
    console.error("Error parsing user data:", e);
    return null; // In case of invalid JSON
  }
};

export const getToken = () => {
  return localStorage.getItem("SA-token");
};

export const resetUserSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("SA-token");
  window.location.reload();
};
