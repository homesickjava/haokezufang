import request from '@/utils/request';


export async function saveHotelSettings(params) {
  console.log("saveHotelSettings params -------> service" , params);
  return request('/hotel/saveSetting', {
    method: 'POST',
    body: params
  });
}
