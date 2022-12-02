import { api } from '@api'
import { Component, SearchInput, SearchResult } from '@components'
import type { IComponentProps } from '@components/core/Component'
import type { IItem } from '@components/search/SearchResult'
import { debounce, selectEl } from '@utils'

export default class App extends Component<IAppState> {
  handleChange: (keyword: string) => void
  handleKeyChange: (e: any) => void
  constructor({ node }: IComponentProps<IAppState>) {
    const initalState = {
      keyword: '',
      selectedIndex: 0,
      listData: {}
    } as IAppState
    super({ node, initalState })
  }

  // 기본 상태값 정의, 이벤트 핸들러 정의
  setup(): void {
    this.handleChange = debounce(async (keyword): Promise<any> => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const listData = await api.getWebToonList(keyword)

      this.setState({
        listData: listData
      })
    }, 200)

    this.handleKeyChange = (e): void => {
      const actionKeys = ['ArrowUp', 'ArrowDown']
      const { listData, selectedIndex } = this.initalState
      if (!listData.webtoons) return
      const lastIndex = listData.webtoons.length - 1
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
      } else if (e.key === 'Enter') {
        console.log('enter누름', listData.webtoons[selectedIndex])
      }
    }
  }

  template(): string {
    return `
      <main id='root'>
        <SearchInput></SearchInput>
        <SearchResultList></SearchResultList>
        <TargetItem></TargetItem>
      </main>
  `
  }

  // 하위컴포넌트 부착
  renderChildComponent(): void {
    const { keyword, selectedIndex, listData } = this.initalState

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
        keyword,
        listData,
        selectedIndex
      }
    })

    this.subscribe(searchResult)
  }

  setEvent(): void {
    window.addEventListener('keyup', this.handleKeyChange)
  }

  clearEvent(): void {
    window.removeEventListener('keyup', this.handleKeyChange)
  }
}

interface IAppState {
  keyword: string
  selectedIndex: number
  listData: {
    webtoons: IItem[]
  }
}
