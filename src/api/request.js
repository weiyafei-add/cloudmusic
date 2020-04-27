import { axiosInstance } from './config'

export const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}
// 获取热门歌手列表
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count * 50}`)
}
export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${
      count * 50
    }`
  )
}
// 获取排行榜
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`)
}
// 获取歌单详情
export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}
// 获取歌手歌单列表
export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`)
}
// 获取歌词文件
export const getLyricRequest = (id) => {
  return axiosInstance.get(`/lyric?id=${id}`)
}
// 获取热门关键词
export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`)
}
// 建议列表
export const getSuggeetListRequest = (query) => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`)
}

export const getResultSongsListRequest = (query) => {
  return axiosInstance.get(`/search?keywords=${query}`)
}
export const getSongDetailRequest = (id) => {
  return axiosInstance.get(`/song/detail?ids=${id}`)
}
