import { selectEl } from '@utils/dom'
import App from 'App'
import './scss/index.scss'

new App({ node: selectEl(document, '#root'), initalState: null })
