import { generateKeyPairSync } from "crypto";
import { JWK, JWS } from "node-jose";

let _keyStore: JWK.KeyStore;
let _signingKey: Promise<JWK.Key>;
export const initializeKeyStore = async () => {
  if (_keyStore) {
    return;
  }
  _keyStore = JWK.createKeyStore();
  _signingKey = _keyStore.generate("RSA", 2048, {
    alg: "RS256",
    use: "sig",
  });
};

interface SignedJWS {
  payload: string;
  signatures: Array<{
    protected: string;
    signature: string;
  }>;
}

export const signWithJWK = async (payload: string): Promise<string> => {
  if (!_signingKey) {
    await initializeKeyStore();
  }
  const jws = (await JWS.createSign(await _signingKey)
    .update(payload)
    .final()) as unknown as SignedJWS;
  const payloadlessHeader = `${jws.signatures[0].protected}..${jws.signatures[0].signature}`;
  return payloadlessHeader;
};

export const getPublicJWKS = () => {
  if (!_keyStore) {
    throw new Error(
      "Key Store must be initialized before retrieving public keys"
    );
  }
  return _keyStore.toJSON();
};
