import Router, { useRouter } from 'next/router';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, isFunction } from 'lodash';

import { ParsedUrlQueryInput } from 'querystring';

/**
 * redirect
 * @param path string
 * @returns void
 */
export const redirect = (path: string, query?: ParsedUrlQueryInput) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (isEmpty(query)) {
    Router.push(path);
  } else {
    Router.push({
      pathname: path,
      query: query
    });
  }
};

/**
 * parseRouteQueryToObject
 * @param query ParsedUrlQueryInput
 * @todo convert query which contain "." into object with subkey and value
 * @returns object
 */

export const parseRouteQueryToObject = (query: ParsedUrlQueryInput) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const result: Object = {};
  const listKeys = Object.keys(query);
  listKeys.forEach(key => {
    if (key.includes('.')) {
      const [mainKey, subKey] = key.split('.');
      if (subKey) {
        if (!result[mainKey]) {
          result[mainKey] = {};
        }
        result[mainKey][subKey] = query[key];
      }
    } else {
      result[key] = query[key];
    }
  });
  return result;
};
/**
 * getCurrentUrl
 * @returns string
 */
export const GetCurrentUrl = () => {
  const router = useRouter();
  return router.asPath;
};

/**
 * parserJson
 * @param data any
 * @returns json
 */
export const parserJson = (data: any) => {
  if (!data) return;

  return JSON.parse(JSON.stringify(data));
};

/**
 * sleep
 * @param ms number
 * @returns void
 */
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * formatWalletAddress
 * @param address string
 * @returns string
 */
export const formatWalletAddress = (address: string) => {
  return address ? address.slice(0, 8) + '...' + address.slice(-8) : '';
};
/**
 * handleOutputLimitMessage
 * @param type min or max
 * @param size number
 * @returns string
 */
export const handleOutputLimitMessage = (
  size: number,
  type: 'min' | 'max' = 'max'
) => {
  return type === 'max'
    ? `Must be ${size} characters or less`
    : // : `Must be ${size} characters or more`;
      //longvv
      `Phải chứa ít nhất ${size} ký tự`;
};

/**
 * stackCallback
 * @param cb
 * @param time
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const stackCallback = (cb: Function, time = 1000) => {
  if (!isFunction(cb)) return;
  setTimeout(() => cb(), time);
};

/**
 * findOcc
 * @param arr Array
 * @param key string
 * @returns void
 */
export const findOcc = (arr, key) => {
  const arr2 = [];
  arr.forEach(x => {
    if (arr2.some(val => val[key] == x[key])) {
      arr2.forEach(k => k[key] === x[key] && k['occurrence']++);
    } else {
      const a = {};
      a[key] = x[key];
      a['occurrence'] = 1;
      (arr2 as any).push(a);
    }
  });
  return arr2;
};

/**
 * convertToSlug
 * @param text
 * @returns string
 */
export const convertToSlug = (text: any) => {
  if (!text) return;

  // Chuyển hết sang chữ thường
  text = text.toLowerCase();

  // xóa dấu
  text = text
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  text = text.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  text = text.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  text = text.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  text = text.replace(/-+/g, '-');

  // xóa phần dư - ở đầu & cuối
  text = text.replace(/^-+|-+$/g, '');

  // return
  return text;
};

export const getFileName = (url: string) => {
  const filename = url.substring(url.lastIndexOf('/') + 1);
  return filename;
};
//
export const parseLocation = (addressData: any) => {
  const { city, shortcode, zipcode, address } = addressData;

  if (city || shortcode || zipcode) {
    return address;
  }

  return `${city}, ${shortcode} ${zipcode}`;
};

export const arrayToObjectFormKey = (key: string, arr: any[]) => {
  const result = {};
  arr.forEach((item, index) => {
    result[`${key}[${index}]`] = item;
  });
  return result;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const toFormData = (object: Object) => {
  const formData = new FormData();

  for (const key in object) {
    formData.append(key, object[key]);
  }

  return formData;
};

export const serialParams = obj => {
  let str = '';
  for (const key in obj) {
    if (str != '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
  }

  return str;
};
