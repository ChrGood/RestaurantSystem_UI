import request from '@/utils/request'

// 获取轮播图数据
export function GetSwiperImage() {
  return request({
    url: '/api/image/GetSwiperImage',
    method: 'post'
  })
}
export function RemoveSwiperImage(data) {
  return request({
    url: '/api/image/RemoveSwiperImage',
    method: 'post',
    data
  })
}
