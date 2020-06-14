import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryResource(params) {
  return request(`/hotel/tonghang?${stringify(params)}`);
}
