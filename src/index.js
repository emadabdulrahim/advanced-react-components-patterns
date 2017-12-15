import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import Hello from './Hello'
import Switch from './switch'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const withToggle = Component => {
  function Wrapper(props, context) {
    const toggleContext = context[TOGGLE_CONTEXT]

    return <Component {...toggleContext} {...props} />
  }

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }

  return Wrapper
}

const TOGGLE_CONTEXT = '__toggle__'


const ToggleOn = ({ children }, context) =>
  context[TOGGLE_CONTEXT].on ? children : ''

ToggleOn.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}

const ToggleOff = ({ children }, context) =>
  context[TOGGLE_CONTEXT].on ? '' : children

ToggleOff.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}

const ToggleButton = withToggle(Switch)

const CustomToggle = withToggle(({ on, toggle }, ...props) => (
  <button onClick={toggle}>{on ? 'on' : 'off'}</button>
))

class Toggle extends React.Component {
  static On = ToggleOn
  static Off = ToggleOff
  static Button = ToggleButton
  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      on: false,
    }

    console.log('constructor')
  }

  handleClick = () => {
    const { on } = this.state
    this.setState({
      on: !on,
    })
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  getChildContext() {
    console.log('getChildContext got called')
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.handleClick,
      },
    }
  }

  render() {
    const { on } = this.state

    return this.props.children
  }
}

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <Toggle>
      <Toggle.On>The Button is on</Toggle.On>
      <div>
        <Toggle.Off>The Button is of</Toggle.Off>
      </div>
      <Toggle.Button />
      <CustomToggle />
    </Toggle>
  </div>
)

render(<App />, document.getElementById('root'))
