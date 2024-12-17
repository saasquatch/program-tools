import { useUserIdentity } from "./useUserIdentity";
import { useVerificationContext } from "./useVerificationContext";

export function useQueryToken() {
  const verificationToken = useVerificationContext()?.token;
  const userJwt = useUserIdentity()?.jwt;

  return verificationToken || userJwt;
}
