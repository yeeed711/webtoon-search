import { Component } from '@components'
import styles from './SearchResult.module.scss'

export default class SearchResult extends Component<ISearchResultState> {
  handleClick: (selectedItem: any) => void
  template(): string {
    const {
      // keyword,
      selectedIndex,
      isVisiable,
      listData: { webtoons }
    } = this.initalState
    const { result_list, selected } = styles
    return `
      <ul class='${isVisiable ? `${result_list}` : 'hide'}'>${webtoons
      ?.map(
        (item, index) =>
          `
          <a href='${item.url}'>
            <li class='${
              index === selectedIndex ? `${selected}` : ''
            }' data-index='${index}'>
              <span>${item.title} ,${item.author}</span>
            </li>
          </a>
          `
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
        onClick(this.initalState.listData.webtoons[parseInt(index)])
      }
    }
  }

  setEvent(): void {
    this.node.addEventListener('click', this.handleClick)
  }
}

interface ISearchResultState {
  isVisiable: boolean
  keyword: string
  selectedIndex: number
  listData: {
    webtoons: IItem[]
  }
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
