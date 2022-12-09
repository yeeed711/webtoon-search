import { Component } from '@components'
import type { IItem } from '../SearchResult'
import styles from './SearchItemInfo.module.scss'

export default class SearchItemInfo extends Component<ISearchItemInfoState> {
  template(): string {
    const { isModalVisiable, selectedItem } = this.initalState
    const { item_info, modal, info_text_cont } = styles
    return `
    <div>
    ${
      isModalVisiable
        ? `
      <div class='${item_info} item_info' >
        <div
          class='${modal}'
          style='background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${selectedItem.img});'>
          <button class="material-icons">cancel</button>
          <div class='${info_text_cont}'>
            <p>${selectedItem.title} <a href='${selectedItem.url}' target='_blank'>웹사이트</a></p>
            <p>${selectedItem.author}</p>
            <p>${selectedItem.service} 연재</p>
          </div>
        </div>
      </div>
      `
        : ''
    }
    </div>
    `
  }
}

interface ISearchItemInfoState {
  selectedItem: IItem
  isModalVisiable: boolean
}
//<img src='${selectedItem.img}' />
