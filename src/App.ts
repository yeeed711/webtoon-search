import { api } from '@api'
import {
  Component,
  SearchInput,
  SearchResult,
  SearchItemInfo
} from '@components'
import type { IComponentProps } from '@components/core/Component'
import type { IItem } from '@components/search/SearchResult'
import { debounce, selectEl, getItem } from '@utils'

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

  setup(): void {
    this.setState({ ...this.initalState, ...getItem('searchState') })
    this.handleChange = debounce(async (keyword): Promise<any> => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const listData = await api.getWebToonList(keyword)
      if (!keyword || !listData.length) {
        this.setState({
          isResultListVisiable: false,
          selectedIndex: 0,
          keyword: '',
          listData: [],
          selectedItem: {}
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
      const { listData, selectedIndex } = this.initalState
      const actionKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape']

      if (actionKeys.includes(e.key) && !listData.length) {
        return
      }

      const lastIndex = listData.length - 1
      let nextIndex = selectedIndex

      switch (e.key) {
        case 'ArrowUp':
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1
          this.setState({
            selectedIndex: nextIndex
          })
          break
        case 'ArrowDown':
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1
          this.setState({
            selectedIndex: nextIndex
          })
          break
        case 'Enter':
          e.preventDefault()
          this.setState({
            selectedItem: listData[selectedIndex],
            isModalVisiable: true
          })
          break
        case 'Escape':
          this.setState({
            isModalVisiable: false
          })
          break
      }
    }

    this.handleClick = (e): void => {
      if (
        e.target.closest('button') ||
        e.target.classList.contains('item_info')
      ) {
        this.setState({
          isModalVisiable: false
        })
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
        keyword: this.initalState.keyword,
        onInput: this.handleChange
      }
    })

    const searchResult = new SearchResult({
      node: selectEl(this.node, 'SearchResultList'),
      initalState: {
        keyword,
        listData,
        isResultListVisiable,
        selectedIndex,
        onClick: (selectedItem: any, index: string): void => {
          this.setState({
            selectedItem: selectedItem,
            isModalVisiable: true,
            selectedIndex: Number(index)
          })
        }
      }
    })

    const searchItemInfo = new SearchItemInfo({
      node: selectEl(this.node, 'SearchItemInfo'),
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
    this.node.addEventListener('click', this.handleClick)
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
