import request from '@/utils/request';

export async function addHouseResource(params) {
  console.log("params -------> " , params);
  return request('/haoke/house/resources/save', {
    method: 'POST',
    body: params
  });
}
