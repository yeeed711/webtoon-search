import type { IItem } from 'models'

export interface ISearchResultState {
  isResultListVisiable: boolean
  selectedIndex: number
  listData: IItem[]
  keyword: string
  onClick(selectedItem: IItem, index: string): void
}
