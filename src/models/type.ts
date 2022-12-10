interface IComponentProps<StateType> {
  node: Element
  initalState: StateType | null
  renderStateKey?: string[]
}

interface IItem {
  title: string
  author: string
  img: string
  service: string
  url: string
}

interface IAppState {
  keyword: string
  selectedIndex: number
  listData: IItem[]
  selectedItem: IItem
  isResultListVisiable: boolean
  isModalVisiable: boolean
  isErrorMeg: boolean
}

export type { IComponentProps, IItem, IAppState }
