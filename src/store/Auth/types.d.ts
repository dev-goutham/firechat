import { User, Error } from "@firebase/auth-types";

export interface IUserContext {
  data: User | null;
  loading: boolean;
  error: Error | null;
  signinWithGoogle: () => void;
  signout: () => void;
}

class IAction {
  readonly type: string;
}

class AuthFetching implements IAction {
  readonly type = "AUTH_FETCHING";

  constructor(public payload: boolean) {}
}

class AuthSuccess implements IAction {
  readonly type = "AUTH_SUCCESS";

  constructor(public payload: User | null) {}
}

class AuthError implements IAction {
  readonly type = "AUTH_ERROR";

  constructor(public payload: Error | null) {}
}

export type AuthState = {
  user: User | null;
  error: Error | null;
  fetching: boolean;
};

export type AuthActions = AuthFetching | AuthSuccess | AuthError;

export type AuthReducer = (
  state: AuthState | undefined,
  action: AuthActions
) => AuthState;
