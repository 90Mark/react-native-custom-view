/**
 * Created by Mark on 2020/3/17.
 */

import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import RootSiblings from 'react-native-root-siblings'

import { Colors, Images } from '../res'

export default {
  show,
  hide
}

function show (text) {
  this.view && this.view.destroy()
  this.view = new RootSiblings(
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: Colors.clearColor
    }}>
      <TouchableWithoutFeedback>
        <View
          style={{
            width: '100%',
            height: '100%'
          }}>
          {_renderView(text)}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )

  return this.view
}

function hide () {
  this.view && this.view.destroy()
}

function _renderView (text) {
  return (
    <View style={styles.container}>
      <View style={styles.blackView}>
        <ActivityIndicator size='large' />
        {text ? (
          <Text style={styles.TextStyle}>
            {text}
          </Text>) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.clearColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blackView: {
    backgroundColor: Colors.blackAlpha_60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 180,
    minHeight: 75,
    padding: 12
  },
  TextStyle: {
    marginTop: 10,
    color: Colors.white
  },
  img: {
    width: 35,
    height: 35
  }
})


