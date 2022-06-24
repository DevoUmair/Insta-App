import { View, Text  , Image , TextInput , Button , Alert} from 'react-native'
import React ,{useState} from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import  validUrl from 'valid-url'
import { auth, db } from '../../firebase-config'
import { collection, query, where , getDocs , addDoc ,Timestamp} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import react , {useEffect} from 'react'

const uploadPostSchema = Yup.object().shape({
    imageUrl:Yup.string().url().required('A URL is Required'),
    caption:Yup.string().max(2200 , 'Caption Has reached charachter')
})

const placeHolderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoEq1EKwCXU1oaqO0hDA-F6MMXLglGAcwo4lci4igrPfdyz888qnCgWgeuRQk013kIpmo&usqp=CAU"

const FormikUplaoder = ({navigation}) => {
  const [thumbnail , setThumbnail] = useState(placeHolderImage)
  const [logedUser , setLogedUser] = useState(null)

  const userCollection = collection(db , 'users')
  const postCollection = collection(db , 'posts')


  const getUsernameId = async () => {
      onAuthStateChanged(auth , (user) => {
     
      if(user){
         const q = query(userCollection , where('userid' , '==' ,  user.uid))
         getDocs(q).then((data) => {
           data.docs.map((data) => setLogedUser(data.data()) )
         })
      }
     })
     
  }


  
  useEffect(() => {
     getUsernameId()

     return () => {
       getUsernameId();
     }
  },[])

  const uploadPost = async (imageUrl , caption) => {
         try {
              await addDoc(postCollection, {
                postUserId:logedUser.userid,
                imageUrl:imageUrl,
                user:logedUser.username,
                profilePic:logedUser.profilepicture,
                likes:0,
                caption:caption,
                creaetDate:Timestamp.now().toDate(),
                LikesByUsers:[],
                comments:[],
          })
          navigation.goBack()
          Alert.alert("Post Upload Successfully")
         } catch (error) {
           Alert.alert(error.message)
         }
  }
  


  return (
    <Formik
       initialValues={{caption:'' , imageUrl:''}}
       onSubmit={(values) => uploadPost(values.imageUrl , values.caption  )  }
       validationSchema={uploadPostSchema}
       validateOnMount={true}
    >

        {({handleBlur , handleChange , handleSubmit , values , errors , isValid }) => (
         <>
              <View style={{margin:20 , justifyContent:'flex-start' , flexDirection:'row'}}>
                  <Image style={{width:100 , height:100}} source={{uri: validUrl.isUri( thumbnail ) ? thumbnail : placeHolderImage}} />

                  <View style={{marginLeft:10}}>
                      <TextInput placeholder='Write a Caption' placeholderTextColor='gray' multiline={true} onChangeText={handleChange("caption")}
                              onBlur={handleBlur('caption')} value={values.caption}
                              style={{color:"#fff" , fontSize:20}}
                              
                      />
                  </View>
                  
              </View>
                  <TextInput placeholder='Enter Image URL' placeholderTextColor='gray' onChangeText={handleChange("imageUrl")}
                           onBlur={handleBlur('imageUrl')} value={values.imageUrl}
                          style={{color:"#fff" , fontSize:16 ,borderTopColor:'gray' , borderWidth:1 , paddingVertical:10}}
                          onChange={(e) => {setThumbnail(e.nativeEvent.text)}}
                  />
                  {
                      errors.imageUrl && (
                        <Text style={{fontSize:10 , color:'red'}}>{errors.imageUrl}</Text>
                      )
                  }

                  <Button onPress={handleSubmit} title='Share' disabled={!isValid}  />
         </>
        )}

    </Formik>
  )
}

export default FormikUplaoder