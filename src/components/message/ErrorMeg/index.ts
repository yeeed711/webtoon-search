import { Component } from '@components'
import styles from './ErrorMeg.module.scss'

export default class ErrorMeg extends Component<IErrorMegState> {
  template(): string {
    const { isErrorMeg, keyword } = this.initalState
    const { error_meg } = styles

    const keywordError = `<span>검색어를 입력해주세요 :)</span>`
    const lengthError = `<span><strong>'두 글자'</strong> 부터 검색이 가능합니다 :)</span>`

    return `
    <div class='${error_meg}'>
    ${isErrorMeg ? (keyword.length === 0 ? keywordError : lengthError) : ''}
    </div>
    `
  }
}

interface IErrorMegState {
  isErrorMeg: boolean
  keyword: string
}
