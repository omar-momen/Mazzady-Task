import { useUserStore } from "@/stores/user";

export const useHelpers = () => {
  return {
    hasPermission: (permission, mustHavAllListedPermisiions = false) => {
      if (typeof permission === "string") {
        return useUserStore().permissions.includes(permission);
      } else if (typeof permission === "object") {
        if (mustHavAllListedPermisiions) {
          return permission.every((p) =>
            useUserStore().permissions.includes(p)
          );
        } else {
          return permission.some((p) => useUserStore().permissions.includes(p));
        }
      }
    },

    debounce: (func, wait = 100) => {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },

    throttle: (func, limit = 100) => {
      let lastFunc;
      let lastRan;
      return function (...args) {
        if (!lastRan) {
          func.apply(this, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    },
  };
};
