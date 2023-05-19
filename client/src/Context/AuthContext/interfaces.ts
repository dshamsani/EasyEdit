export interface IAuthContext {
  isAuthenticated: boolean;
  changeLocalStoreToken: (type: "delete" | "update", value?: string) => void;
}

export interface IAuthProvider {
  children: React.ReactNode;
}
