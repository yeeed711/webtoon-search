import { Component } from '@components'
import styles from './ErrorMeg.module.scss'
import type { IErrorMegState } from './type'

export default class ErrorMeg extends Component<IErrorMegState> {
  template(): string {
    const { isErrorMeg, keyword, isResultListVisiable } = this.initalState
    const { error_meg } = styles

    const keywordError = `<span>검색어를 입력해주세요 :)</span>`
    const lengthError = `<span><strong>'두 글자'</strong> 부터 검색이 가능합니다 :)</span>`
    const noneResultError = `<span><strong>'${keyword}'</strong> 의 검색 결과가 없습니다 :(</span>`

    const ErrorType = (): string => {
      if (keyword.length === 0) {
        return keywordError
      }

      if (keyword.length < 2 && keyword.length > 0) {
        return lengthError
      }

      if (!isResultListVisiable && keyword.length >= 2) {
        return noneResultError
      }
    }

    const ErrorMessageShow = (): string => {
      return `${isErrorMeg ? ErrorType() : ''}`
    }

    const ErrorMegView = (): string => {
      return `
        <div class='${error_meg}'>
          ${ErrorMessageShow()}
        </div>
      `
    }

    return ErrorMegView()
  }
}
