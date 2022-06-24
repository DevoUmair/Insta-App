import { View, Text , TextInput  ,  StyleSheet, Pressable ,  TouchableOpacity  , Alert} from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import validotar from 'email-validator'
import {auth} from '../../firebase-config'
import {signInWithEmailAndPassword} from 'firebase/auth'

const LoginForm = ({navigation}) => {

  const loginSchema = Yup.object().shape({
      email:Yup.string().email().required("An email is required"),
      password:Yup.string().required().min(6 , "Your password has to have at least 6 charcters")
  })  

  const onLogin = async (email , password) => {
      await signInWithEmailAndPassword(auth , email , password).then((user) => {
             Alert.alert("Login Success")
      }).catch((err) => {
          Alert.alert(
              '🔥My Lord..',
              err.message + `\n \n.... What would you like to do next 👁️`,
              [
                  {
                      text:'ok',
                      onPress: () => console.log("ok"),
                      style:'cancel'
                  },
                  {
                      text:'Sign Up',
                      onPress: () => navigation.push('Signupscreen')
                  }
              ]
          )
      })
  }

  return (
    <View style={styles.wrapper}>

      <Formik
         initialValues={{email:'' , password:''}}
         onSubmit={(Values) => onLogin(Values.email , Values.password)}
         validationSchema={loginSchema}
         validateOnMount={true}
      > 
         {({handleBlur , handleChange , handleSubmit , values , errors , isValid}) => (

             <>
                <View style={[styles.inputFeild , 
                     {borderColor : values.email.length < 1 || validotar.validate(values.email) ? '#ccc' : "red"}
                ]}>
                        <TextInput 
                            placeholderTextColor='#444'
                            placeholder='Phone number , username or email'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                </View>  
                <View style={[styles.inputFeild , 
                     {borderColor : values.password.length < 1 || values.password.length > 6 ? '#ccc' : "red"}
                ]}>
                        <TextInput 
                            placeholderTextColor='#444'
                            placeholder='Password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                </View>  
                <View style={{alignItems:'flex-end' , marginBottom:40}} >
                    <Text style={{color:'#6880f5'}}>Forgot Password</Text>
                </View>
                <Pressable style={styles.button(isValid)} disabled={!isValid} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
                <View style={styles.signUpCon}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.push('Signupscreen')}>
                            <Text style={{color:'#6880f5'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
             </>

                )}
      </Formik> 
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        marginTop:80
    },
    inputFeild:{
        borderRadius:4,
        padding: 12,
        backgroundColor:"#FAFAFA",
        marginBottom:10,
        borderWidth:1
    },
    button:isvalid => ({
        backgroundColor: isvalid ? '#0096f6' : '#9ACAF7',
        alignItems:'center',
        justifyContent:'center',
        minHeight:42,
        borderRadius:4,
    }),
    buttonText:{
          fontWeight:"600",
          color: "#fff",
          fontSize:20
    },
    signUpCon:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:50
    }
})

export default LoginForm