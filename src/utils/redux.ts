export const isActionPending = (action: any) => action.type.endsWith("/pending");
export const isActionRejected = (action: any) => action.type.endsWith("/rejected");
export const getActionName = (action: any) => action.type.split("/")[1];
