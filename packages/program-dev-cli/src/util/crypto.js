/**
 * Encodes the object as a base64 URL
 *
 * @param {Any} obj The object to encode
 * @return {String} The base64 encoded string
 */
export const base64URLEncode = (obj) => {
  return obj.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};