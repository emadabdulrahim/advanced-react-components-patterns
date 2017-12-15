import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import Hello from './Hello'
import Switch from './switch'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const TOGGLE_CONTEXT = '__toggle__'

const withToggle = Component => {
  function Wrapper(props, context) {
    const toggleContext = context[TOGGLE_CONTEXT]

    return <Component toggle={toggleContext} {...props} />
  }

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }

  return Wrapper
}

const ToggleOn = withToggle(({ children, toggle }) =>
  toggle.on ? children : ''
)

const ToggleOff = withToggle(({ children, toggle }) =>
  toggle.on ? '' : children
)

const ToggleButton = withToggle(Switch)

const CustomToggle = withToggle(({ toggle }, ...props) => (
  <button onClick={toggle.toggle}>{toggle.on ? 'on' : 'off'}</button>
))

const MyEventComponent = withToggle(({ event, on, toggle }) => {
  const props = {[event]: on}

  return (
    toggle.on && <button {...props}>The {event} event</button>
  )
})

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
  }

  handleClick = () => {
    const { on } = this.state
    this.setState({
      on: !on,
    })
  }

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.handleClick,
      },
    }
  }

  render() {
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
      <MyEventComponent event='onClick' on={e => alert(e.type)} />
    </Toggle>
  </div>
)

render(<App />, document.getElementById('root'))
