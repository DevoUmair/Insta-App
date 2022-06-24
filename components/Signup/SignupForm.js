import { View, Text , TextInput  ,  StyleSheet, Pressable ,  TouchableOpacity , Alert } from 'react-native'
import React  from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import validotar from 'email-validator'
import { auth , db } from '../../firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection , addDoc } from 'firebase/firestore'

const SignupForm = ({navigation}) => {

  const signipSchema = Yup.object().shape({
      email:Yup.string().email().required("An email is required"),
      username:Yup.string().required().min(2 , 'A usename is required') ,
      password:Yup.string().required().min(6 , "Your password has to have at least 6 charcters")
  })  

  const userCollection = collection(db , 'users')

  const getRandomUser =  async () => {
        const res = await fetch('https://randomuser.me/api')
        const data = await res.json();
        return data.results[0].picture.large
  }

   getRandomUser()

  const onSignUp = async (email , password , username) => {
      const pic = await getRandomUser()
      await createUserWithEmailAndPassword(auth , email , password).then((user) => {
             
             console.log(pic)
               
                addDoc(userCollection , {
                    userid:user.user.uid,
                    email:user.user.email,
                    username:username,
                    profilepicture: pic
                })
                Alert.alert("Sign Up finished successfully 🔥")
           

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
                            text:'Login',
                            onPress: () => navigation.push('LoginScreen')
                        }
                    ]
                )

                console.log(err)
      })
       
  }

  return (
    <View style={styles.wrapper}>

      <Formik
         initialValues={{email:'' , password:'' , username:''}}
         onSubmit={(Values) => onSignUp(Values.email , Values.password , Values.username)}
         validationSchema={signipSchema}
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
                            autoComplete='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                </View>  
                <View style={[styles.inputFeild , 
                     {borderColor : values.username.length < 1 || values.username.length > 6 ? '#ccc' : "red"}
                ]}>
                        <TextInput 
                            placeholderTextColor='#444'
                            placeholder='Username'
                            autoCapitalize='none'
                            textContentType='username'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
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
                <Pressable style={styles.button(isValid)} disabled={!isValid} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                <View style={styles.signUpCon}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack('LoginScreen')}>
                            <Text style={{color:'#6880f5'}}>Log In</Text>
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
        marginTop:30
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

export default SignupForm