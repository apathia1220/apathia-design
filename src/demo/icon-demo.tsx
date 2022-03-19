import React from 'react'
import Icon from '../components/Icon/icon'


function IconDemo() {
  return (
    <>
      <Icon theme="primary" icon="coffee" size="6x" />
      <Icon theme="danger" icon="arrow-down" size="2x" />
      <Icon theme="success" icon="angle-down" size="lg" />
      <Icon theme="success" pulse icon="spinner" size="3x" />
    </>
  )
}

export default IconDemo
