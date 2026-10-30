import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";

// Anything shaped like a signed JWT (header.payload.signature). Stories and
// demos use unsigned tokens from `fakeJwt`, which end in "." and don't match.
const SIGNED_JWT = /eyJ[\w-]{10,}\.eyJ[\w-]{10,}\.[\w-]{10,}/;

const SRC = join(__dirname, "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

describe("source", () => {
  it("contains no signed JWTs (they ship in dist/ to npm)", () => {
    const offenders = sourceFiles(SRC)
      .filter((file) => /\.(tsx?|jsx?|html|json|feature|md)$/.test(file))
      .filter((file) => SIGNED_JWT.test(readFileSync(file, "utf8")))
      .map((file) => relative(SRC, file));
    expect(offenders).toEqual([]);
  });
});
