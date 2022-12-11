import { Component } from '@components'
import styles from './SearchInput.module.scss'
import type { ISearchInputState } from './type'

export default class SearchInput extends Component<ISearchInputState> {
  handleInput: (e: any) => void
  handleFocus: () => void
  template(): string {
    const { SearchInput__input } = styles
    const { keyword } = this.initalState

    const searchInputView = (): string => {
      return `
        <input class='${SearchInput__input}' type='text' placeholder='웹툰제목, 작가이름으로 검색' value='${keyword}'/>
      `
    }
    return searchInputView()
  }

  setup(): void {
    const { onInput } = this.initalState

    this.handleInput = (e): void => {
      onInput(e.target.value)
    }

    this.handleFocus = (): void => {
      const $input = this.node as HTMLInputElement
      $input.focus()
    }
  }

  setEvent(): void {
    this.node.addEventListener('input', this.handleInput)
    this.handleFocus()
  }

  clearEvent(): void {
    this.node.removeEventListener('input', this.handleInput)
  }
}
