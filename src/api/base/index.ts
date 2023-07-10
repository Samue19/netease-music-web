import { getRequest } from '../request'
import type { AxiosResponse } from 'axios'
import type { IBanner } from '@/types'

enum REQUEST_URL {
  Banner = '/banner',
}

/**
 * @description: 获取轮播图数据
 */
export const getBanner = () => {
  return getRequest(REQUEST_URL.Banner).then((res: AxiosResponse): IBanner[] => {
    const { banners } = res.data
  
    return banners.map((banner: IBanner) => {
      return {
        url: banner.url,
        imageUrl: banner.imageUrl,
        typeTitle: banner.typeTitle,
      }
    })
  })
}
