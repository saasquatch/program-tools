interface PortalProtectedRouteProps {
  redirectTo: string;
  requireEmailVerification: boolean;
  redirectToUnverified: string;
}
export declare function usePortalProtectedRoute({ requireEmailVerification, redirectTo, redirectToUnverified, }: PortalProtectedRouteProps): boolean;
export {};
