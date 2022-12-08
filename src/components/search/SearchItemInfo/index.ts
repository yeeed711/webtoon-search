import { Component } from '@components'
import type { IItem } from '../SearchResult'

export default class SearchItemInfo extends Component<ISearchItemInfoState> {
  template(): string {
    const { isModalVisiable, selectedItem } = this.initalState
    return `
    <div class='${isModalVisiable ? `item_info` : 'hide'}' >
      <div class='modal'>
        <button>X</button> 
        <a href='${selectedItem.url}' target='_blank'>
          <img src='${selectedItem.img}' />
        </a>
        <p>웹툰 제목: ${selectedItem.title}</p>
        <p>작가: ${selectedItem.author}</p>
        <p>연재 사이트: ${selectedItem.service}</p>
      </div>
    </div>
    `
  }
}

interface ISearchItemInfoState {
  selectedItem: IItem
  isModalVisiable: boolean
}
