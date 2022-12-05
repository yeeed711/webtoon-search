import { api } from '@api'
import {
  Component,
  SearchInput,
  SearchResult,
  SearchItemInfo
} from '@components'
import type { IComponentProps } from '@components/core/Component'
import type { IItem } from '@components/search/SearchResult'
import { debounce, selectEl } from '@utils'

export default class App extends Component<IAppState> {
  handleChange: (keyword: string) => void
  handleKeyChange: (e: any) => void
  handleClick: (e: any) => void
  constructor({ node }: IComponentProps<IAppState>) {
    const initalState = {
      keyword: '',
      selectedIndex: 0,
      listData: [],
      selectedItem: {},
      isResultListVisiable: false,
      isModalVisiable: false
    } as IAppState
    super({ node, initalState })
  }

  // 기본 상태값 정의, 이벤트 핸들러 정의
  setup(): void {
    this.handleChange = debounce(async (keyword): Promise<any> => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const listData = await api.getWebToonList(keyword)
      if (!keyword || !listData.length) {
        this.setState({
          isResultListVisiable: false
        })
      } else {
        this.setState({
          isResultListVisiable: true,
          listData: listData,
          keyword: keyword
        })
      }
    }, 200)

    this.handleKeyChange = (e): void => {
      const actionKeys = ['ArrowUp', 'ArrowDown']
      const { listData, selectedIndex } = this.initalState
      if (!listData) return
      const lastIndex = listData.length - 1
      let nextIndex = selectedIndex

      if (actionKeys.includes(e.key)) {
        if (e.key === 'ArrowUp') {
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1
        } else {
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1
        }
        this.setState({
          ...this.initalState,
          selectedIndex: nextIndex
        })
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        console.log(this.initalState.selectedItem)
        this.setState({
          selectedItem: listData[selectedIndex],
          isModalVisiable: true
        })
      }

      if (e.key === 'Escape') {
        this.setState({
          isModalVisiable: false
        })
      }
    }

    this.handleClick = (e): void => {
      if (
        e.target.closest('button') ||
        e.target.classList.contains('item_info')
      ) {
        this.setState({ isModalVisiable: false })
      }
    }
  }

  template(): string {
    return `
      <main id='root'>
        <header class='header'>Webtoons Search</header>
        <div class='container'>
          <SearchInput></SearchInput>
          <SearchResultList></SearchResultList>
          <SearchItemInfo></SearchItemInfo>
        </div>
      </main>
  `
  }

  // 하위컴포넌트 부착
  renderChildComponent(): void {
    const {
      keyword,
      selectedIndex,
      listData,
      isResultListVisiable,
      selectedItem,
      isModalVisiable
    } = this.initalState

    new SearchInput({
      node: selectEl(this.node, 'SearchInput'),
      initalState: {
        keyword: '',
        onInput: this.handleChange
      }
    })

    const searchResult = new SearchResult({
      node: selectEl(this.node, 'SearchResultList'),
      initalState: {
        listData,
        isResultListVisiable,
        selectedIndex,
        onClick: (selectedItem: any): void => {
          this.setState({ selectedItem: selectedItem, isModalVisiable: true })
        }
      }
    })

    const searchItemInfo = new SearchItemInfo({
      node: selectEl(this.node, 'SearchItemInfo'),
      renderStateKey: ['selectedIndex'],
      initalState: {
        selectedItem,
        isModalVisiable
      }
    })

    this.subscribe(searchResult)
    this.subscribe(searchItemInfo)
  }

  setEvent(): void {
    window.addEventListener('keyup', this.handleKeyChange)
    this.node.addEventListener('click', this.handleClick, true)
  }

  clearEvent(): void {
    window.removeEventListener('keyup', this.handleKeyChange)
    this.node.removeEventListener('click', this.handleClick)
  }
}

interface IAppState {
  keyword: string
  selectedIndex: number
  listData: IItem[]
  selectedItem: IItem
  isResultListVisiable: boolean
  isModalVisiable: boolean
}
