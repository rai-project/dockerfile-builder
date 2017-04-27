import React from 'react'
import {render} from 'react-dom'
import controller from './controller'
import {Container} from 'cerebral/react'

import '../node_modules/grommet-css'

import './styles.css'

import App from './components/App'

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#root'))