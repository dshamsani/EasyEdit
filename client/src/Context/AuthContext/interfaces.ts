export interface IAuthContext {
  isAuthenticated: boolean;
  changeLocalStoreToken: (type: "delete" | "update", value?: string) => void;
  token: string | null;
}

export interface IAuthProvider {
  children: React.ReactNode;
}
