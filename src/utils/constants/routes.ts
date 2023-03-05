export enum ClientRoutes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  LOGIN = "/login",
  SETTINGS = "/settings",
}

export const PROTECTED_ROUTES = [ClientRoutes.DASHBOARD, ClientRoutes.SETTINGS];
