import React from 'react'
import styled from 'styled-components'

const Knob = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${props => props.on ? '0 6px 0 -1px rgba(0, 0, 0, 0.07)' : ''};
  transform: ${props => props.on ? 'translateX(40px)' : ''};
  transition: all 250ms cubic-bezier(0.46, 0.07, 0.32, 1.47);

  &:active {
    padding-right: 10px;
    height: 90%;
    margin-left: ${props => props.on ? '-10px' : ''};
  }
`

const Track = styled.div`
  margin: auto;
  position: relative;
  width: 80px;
  height: 40px;
  box-sizing: content-box;
  background-color: ${props => props.on ? '#b0ecce' : 'rgba(0, 0, 0, 0.06)'};
  border-radius: 999px;
  padding: 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: background 250ms ease;
`

const Switch = ({ toggle, ...props }) => (
  <Track on={toggle.on} onClick={toggle.toggle} {...props}>
    <Knob on={toggle.on} />
  </Track>
)

export default Switch