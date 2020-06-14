import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryZhl() {
  console.log("queryZhl");
  return request('/hotel/yuce');
}

export async function fetchSalesData() {
  return request(`/hotel/fetchSalesData`);
}

export async function clearData() {
  return request(`/hotel/clearData`);
}
