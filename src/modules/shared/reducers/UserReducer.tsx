import { Reducer, Action } from "redux";

interface IUserState {
  user: any;
}

export enum USER_ACTION {
  USER_UPDATED,
  USER_LOGIN,
  USER_LOGOUT
}

export interface IUserUpdateAction extends Action {
  type: USER_ACTION.USER_UPDATED;
  user: any;
}

export interface IUserLoginAction extends Action {
  type: USER_ACTION.USER_LOGIN;
  user: any;
}

export interface IUserLogoutAction extends Action {
  type: USER_ACTION.USER_LOGOUT;
}

export type UserAction =
  | IUserUpdateAction
  | IUserLoginAction
  | IUserLogoutAction;

export const UserReducer = (
  state: IUserState | undefined,
  action: UserAction
) => {
  switch (action.type) {
    case USER_ACTION.USER_UPDATED:
    case USER_ACTION.USER_LOGIN:
      return state ? state.user : null;
    case USER_ACTION.USER_LOGOUT:
      return state ? state.user : null;
    default:
      return null;
  }
};

export const mapUserStateToProps = (state: { user: any }) => {
  return {
    user: state.user
  };
};
