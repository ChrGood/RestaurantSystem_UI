import request from '@/utils/request'

export function inputPackage(data) {
  return request({
    url: 'api/package/inputPackage',
    method: 'post',
    data
  })
}
export function getPackage(data) {
  return request({
    url: 'api/package/getPackage',
    method: 'post',
    data
  })
}
export function updatePackage(data) {
  return request({
    url: 'api/package/updatePackage',
    method: 'post',
    data
  })
}
export function deletePackage(id) {
  return request({
    url: 'api/package/removePackage',
    method: 'post',
    data: { ID: id }
  })
}
