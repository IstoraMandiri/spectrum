import util from 'ethereumjs-util';

import web3Utils from 'web3/lib/utils/utils';

// explicitly export all the web3-utils
export const padLeft = web3Utils.padLeft;
export const padRight = web3Utils.padRight;
export const toHex = web3Utils.toHex;
export const toDecimal = web3Utils.toDecimal;
export const fromDecimal = web3Utils.fromDecimal;
export const toUtf8 = web3Utils.toUtf8;
export const toAscii = web3Utils.toAscii;
export const fromUtf8 = web3Utils.fromUtf8;
export const fromAscii = web3Utils.fromAscii;
export const transformToFullName = web3Utils.transformToFullName;
export const extractDisplayName = web3Utils.extractDisplayName;
export const extractTypeName = web3Utils.extractTypeName;
export const toWei = web3Utils.toWei;
export const fromWei = web3Utils.fromWei;
export const toBigNumber = web3Utils.toBigNumber;
export const toTwosComplement = web3Utils.toTwosComplement;
export const toAddress = web3Utils.toAddress;
export const isBigNumber = web3Utils.isBigNumber;
export const isStrictAddress = web3Utils.isStrictAddress;
export const isAddress = web3Utils.isAddress;
export const isChecksumAddress = web3Utils.isChecksumAddress;
export const toChecksumAddress = web3Utils.toChecksumAddress;
export const isFunction = web3Utils.isFunction;
export const isString = web3Utils.isString;
export const isObject = web3Utils.isObject;
export const isBoolean = web3Utils.isBoolean;
export const isArray = web3Utils.isArray;
export const isJs = web3Utils.isJs;

export function capitalize(str) {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

export function parseDate(num, seconds = false, method = 'toLocaleDateString') {
  if (!num) { return '-'; }
  return new Date(num * (seconds ? 1000 : 1))[method]();
}

export function parseBigNumber(_bigNumber, shift = 0, format) {
  const bigNumber = toBigNumber(_bigNumber);
  if (!bigNumber || !bigNumber.equals || bigNumber.equals(0)) { return 0; }
  const num = bigNumber.shift(-shift);
  if (format === false) {
    return num.toNumber();
  }
  const str = num.toFormat();
  const decimals = str.split('.')[1];
  const decimalCount = decimals && decimals.length;
  const maxDecimals = 5;
  if (decimalCount > maxDecimals) {
    return `${num.toFormat(maxDecimals)}...`;
  }
  return num.toFormat();
}

export function addToHex(hex, value) {
  return toHex(toBigNumber(hex).plus(value));
}

export function parseBigNumberDate(bigNumber) {
  return parseDate(parseBigNumber(bigNumber, 0, false), true);
}

export function isPrefixed(str = '') {
  return str.slice(0, 2) === '0x';
}

export function dePrefix(str = '') {
  if (isPrefixed(str)) {
    return str.slice(2);
  }
  return str;
}

export function addHexPrefix(str) {
  return util.addHexPrefix(str);
}

export function removeHexPrefix(str) {
  return addHexPrefix(str).slice(2);
}

export function lowercaseUnprefixedHex(str) {
  return removeHexPrefix(str).toLowerCase();
}

export function getTimestamp(timestamp) {
  const ts = timestamp ? new Date(timestamp) : new Date();
  return ts.toJSON().replace(/:/g, '-');
}

export function getV3FileName(address) {
  return `UTC--${getTimestamp()}--${lowercaseUnprefixedHex(address)}`;
}

export function isNull(str) {
  if (!str) { return true; }
  if (typeof str !== 'string') { throw new Error('Only accepts string types'); }
  const hex = lowercaseUnprefixedHex(str);
  return !!hex.match(/^[0]*$/);
}

export function isNotNull(str) {
  return !isNull(str);
}
// converts 0x00...00 to null
export function nullify(str) {
  return isNull(str) ? null : str;
}

export function parseHex(string) {
  try {
    return toUtf8(string);
  } catch (e) {
    return toAscii(string);
  }
}

export function toRenderable(str) {
  if (isBigNumber(str)) {
    return parseBigNumber(str);
  }
  const string = `${str}`;
  if (isPrefixed(string)) {
    return parseHex(string);
  }
  return string;
}

export function shortAddress(address, num = 4, showEnd = true) {
  const sanitized = dePrefix(address);
  return `${sanitized.slice(0, num)}...${showEnd ? sanitized.slice(-num) : ''}`;
}

export function camelToCapitalized(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}
