import { SafeAreaView , StyleSheet, ScrollView } from 'react-native'
import React , {useEffect , useState} from 'react'
import Header from '../components/Home/Header'
import Stories from '../components/Home/Stories'
import Post from '../components/Home/Post'
import BottomTab from '../components/Home/BottomTab'
import { collection , onSnapshot } from 'firebase/firestore'
import { db } from '../firebase-config'

const Homescreen = ({navigation}) => {
  const postCollection = collection(db , 'posts')
  const [posts ,setPost] = useState([]);

  useEffect(() => {
       const unsubscripe = onSnapshot(postCollection , (snap) => {
           setPost(snap.docs.map((doc) => ({...doc.data() , id:doc.id}) ))   
       })

       return unsubscripe;
  },[])


  return (
    <SafeAreaView style={styles.continer}>
             <Header navigation={navigation} />
             <Stories />
            <ScrollView>
                 {
                   posts.map((post , index) => (
                      <Post post={post} key={index} />
                   ))
                 }
            </ScrollView>
            <BottomTab />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    continer:{
           backgroundColor:"#000",
           flex: 1,
    }
})

export default Homescreen