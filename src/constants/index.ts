/** api */
const BASE_URL = 'https://korea-webtoon-api.herokuapp.com'
const REQUSET_MESSAGE = {
  HTTP_ERROR: '서버와의 연결이 불안정합니다!',
  SERVER_ERROR: '에러가 발생했습니다!'
}

/** actionkeys type */
const ACTIONKEYS = {
  ARROWUP: 'ArrowUp',
  ARROWDOWN: 'ArrowDown',
  ENTER: 'Enter',
  ESCAPE: 'Escape'
}

export { BASE_URL, REQUSET_MESSAGE, ACTIONKEYS }
