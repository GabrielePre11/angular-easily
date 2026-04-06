export type SignUpBody = {
  name?: string;
  email: string;
  password: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export interface UserDataResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}
