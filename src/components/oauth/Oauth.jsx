import React, { useRef, useEffect } from "react";
import styles from "./Oauth.module.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Oauth = () => {

    const divsub1Ref = useRef();
    const divMainRef = useRef();

    const navigate = useNavigate();


    useEffect(()=>{

        if ( matchMedia("screen and (max-width: 767px)").matches ){
            divMainRef.current.style.height = (window.innerHeight-20)+"px";
        } else {
            divMainRef.current.style.height = (window.innerHeight-90)+"px";
        }

    },[]);


    const oauthConnect = () => {
        //divMainRef.current.style.display = "none";
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            
            const user = result.user;
            //user.providerData[0].displayName
            //user.providerData[0].email

            navigate('/main', {state: user.providerData[0]});
            
            
        })
        .catch((error) => {
            //divMainRef.current.style.display = "grid";

            const errorCode = error.code;
            const errorMessage = error.message;
           
            const email = error.customData.email;
           
            const credential = GoogleAuthProvider.credentialFromError(error);
           
        })
        
    }

    return(
        <div className={styles.div_main} ref={divMainRef}>
            <div className={styles.div_sub_1} ref={divsub1Ref}>
                <h1 className={styles.h2_name}>Tolk</h1>
                <h2 className={styles.h1_contents}>토크 에서 <br/> 이야기를 펼쳐보세요</h2>
                <button className={styles.btn_google_auth} onClick={oauthConnect}>Google 로그인</button>
            </div>
            <div className={styles.div_sub_2}>
                <img src="img/flowerImg.svg" alt=""/>
            </div>
        </div>
    )
}

export default Oauth