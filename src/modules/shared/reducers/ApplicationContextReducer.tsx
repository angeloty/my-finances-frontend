import { Action } from "redux";

interface IAppState {
  app: any;
}

export enum APP_ACTION {
  APP_SYNC,
  APP_OFFLINE
}

export interface IAppSyncAction extends Action {
  type: APP_ACTION.APP_SYNC;
  app: any;
}

export interface IAppOfflineAction extends Action {
  type: APP_ACTION.APP_OFFLINE;
  app: any;
}

export type AppAction = IAppSyncAction | IAppOfflineAction;

export const ApplicationContextReducer = (
  state: IAppState | undefined,
  action: AppAction
) => {
  switch (action.type) {
    case APP_ACTION.APP_SYNC:
      return action.app;
    case APP_ACTION.APP_OFFLINE:
      return null;
    default:
      return null;
  }
};
