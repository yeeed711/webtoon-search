import { api } from '@api'
import {
  Component,
  SearchInput,
  SearchResult,
  SearchItemInfo,
  ErrorMeg
} from '@components'
import { ACTIONKEYS } from '@constants'
import type { IComponentProps, IItem, IAppState } from '@models'
import { debounce, selectEl, getItem } from '@utils'

export default class App extends Component<IAppState> {
  handleChange: (keyword: string) => void
  handleKeyChange: (e: KeyboardEvent) => void
  handleClick: (e: MouseEvent) => void
  constructor({ node }: IComponentProps<IAppState>) {
    const initalState = {
      keyword: '',
      selectedIndex: 0,
      listData: [],
      selectedItem: {},
      isResultListVisiable: false,
      isModalVisiable: false,
      isErrorMeg: true
    } as IAppState

    super({ node, initalState })
  }

  setup(): void {
    this.setState({ ...this.initalState, ...getItem('searchState') })
    this.handleChange = debounce(async (keyword): Promise<any> => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const listData = await api.getWebToonList(keyword)
      if (!keyword) {
        this.setState({
          isResultListVisiable: false,
          selectedIndex: 0,
          keyword: '',
          listData: listData.length ? listData : [],
          selectedItem: {}
        })
      } else {
        this.setState({
          isResultListVisiable: listData.length > 0,
          listData: listData,
          keyword: keyword,
          isErrorMeg: listData.length > 0 ? false : true
        })
      }
    }, 300)

    this.handleKeyChange = (e): void => {
      const { listData, selectedIndex } = this.initalState

      if (Object.values(ACTIONKEYS).includes(e.key) && !listData.length) {
        return
      }

      const lastIndex = listData.length - 1
      let nextIndex = selectedIndex

      switch (e.key) {
        case ACTIONKEYS.ARROWUP:
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1
          this.setState({
            selectedIndex: nextIndex
          })
          break
        case ACTIONKEYS.ARROWDOWN:
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1
          this.setState({
            selectedIndex: nextIndex
          })
          break
        case ACTIONKEYS.ENTER:
          e.preventDefault()
          this.setState({
            selectedItem: listData[selectedIndex],
            isModalVisiable: true
          })
          break
        case ACTIONKEYS.ESCAPE:
          this.setState({
            isModalVisiable: false
          })
          break
      }
    }

    this.handleClick = (e): void => {
      const target = e.target as HTMLElement
      if (target.closest('button') || target.classList.contains('item_info')) {
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
          <ErrorMessage></ErrorMessage>
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
      isModalVisiable,
      isErrorMeg
    } = this.initalState

    new SearchInput({
      node: selectEl(this.node, 'SearchInput'),
      initalState: {
        keyword: this.initalState.keyword,
        onInput: this.handleChange
      }
    })

    const errorMeg = new ErrorMeg({
      node: selectEl(this.node, 'ErrorMessage'),
      renderStateKey: ['selectedItem', 'selectedIndex'],
      initalState: { isErrorMeg, keyword, isResultListVisiable }
    })

    const searchResult = new SearchResult({
      node: selectEl(this.node, 'SearchResultList'),
      initalState: {
        keyword,
        listData,
        isResultListVisiable,
        selectedIndex,
        onClick: (selectedItem: IItem, index: string): void => {
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
    this.subscribe(errorMeg)
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
