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
  function Wrapper({ innerRef, ...props }, context) {
    const toggleContext = context[TOGGLE_CONTEXT]

    return (
      <Component {...props} ref={innerRef} toggle={toggleContext} {...props} />
    )
  }

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }

  return Wrapper
}

const ToggleOn = withToggle(
  ({ children, toggle }) => (toggle.on ? children : ''),
)

const ToggleOff = withToggle(
  ({ children, toggle }) => (toggle.on ? '' : children),
)

const ToggleButton = withToggle(Switch)

class CustomToggle extends React.Component {
  focus = () => this.button.focus()

  render() {
    const { toggle: { toggle, on } } = this.props

    return (
      <button onClick={toggle} ref={node => (this.button = node)}>
        {on ? 'on' : 'off'}
      </button>
    )
  }
}

const MyToggleWrapper = withToggle(CustomToggle)

const MyEventComponent = withToggle(({ event, on, toggle }) => {
  const props = { [event]: on }

  return toggle.on && <button {...props}>The {event} event</button>
})

class Toggle extends React.Component {
  static On = ToggleOn
  static Off = ToggleOff
  static Button = ToggleButton
  static defaultProps = { onToggle: () => {} }
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
    this.setState(({ on }) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
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

class App extends React.Component {
  render() {
    return (
      <div style={styles}>
        <Hello name="CodeSandbox" />
        <Toggle onToggle={on => (on ? this.CustomToggle.focus() : null)}>
          <Toggle.On>The Button is on</Toggle.On>
          <div>
            <Toggle.Off>The Button is of</Toggle.Off>
          </div>
          <Toggle.Button />
          <hr />
          <MyToggleWrapper innerRef={node => (this.CustomToggle = node)} />
          <MyEventComponent event="onClick" on={e => alert(e.type)} />
        </Toggle>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
