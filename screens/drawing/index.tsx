import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationRoutes, Routes, StackNavigationProps } from '../../types/navigationRoutes'
import Reactlogo from './components/reactlogo'

type DrawingProps = StackNavigationProps<Routes, NavigationRoutes.Drawing>

const Drawing: React.FC<DrawingProps> = () => {
  return (
    <View style={styles.container}>
      <Reactlogo />
    </View>
  )
}

export default Drawing

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})