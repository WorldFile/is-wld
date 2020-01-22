/* global TextDecoder */

const VALID_EXTENSIONS = [".gfw", ".jgw", ".j2w", ".pgw", ".tfw", ".wld"];
const VALID_ENCODINGS = ["utf-8", "utf-16le", "macintosh"];
const MAX_BYTE_LENGTH = 1000;
const MAX_TEXT_LENGTH = 1000;

function checkFilePathOrURL(input) {
  const lower = input.toLowerCase();
  for (let i = 0; i < VALID_EXTENSIONS.length; i++) {
    const ext = VALID_EXTENSIONS[i];
    if (lower.endsWith(ext)) {
      return true;
    }
  }
  return false;
}

function checkText(text) {

  if (text.length > MAX_TEXT_LENGTH) {
    return false;
  }

  // check if text matches pattern found in world files
  const sep = "\r?\n";
  const num = "-?\\d+(.\\d+)?";
  const line = (num + sep);
  const file = "^" + line.repeat(6) + "$";
  const re = new RegExp(file);

  if (re.exec(text)) {
    return true;
  } else {
    return false;
  }
}

module.exports = function isWorldFile(input, debug) {

  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(input)) {
    if (input.byteLength > MAX_BYTE_LENGTH) {
      return false;
    } else if (input.toString) {
      input = input.toString();
    } else {
      return false;
    }
  }

  if (typeof ArrayBuffer !== 'undefined' && input instanceof ArrayBuffer) {
    if (input.byteLength > MAX_BYTE_LENGTH) return false;
    if (typeof TextDecoder !== 'undefined' && typeof DataView !== 'undefined') {
      const dataView = new DataView(input);
      for (let i = 0; i < VALID_ENCODINGS.length; i++) {
        const encoding = VALID_ENCODINGS[i];
        const decoder = new TextDecoder(encoding);
        const decoded = decoder.decode(dataView);
        const valid = checkFilePathOrURL(decoded) || checkText(decoded);
        if (valid) {
          return true;
        }
      }
      return false;
    } else {
      const decoded = String.fromCharCode.apply(null, new Uint8Array(input));
      return checkFilePathOrURL(decoded) || checkText(decoded);
    }
  }

  if (input instanceof Uint8Array) {
    if (input.length > MAX_BYTE_LENGTH) return false;
    const decoded = String.fromCharCode.apply(null, input);
    return checkFilePathOrURL(decoded) || checkText(decoded);
  }

  if (typeof DataView !== 'undefined' && input instanceof DataView) {
    const arrayBuffer = input.buffer;
    if (arrayBuffer.byteLength > MAX_BYTE_LENGTH) return false;
    const decoded = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    return checkFilePathOrURL(decoded) || checkText(decoded);
  }

  if (typeof input === "string") {

    // check if url or filepath to a world file
    if (checkFilePathOrURL(input)) {
      return true;
    }

    return checkText(input);
  }
}