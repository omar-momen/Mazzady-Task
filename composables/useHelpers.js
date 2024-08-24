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
  };
};
