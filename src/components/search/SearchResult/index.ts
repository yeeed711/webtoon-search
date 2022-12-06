import { Component } from '@components'
import { getItem, setItem } from '@utils/storage'
import styles from './SearchResult.module.scss'

export default class SearchResult extends Component<ISearchResultState> {
  handleClick: (selectedItem: any) => void
  getScrollPoisition: () => void
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
        onClick(this.initalState.listData[parseInt(index)], index)
      }
    }

    this.getScrollPoisition = (): void => {
      window.requestAnimationFrame(() => {
        setItem('scrollY', this.node.scrollTop)
      })
    }
  }

  setEvent(): void {
    this.node.addEventListener('click', this.handleClick)
    this.node.addEventListener('scroll', this.getScrollPoisition)
    this.node.scrollTo(0, getItem('scrollY'))
  }

  clearEvent(): void {
    this.node.removeEventListener('click', this.handleClick)
  }
}

interface ISearchResultState {
  isResultListVisiable: boolean
  selectedIndex: number
  listData: IItem[]

  onClick(selectedItem: any, index: string): void
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
