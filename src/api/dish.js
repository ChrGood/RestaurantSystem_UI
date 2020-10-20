import request from '@/utils/request'

export function inputDish(data) {
  return request({
    url: '/api/dish/inputdish',
    method: 'post',
    data
  })
}
export function getDishType() {
  return request({
    url: '/api/dish/dishType',
    method: 'post'
  })
}
export function getDishList(data) {
  return request({
    url: '/api/dish/getDish',
    method: 'post',
    data
  })
}
export function updateDish(data) {
  return request({
    url: '/api/dish/updateDish',
    method: 'post',
    data
  })
}
export function deleteDish(id) {
  return request({
    url: '/api/dish/removeDish',
    method: 'post',
    data: { 'ID': id }
  })
}
export function getDishChose() {
  return request({
    url: '/api/dish/getDishForChose',
    method: 'post'
  })
}
export function getDishTypeAndDish() {
  return request({
    url: '/api/dish/getDishTypeAndDish',
    method: 'post'
  })
}
export function inputDishType(data) {
  return request({
    url: '/api/dish/InputDishType',
    method: 'post',
    data
  })
}
export function RemoveDishTypeIncludeDish(id) {
  return request({
    url: '/api/dish/RemoveDishTypeIncludeDish',
    method: 'post',
    data: { id }
  })
}
export function UpdateDishType(data) {
  return request({
    url: '/api/dish/UpdateDishType',
    method: 'post',
    data
  })
}
