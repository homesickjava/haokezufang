import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryResource(params) {
  console.log("******************************** service/houseResource ", params);
  return request(`/haoke/house/resources/list?${stringify(params)}`);
}
