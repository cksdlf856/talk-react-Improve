import React from "react";
import styles from "./Chat.module.css";

import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";


const Chat = () => {

    const [contents, setContents] = React.useState(()=>{
        return []
    });

    React.useEffect( () => {

        async function chatList(){

            const list = [];

            // ==================================
            // firebase 채팅 리스트 불러오기
            // ==================================
            const querySnapshot = await getDocs(collection(db, "rooms/room1/msges"));
            querySnapshot.forEach((doc) => {
                
                console.log(doc.id, " => ", doc.data().chat);

                list.push({
                    chat: doc.data().chat,
                    time: doc.data().time,
                    writerCode: doc.data().writerCode
                });

            });

            setContents(list);

        }
        chatList();

    },[]);
    
    
    
    const onKeyDown = async (e) => {

        if ( "Enter" === e.key && "" !== e.target.value ){

            // ==================================
            // firebase 채팅 단건 불러오기
            // ==================================
            // const docRef = doc(db, "rooms/room_1_2/msges/msg1");
            // const docSnap = await getDoc(docRef);

            // if (docSnap.exists()) {
            //     console.log("Document data:", docSnap.data());
            // } else {
                
            //     console.log("No such document!");
            // }


            const date = new Date();

            const hours = date.getHours() > 12 ? "오후 "+(date.getHours()-12) : "오전 " + date.getHours();
            const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

            setContents([
                ...contents, 
                { 
                    chat: e.target.value,
                    time: hours + ":" + minutes,
                    writerCode: 0
                }
            ]);

            //const msgSize = chatList.size+1;
            const msgSize = contents.length+1;

            // firebase 채팅 push
            const citiesRef = collection(db, "rooms/room1/msges");
            await setDoc(doc(citiesRef, "msg"+msgSize), {
                chat: e.target.value,
                from: "박찬일", 
                id: 1,
                writerCode: 0,
                time: hours + ":" + minutes, 
                date: "2022-10-13"
            });

            e.target.value = "";
        }

    }

    const mainRef = React.useRef();
    const textareaRef = React.useRef();
    
    React.useEffect(()=>{
        console.log("useEffect");

        const chatScroll = document.getElementById("main_div_chat");
        chatScroll.scrollTop = mainRef.current.scrollHeight;
    
        //console.log(mainRef.current.scrollHeight);
        console.log(contents);

        //console.log(textareaRef.current);
        

    },[contents]); //[contents] 가 바뀔떄마다 이벤트 발생.


    return(
        <main className={styles.main_border_css} >
            <header className={styles.header_css}>
                <h2 className={styles.test}>방 title</h2>
            </header>
            <main id="main_div_chat" className={styles.main_css} ref={mainRef}>

                {
                    contents.map( (obj, index) => {
                        return <SelfChat obj={obj} key={index} />
                    })
                    
                }
            </main>
            <footer className={styles.footer_css}>
                <textarea 
                className={styles.textarea_css} 
                onKeyDown={onKeyDown} 
                ref={textareaRef} 
                wrap="hard"
                maxLength="50"
                rows="1"
                ></textarea>
            </footer>
        </main>
    )
}

const SelfChat = ({obj}) => {
    
    return(
        0 === obj.writerCode ?
        <div className={styles.div_css}>
            <p className={styles.p_date_css}>
                {obj.time}
            </p>
            <p className={styles.p_contents_css}>
                {obj.chat}
            </p>
        </div>
        :
        <div className={styles.div_css_op}>
            <img className={styles.img_profile} src="./img/img_profile.png" alt=""/>
            <p className={styles.p_contents_css_op}>
                {obj.chat}
            </p>
            <p className={styles.p_date_css_op}>
                {obj.time}
            </p>
        </div>
    )
}

// const OpponentChat = () => {


//     return(
//         <div className={styles.div_css_op}>
//             <img className={styles.img_profile} src="./img/img_profile.png" alt=""/>
//             <p className={styles.p_contents_css_op}>
//                 Nice guy~~
//             </p>
//             <p className={styles.p_date_css_op}>
//                 {
                    

//                 }
//             </p>
//         </div>
//     )
// }


export default Chat;