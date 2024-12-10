export type User = {
  id: string;
  accountId: string;
  [key: string]: any;
};

export function b64decode(input: string) {
  return atob(input.replace(/_/g, "/").replace(/-/g, "+"));
}

export function decodeUserJwt(tokenStr: string): User | null {
  try {
    const base64Url = tokenStr.split(".")[1];
    if (base64Url === undefined) return null;
    const jsonStr = b64decode(base64Url);
    return JSON.parse(jsonStr)?.user;
  } catch (e) {
    return null;
  }
}
