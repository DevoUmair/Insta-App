import { View,  TouchableOpacity , Image , StyleSheet} from 'react-native'
import React ,{useState}  from 'react'


const BottomTab = () => {
  const [activeTab , setActiveTab ] = useState('Home')  

   const BottomIcons = [
    {
        iconName:'Home',
        activeImage:require('../../assets/BotoomTab/icons8-home-page-30(1).png'),
        InActiveImage:require('../../assets/BotoomTab/icons8-home-32.png'),
    },
    {
        iconName:'Search',
        activeImage:require('../../assets/BotoomTab/icons8-search-50.png'),
        InActiveImage:require('../../assets/BotoomTab/icons8-search-30(1).png'),
    },
    {
        iconName:'Reels',
        activeImage:require('../../assets/BotoomTab/icons8-instagram-reels-50(2).png'),
        InActiveImage:require('../../assets/BotoomTab/icons8-instagram-reels-50.png'),
    },
    {
        iconName:'Store',
        activeImage:require('../../assets/BotoomTab/icons8-shopaholic-50(1).png'),
        InActiveImage:require('../../assets/BotoomTab/icons8-shopaholic-50.png'),
    }
]

  return (
    <View >
        <View style={styles.continer}>
            {
                BottomIcons.map((icon , index) => (
                    <TouchableOpacity key={index} onPress={() => setActiveTab(icon.iconName)} >
                        <Image  source={ activeTab === icon.iconName ?  icon.activeImage : icon.InActiveImage}  style={{width:30, height:30,}} />
                    </TouchableOpacity>
                ))
            }
            <TouchableOpacity  onPress={() => setActiveTab('profile')}>
                <Image style={[styles.profileImge , activeTab === 'profile' && {borderColor:"#fff" , borderWidth:1}]}  source={{uri:'https://instagram.fcmb2-2.fna.fbcdn.net/v/t51.2885-15/127317615_810179552874839_324699435762398443_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fcmb2-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=QFSmilIfKYoAX-BFfrY&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjQ1MjAyODEzNzA4MjIxODk2NA%3D%3D.2-ccb7-5&oh=00_AT8SpGhcDBCkQW7KMvlHwWWqM0NsHundohMFrgMmOji2wQ&oe=62A39637&_nc_sid=30a2ef'}} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    continer:{
         flexDirection:'row',
         justifyContent:'space-around',
         height: 50,
         paddingTop:10,
         paddingBottom:30,
         borderTopColor:'gray',
         borderWidth:2,  
        zIndex:1000,

    },
    icon:{
         width:30,
         height:30,
    },
    profileImge:{
        width:30, 
        height:30, 
        borderRadius:50 ,
    }
})

export default BottomTab