export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
