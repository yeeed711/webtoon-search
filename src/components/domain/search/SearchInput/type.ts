export interface ISearchInputState {
  keyword: string
  onInput?(keyword: string): void
}
