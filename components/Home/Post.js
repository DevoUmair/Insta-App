import { View, Text  , Image , StyleSheet , TouchableOpacity , Alert} from 'react-native'
import React , { useState }  from 'react'
import {arrayRemove, arrayUnion, doc, FieldValue, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase-config'
import react , {useEffect} from 'react'

const Post = ({post}) => {
    
   
  return (
    <View style={{marginBottom:30}} >
      <PostHeader post={post} />
      <PostImage post={post} />
      <Postfooter post={post} />
    </View>
  )
}

const PostHeader = ({post}) => {
    return(
        <View style={{flexDirection:"row" , justifyContent:'space-between' , margin:5 , alignItems:'center', marginRight:18 , paddingBottom:10}}>
            <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Image source={{uri:post?.profilePic}} style={styles.story} />
                <Text style={{color:'#fff' , marginLeft:10 , fontWeight:'700' }} >{post?.user}</Text>
            </View>

            <Text style={{color:'#fff' , fontWeight:'500' , fontSize:20}} >...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    story:{
        width: 35,
        height: 35,
        borderRadius:50,
        marginLeft:12,
        borderWidth:1.6,
        borderColor:'#ff8501'
    },
    footerIcon:{
        width:23,
        height: 23,
        marginLeft:12
    }
})

const PostImage = ({post}) => {
     return (
         <View style={{width:'100%'  , height:450}}>
             <Image source={{uri:post?.imageUrl}} style={{height:'100%' , resizeMode:'cover'}} />
         </View>
     )
}

const Postfooter = ({post}) => {
     const [img ,setImg] = useState(true)
     const [user , setUser] = useState();
 
     const handleClcik = async (postId) => {
   
         try {
            const postDoc = doc(db , "posts" , postId)

            setImg(!img)
            if(img){
               await updateDoc(postDoc , {
                   LikesByUsers:arrayUnion(user)
                })
            }else{
               await updateDoc(postDoc , {
                   LikesByUsers:arrayRemove(user)
                })
            }
         } catch (error) {
              Alert.alert(error.message)
         }
     }

     useEffect(() => {
         findUser();

         return () => findUser();
     },[])

     const findUser = () => {
         onAuthStateChanged(auth , (user) => {
             if(user){
                 setUser(user.uid)
                 
             }
         })
     }
 
     return (
         <View style={{marginTop:12}}>
             <View style={{flexDirection:'row' , justifyContent:'space-between' }}>
                <View style={{flexDirection:'row' , justifyContent:'flex-start' }}>
                   <TouchableOpacity onPress={() => handleClcik(post.id)}>
                        {
                            
                            !post.LikesByUsers.includes(user) ? (
                                
                                    <Image style={styles.footerIcon} source={require('../../assets/icons8-heart-50(1).png')} />
                            
                            ) : (
                                        <Image style={styles.footerIcon} source={require('../../assets/icons8-heart-30(1).png')} />
                            
                            )
                            
                        }
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.footerIcon} source={require('../../assets/icons8-topic-50.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.footerIcon} source={require('../../assets/icons8-telegram-app-50.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image style={[styles.footerIcon , {marginRight:15}]} source={require('../../assets/icons8-save-64.png')} />
                    </TouchableOpacity>
                </View>
             </View>
             <View style={{marginHorizontal:12, marginTop:18}}>
                <Text style={{color:'#fff'}}>{post?.LikesByUsers.length  } likes</Text>
                <View>
                    <Text style={{color:'#fff'  , marginTop:4}}>
                        <Text style={{fontWeight:"600" , marginRight:12}}>{post?.user} </Text>
                        <Text style={{marginLeft:5}} >{post?.caption}</Text>
                    </Text>
                </View>
             </View>
             <CommentSection post={post} />
         </View>
     )
}

const CommentSection = ({post}) => {
       return(
           <View style={{marginHorizontal:10}}>
               <Text style={{color:'gray' , marginTop:4}}> View
                   {
                       post?.comments.length > 1 ? ` All ${post?.comments.length} Comments` : ' comment'
                   }
               </Text>
               <View style={{marginTop:4}}>
                        {
                            post?.comments.map((comment , index) => (
                                <Text style={{marginTop:4 , marginHorizontal:4 }} key={index}>
                                    <Text style={{fontWeight:"600" , marginRight:12 , color:"#fff"}}>{comment?.user} </Text>
                                    <Text style={{marginLeft:5 , color:"#fff"}} >{comment?.comment}</Text>
                                </Text>
                            ))
                        }
                </View>
           </View>
       )
} 




export default Post