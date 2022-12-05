const BASE_URL = 'https://korea-webtoon-api.herokuapp.com'

const requset = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`서버와의 연결이 불안정합니다!`)
    }
    const data = await response.json()
    return data.webtoons
  } catch (error) {
    console.error(`에러가 발생했습니다! ${error.message}`)
  }
}

export const api = {
  getWebToonList: async (keyword: string): Promise<any> =>
    requset(`${BASE_URL}/search?keyword=${keyword}`)
}
