import { Action } from "@reduxjs/toolkit";

function isPending(action: Action) {
  return action.type.endsWith("pending");
}

function isRejected(action: Action) {
  return action.type.endsWith("rejected");
}

function isSliceName(sliceName: string, action: Action) {
  return action.type.startsWith(sliceName);
}

export const isActionPending = (sliceName: string) => {
  return (action: Action) => isSliceName(sliceName, action) && isPending(action);
};

export const isActionRejected = (sliceName: string) => {
  return (action: Action) => isSliceName(sliceName, action) && isRejected(action);
};

export const getActionName = (action: Action) => action.type.split("/")[1];
