import { initializeApp } from "firebase/app";
import firebaseConfig from './finrebase.config';


const firebaseInitialize = () => {
    return initializeApp(firebaseConfig);
}

export default firebaseInitialize;