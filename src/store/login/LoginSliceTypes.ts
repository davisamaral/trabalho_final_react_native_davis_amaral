import IUser from "../../Interfaces/IUser";

export interface UserState {
  user: IUser | null;
}

export interface ISetUserInfo {
  user: IUser | null;
}
export interface ISetUserPayload {
  payload: ISetUserInfo | null;
}
