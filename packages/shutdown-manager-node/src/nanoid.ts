import { customAlphabet } from "nanoid";
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// security: nanoid uses cyrpto random bytes by default
export const nanoid = customAlphabet(alphabet, 32);
