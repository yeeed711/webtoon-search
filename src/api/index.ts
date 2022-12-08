import { BASE_URL, REQUSET_MESSAGE } from '@constants'

const requset = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(REQUSET_MESSAGE.HTTP_ERROR)
    }
    const data = await response.json()
    return data.webtoons
  } catch (error) {
    console.error(`${REQUSET_MESSAGE.SERVER_ERROR} ${error.message}`)
  }
}

export const api = {
  getWebToonList: async (keyword: string): Promise<any> =>
    requset(`${BASE_URL}/search?keyword=${keyword}`)
}
