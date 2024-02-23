export const isActionPending = (action: any) => action?.type?.endsWith("/pending") || false;
export const isActionRejected = (action: any) => action?.type?.endsWith("/rejected") || false;
export const getActionName = (action: any) => action?.type?.split("/")[1] || "";
