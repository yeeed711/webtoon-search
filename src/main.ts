import { selectEl } from '@utils'
import App from 'App'
import './scss/index.scss'

new App({ node: selectEl(document, '#root'), initalState: null })
