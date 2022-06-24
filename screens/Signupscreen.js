import { View, Text , StyleSheet , Image } from 'react-native'
import React from 'react'
import SignupForm from '../components/Signup/SignupForm'

const Signupscreen = ({navigation}) => {
  return (
    <View style={styles.continer}>
        <View style={styles.logoContiner}>
            <Image style={{width:150 , height:150}} source={require('../assets/instagram-logo-11545512111t0928udues.png')} />
        </View>
        <SignupForm navigation={navigation} />
    </View>
  )
}

const styles= StyleSheet.create({
    continer:{
               flex: 1,
               backgroundColor:"white",
               paddingTop:50,
               paddingHorizontal:12
    }, 
    logoContiner:{
             alignItems:'center',
             marginTop:30
    },
})

export default Signupscreen