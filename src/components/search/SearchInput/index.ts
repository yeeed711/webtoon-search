import Component from '@components/core/Component'

export default class SearchInput extends Component<ISearchInputState> {
  handleInput: (e: any) => void
  template(): string {
    return `
      <input class='SearchInput__input' type='text' placeholder='웹툰제목, 작가명'/>
    `
  }

  setup(): void {
    const { onInput } = this.initalState
    this.handleInput = (e): void => {
      onInput(e.target.value)
    }
  }

  setEvent(): void {
    this.node.addEventListener('input', this.handleInput)
  }

  clearEvent(): void {
    this.node.removeEventListener('input', this.handleInput)
  }
}

interface ISearchInputState {
  keyword: string
  onInput?(keyword: string): void
}