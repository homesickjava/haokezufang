import { stringify } from 'qs';
import request from '@/utils/request';

export async function getWordCloud() {
  console.log("queryTags")
  return request(`/hotel/guanjianci`);
}

export async function getWordCloudPic() {
  console.log("getWordCloudPic")
  return request(`/hotel/testfile`);
}

