import { Component } from '@components'
import styles from './SearchResult.module.scss'

export default class SearchResult extends Component<ISearchResultState> {
  template(): string {
    const {
      // keyword,
      selectedIndex,
      listData: { webtoons }
    } = this.initalState
    const { selected } = styles
    console.log(selectedIndex)
    return `
      <ul>${webtoons
        ?.map(
          (item, index) =>
            `<li class='${
              index === selectedIndex ? `${selected}` : ''
            }' data-index='${index}'>웹툰이름:${item.title} , 작가이름:${
              item.author
            }</li>`
        )
        .join('')}
      <ul>
    `
  }
}

interface ISearchResultState {
  keyword: string
  selectedIndex: number
  listData: {
    webtoons: IItem[]
  }
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
