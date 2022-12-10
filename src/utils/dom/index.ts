import type { ISelectType } from './type'

const selectEl = (
  scope: Element | Document = document,
  selector: string
): Element => {
  return scope.querySelector(selector)
}

const selectAll = ({ scope, selector }: ISelectType): Element[] => {
  return Array.from(scope.querySelectorAll(selector))
}

const createEl = (tagName: string): Element => {
  return document.createElement(tagName)
}

function ConvertTemplateToComponent(this: any): void {
  const oldNode = this.node
  const componentChildren = Array.from(
    new DOMParser().parseFromString(this.template(), 'text/html').body.children
  )
  const component = new DocumentFragment()
  component.append(...componentChildren)

  oldNode.after(component)
  this.node = oldNode.nextSibling

  const oldCSS = oldNode.classList.value.trim()
  const newCSS = this.node.classList.value.trim()
  const isChangedCSS = oldCSS !== newCSS
  const cssValue = isChangedCSS ? newCSS || oldCSS : oldCSS

  if (!cssValue) {
    oldNode.remove()
    return
  }

  this.node.className = cssValue

  oldNode.remove()
}

export { createEl, selectEl, selectAll, ConvertTemplateToComponent }
