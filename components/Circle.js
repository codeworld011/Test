import { View, Text, Image } from 'react-native'
import React from 'react'

const Circle = ({children}) => {
  return (
    <View
    style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
    }}
    >
    <View 
    style={{
        backgroundColor: "grey",
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }}
    >
  {children ? (
      children
  ): (
    <Image
    source={require("../assets/usm.png")}
    style={{width: 200, height: 200, marginVertical: 20,}}
    />
  )}
  </View>
    </View>
  )
}

export default Circle;