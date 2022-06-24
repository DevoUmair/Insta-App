import React , {useEffect , useState} from 'react'
import {SignedInStack  , SignOutStack} from './Navigation'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './firebase-config'

const AuthNavigation = () => {
    const [curtentUser , setCurrentUser] = useState(null)

    const userHandler = (user) =>{
          user ? setCurrentUser(user) : setCurrentUser(null)
    }

    useEffect(
        () => 
        onAuthStateChanged(auth , (user) => { userHandler(user) }),
        []
    )

  return  <>{curtentUser ? <SignedInStack /> : <SignOutStack  />}</>
}

export default AuthNavigation