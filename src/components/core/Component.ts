import type { IComponentProps } from '@models'
import { ConvertTemplateToComponent, setItem } from '@utils'

export default abstract class Component<StateType> {
  node: Element
  initalState: StateType
  renderStateKey: Set<string>
  subscribers: Set<any>
  isNeedRender: boolean
  isNeedUpdate: boolean
  constructor({
    node,
    initalState,
    renderStateKey = []
  }: IComponentProps<StateType>) {
    this.node = node
    this.initalState = initalState
    this.renderStateKey = new Set(renderStateKey)
    this.subscribers = new Set([])
    this.isNeedRender = false
    this.isNeedUpdate = false

    this.setup()
    this.render()
  }

  setup(): void {
    return
  }

  render(): void {
    window.requestAnimationFrame(() => {
      ConvertTemplateToComponent.call(this)
      this.setEvent()
      this.renderChildComponent()
    })
  }

  updater(): void {
    if (!this.isNeedRender) {
      this.renderChildComponent()
      return
    }

    this.clearEvent()
    this.render()
  }

  renderChildComponent(): void {
    return
  }

  setEvent(): void {
    return
  }

  clearEvent(): void {
    return
  }

  template(): string {
    return ''
  }

  subscribe(...subscribers: any[]): void {
    subscribers.forEach(subscriber => {
      this.subscribers.add(subscriber)
    })
  }

  notify(newState: any): void {
    const subscribers = Array.from(this.subscribers)

    subscribers.forEach(subscriber => {
      subscriber.setState(newState)
      subscriber.updater()
      subscriber.isNeedRender = false
    })
  }

  setState(newState: any): void {
    this.checkUpdataState(newState)

    if (!this.isNeedUpdate) {
      return
    }

    this.reflectNeedRender(newState)
    this.reflectState(newState)
    this.notify(newState)

    setItem('searchState', this.initalState)
  }

  checkUpdataState(newState: any): void {
    const currentState = JSON.stringify({ ...this.initalState })
    const nextState = JSON.stringify({ ...this.initalState, ...newState })

    this.isNeedUpdate = currentState !== nextState
  }

  reflectNeedRender(newState: any): void {
    const updatedStateKeys = Object.keys(newState)
    const renderStateKey = Array.from(this.renderStateKey)

    const state = updatedStateKeys.filter(key => renderStateKey.includes(key))
    this.isNeedRender = state.length === 0
  }

  reflectState(newState: any): void {
    const updatedStateKeys = Object.keys(newState)

    updatedStateKeys.forEach(key => {
      const stateKey = key as keyof StateType
      this.initalState[stateKey] = newState[
        stateKey
      ] as StateType[keyof StateType]
    })
  }
}
