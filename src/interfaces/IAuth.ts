import { User } from "firebase/auth";

export interface IAuthResponse {
  error: boolean;
  message: string;
  user?: User | null;
}

export interface IUpdateProfile {
  displayName?: string;
  photoURL?: string;
}