import request from '@/utils/request';
import { stringify } from 'qs';



export async function queryResourceGet(params) {
  console.log("********************************queryResourceGet", params);
  return request(`/ocr/tklist?${stringify(params)}`);
}

export async function ocrAndSearch(params) {
  console.log("********************************ocrAndSearch", params);
  return request(`/ocr/ocrword?${stringify(params)}`);
}

export async function payForAnswer(params) {
  // console.log("********************************ocrAndSearch", params);
  return request(`/ocr/payforanswer?${stringify(params)}`);
}

export async function queryPicSearchList(params) {
  console.log("queryPicSearchList params -------> service" , params);
  return request('/ocr/ocrpic/upload', {
    method: 'POST',
    body: params
  });
}


export async function userRegister(params) {
  return request('/ocr/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrent() {
  return request('/ocr/currentUser');
}

export async function fakeAccountLogin(params) {
  return request('ocr/login', {
    method: 'POST',
    body: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
