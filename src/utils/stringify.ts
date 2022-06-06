import qs from "qs";

export const stringify = (value: any) =>
  qs.stringify(value, { encode: false, addQueryPrefix: true });

export const parse = qs.parse;
