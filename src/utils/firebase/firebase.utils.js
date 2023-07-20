import { initializeApp } from 'firebase/app';
import { getAuth, signOut,signInWithEmailAndPassword,createUserWithEmailAndPassword,GoogleAuthProvider, signInWithRedirect ,signInWithPopup } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvBAfQY7QkS77W_5WppNLQKyLvfc544BY",
    authDomain: "clothingwebsite-c5abe.firebaseapp.com",
    projectId: "clothingwebsite-c5abe",
    storageBucket: "clothingwebsite-c5abe.appspot.com",
    messagingSenderId: "583186058528",
    appId: "1:583186058528:web:f6f8b0051d9a028e579b45"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return; 
    
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName,email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log('error creating the user',error.message);
        }
    }

    return userDocRef;
  };

  export const createAuthUserFromEmailAndPassword = async (email, password) => {
    if( !email || !password ) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  };

  export const signInAuthUserFromEmailAndPassword = async (email, password) => {
    if( !email || !password ) return;

    return await signInWithEmailAndPassword(auth, email, password)
  };

  export const signOutAuthUser = async () => await signOut(auth);
