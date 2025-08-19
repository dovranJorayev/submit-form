export const ROUTES = {
  HOME: "/",
  SUBMIT: "/submit",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export const isActiveRoute = (
  currentPath: string,
  targetRoute: RoutePath
): boolean => {
  return currentPath === targetRoute;
};

export const getRouteWithParams = (
  route: RoutePath,
  params?: Record<string, string>
): string => {
  if (!params) return route;

  const searchParams = new URLSearchParams(params);
  return `${route}?${searchParams.toString()}`;
};
