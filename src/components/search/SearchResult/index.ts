import { Component } from '@components'
import styles from './SearchResult.module.scss'

export default class SearchResult extends Component<ISearchResultState> {
  handleClick: (selectedItem: any) => void
  template(): string {
    const { selectedIndex, isResultListVisiable, listData } = this.initalState
    const { result_list, selected } = styles

    return `
      <ul class='${
        isResultListVisiable ? `${result_list}` : 'hide'
      }'>${Array.from(listData)
      ?.map(
        (item, index) =>
          `<li class='${
            index === selectedIndex ? `${selected}` : ''
          }' data-index='${index}'>
              <span>${item.title}</span>
              <span>[ ${item.author} ]</span>
            </li>`
      )
      .join('')}
      </ul>
    `
  }

  setup(): void {
    const { onClick } = this.initalState
    this.handleClick = (e): void => {
      const target = e.target as HTMLElement
      const $li = target.closest('li')
      if ($li) {
        const { index } = $li.dataset
        onClick(this.initalState.listData[parseInt(index)])
      }
    }
  }

  setEvent(): void {
    this.node.addEventListener('click', this.handleClick)
  }

  clearEvent(): void {
    this.node.removeEventListener('click', this.handleClick)
  }
}

interface ISearchResultState {
  isResultListVisiable: boolean
  selectedIndex: number
  listData: IItem[]

  onClick(selectedItem: any): void
}

export interface IItem {
  webtoonId: number
  title: string
  author: string
  img: string
  service: string
  updateDays: string[]
  url: string
}
