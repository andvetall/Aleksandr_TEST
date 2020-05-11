export interface UserData {
  fullName?: string;
  userName?: string;
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface AuthResponseData {
    idToken: string;
    expiresIn: string;
}
