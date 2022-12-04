const debounce: IDebounce = (callback, delay) => {
  let timeout: number

  return event => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = window.setTimeout(callback, delay, event)
  }
}

export { debounce }

type IDebounce = (
  callback: (event: any) => void,
  delay: number
) => (event: any) => void
