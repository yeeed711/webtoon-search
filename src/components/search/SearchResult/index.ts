import { Component } from '@components'
import styles from './SearchResult.module.scss'
import type { ISearchResultState } from './type'

export default class SearchResult extends Component<ISearchResultState> {
  handleClick: (e: any) => void
  template(): string {
    const { selectedIndex, isResultListVisiable, listData, keyword } =
      this.initalState
    const { result_list, selected, matched } = styles

    const matchKeyword = (item: any, keyword: string): string => {
      if (!item.includes(keyword)) {
        return item
      }

      const matchText = item.match(new RegExp(keyword, 'gi'))[0]

      return item.replace(
        new RegExp(matchText, 'gi'),
        `<span class='${matched}'>${matchText}</span>`
      )
    }

    return `
      <ul class='${isResultListVisiable ? `${result_list}` : 'hide'}'>
      ${Array.from(listData)
        ?.map(
          (item, index) =>
            `<li class='${
              index === selectedIndex ? `${selected}` : ''
            }' data-index='${index}'>
              <span>${matchKeyword(item.title, keyword)}</span>
              <span>[ ${matchKeyword(item.author, keyword)} ] </span>
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
  }

  setEvent(): void {
    this.node.addEventListener('click', this.handleClick)

    const { selectedIndex } = this.initalState

    const temp = 40.5 //li size
    if ((selectedIndex > 0 && selectedIndex <= 3) || selectedIndex === 0) {
      this.node.scrollTo(0, 0)
    }

    if (selectedIndex > 3) {
      this.node.scrollTo(0, temp * (selectedIndex - 3))
    }
  }

  clearEvent(): void {
    this.node.removeEventListener('click', this.handleClick)
  }
}
