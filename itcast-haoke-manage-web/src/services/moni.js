import request from '@/utils/request';
import { stringify } from 'qs';



export async function queryResourceGet(params) {
  console.log("********************************queryResourceGet", params);
  return request(`/hotel/dianping?${stringify(params)}`);
}

export async function ocrAndSearch(params) {
  console.log("********************************ocrAndSearch", params);
  return request(`/ocr/ocrword?${stringify(params)}`);
}

export async function payForAnswer(params) {
  // console.log("********************************ocrAndSearch", params);
  return request(`/ocr/payforanswer?${stringify(params)}`);
}
