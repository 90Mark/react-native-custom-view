/**
 * Created by Mark on 2020/3/17.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BackHandler, StyleSheet, View } from 'react-native'

import RootSiblings from 'react-native-root-siblings'

import { Colors } from '../res'

export default class Modal extends Component {
  static propTypes = {
    transparent: PropTypes.bool,
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onShow: PropTypes.func,
    onDismiss: PropTypes.func
  }
  static defaultProps = {
    transparent: false,
    visible: false
  }

  constructor (props) {
    super(props)
    this._modal = null
  }

  /**
   * 显示Modal
   * @param component 组件
   * @param options 参数
   * @note onRequestClose 拦截Android返回键
   * @note transparent 透明
   * @note onShow 显示回调
   * @note onDismiss 隐藏回调
   * @returns {{_id, _offStreamElement(*=): *, update(*=, *=): void, destroy(*=): void}}
   */
  static show = (component, options = {}) => {
    const { onRequestClose, transparent = false, onShow, onDismiss } = options
    const modal = new RootSiblings(render(component, transparent), onShow)
    modal.listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (onRequestClose) {
        onRequestClose()
      } else {
        Modal.hide(modal, onDismiss)
      }
      return true
    })
    return modal
  }

  static update = (modal, component, options = {}) => {
    const { transparent = false, onShow } = options
    if (modal && modal instanceof RootSiblings) {
      modal.update(render(component, transparent), onShow)
    }
  }

  static hide = (modal, callback) => {
    if (modal && modal instanceof RootSiblings) {
      modal.listener && modal.listener.remove()
      modal.destroy(callback)
    }
  }

  componentDidMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (props) {
    if (props.visible) {
      this.show(props.children)
    } else {
      this.hide()
    }
  }

  componentWillUnmount () {
    this.hide()
  }

  show = (component) => {
    if (this._modal) {
      this.update(component)
    } else {
      this._modal = Modal.show(component, this.props)
    }
  }

  update = (component) => {
    Modal.update(this._modal, component, this.props)
  }

  hide = () => {
    Modal.hide(this._modal, this.props.onDismiss)
  }

  render () {
    return null
  }
}

const render = (component, transparent) => {
  return (
    <View style={[styles.container, !transparent && { backgroundColor: Colors.black_middle }]}>
      {component}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})
