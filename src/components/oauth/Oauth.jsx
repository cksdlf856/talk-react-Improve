import React from "react";
import styles from "./Oauth.module.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Oauth = () => {

    const divsub1Ref = React.useRef();

    const navigate = useNavigate();

    const oauthConnect = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            
            const user = result.user;
            //user.providerData[0].displayName
            //user.providerData[0].email

            navigate('/side', {state: user.providerData[0]});
            
            
        }).catch((error) => {
           
            const errorCode = error.code;
            const errorMessage = error.message;
           
            const email = error.customData.email;
           
            const credential = GoogleAuthProvider.credentialFromError(error);
           
        });
    }

    return(
        <div className={styles.div_main}>
            <div className={styles.div_sub_1} ref={divsub1Ref}>
                <h2 className={styles.h2_name}>tallk_ch</h2>
                <h1 className={styles.h1_contents}>talk_ch 에서 <br/> 이야기를 펼쳐보세요</h1>
                <button className={styles.btn_google_auth} onClick={oauthConnect}>Google 로그인</button>
            </div>
            <div>
                <img src="img/img_house_evening.png" style={{"width":"100%"}} alt=""/>
            </div>
        </div>
    )
}

export default Oauth