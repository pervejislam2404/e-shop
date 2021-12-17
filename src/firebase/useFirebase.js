import firebaseInitialize from "./firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {googleSignIn,googleLogOut, updateAuth, updateLoading, setErrorMsg, setAdmin, setIdToken} from '../Redux/slice/statesSlice'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

firebaseInitialize();
 const googleProvider = new GoogleAuthProvider();
 const auth = getAuth();
 
 
 const useFirebase = ()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.stateContainer.user);


    const registerWithEmailPass = (email, password, name) => {
      dispatch(updateLoading(true));
      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            dispatch(setErrorMsg(''));
            console.log('came sign with email pass');
              const newUser = { email, displayName: name };
              dispatch(googleSignIn(newUser))
              // save user to the database
              saveUser(email, name, 'POST');
              // send name to firebase after creation
              updateProfile(auth.currentUser, {
                  displayName: name
              }).then(() => {
              }).catch((error) => {
              });
              navigate('/');

          })
          .catch((error) => {
            const errorMessage = error.message;
            dispatch(setErrorMsg(errorMessage));
          })
          .finally(() =>  dispatch(updateLoading(false)));
  }


  const signWithEmailPass = (email, password, location, navigate) =>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    dispatch(googleSignIn(user));
    saveUser(user?.email, user?.displayName, 'PUT')

    const destination = location?.state?.from || '/';
    navigate(destination);
  })
  .catch((error) => {
    const errorMessage = error.message;
    dispatch(setErrorMsg(errorMessage));
  });

  }






const googleSign = (location,navigate)=>{
    dispatch(updateLoading(true));

    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      dispatch(updateLoading(false));
      dispatch(googleSignIn(user));
      saveUser(user.email, user.displayName,'PUT')
      const destination = location?.state?.from || '/';
      navigate(destination);
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch(setErrorMsg(errorMessage));
    });
}



const googleSingOut = ()=>{
    signOut(auth).then(() => {
        dispatch(googleLogOut(null));
        dispatch(setAdmin(false));
      }).catch((error) => {
       const errorMessage = error.message;
      dispatch(setErrorMsg(errorMessage));
      });
}


useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
        dispatch(updateAuth(user))
        if (user) {
          dispatch(googleSignIn(user));
            getIdToken(user)
                .then(idToken => {
                  dispatch(setIdToken(idToken));
                })
        } else {
          dispatch(googleSignIn(user));
        }
        
        dispatch(updateLoading(false));
    });
    return () => unsubscribed;
}, [auth])


useEffect(() => {
  axios(`https://guarded-ocean-40685.herokuapp.com/checkAdmin/${user?.email}`)
  .then(res=>{
    // console.log(res.data);
  dispatch(setAdmin(res.data))
  })
},[user])



const saveUser = (email, displayName, method) => {
  const user = { email, displayName };
  fetch('https://guarded-ocean-40685.herokuapp.com/setUser', {
      method: method,
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(user)
  })
      .then()
}





return {googleSingOut,googleSign,registerWithEmailPass, signWithEmailPass};

}

export default useFirebase;