import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryBasic(params) {
  return request(`/hotel/basic?${stringify(params)}`);
}
