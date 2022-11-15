import React from "react";
import styles from "./Chat.module.css";

import { db } from "../../firebase";
import { doc, getDocs, collection, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const Chat = ({userMsgObj, chatOnKeyDown, chatMainRef}) => {
    //debugger;
    // const onKeyDown = async (e) => {

    //     if ( "Enter" === e.key && "" !== e.target.value ){

    //         const date = new Date();
            
    //         const hours = date.getHours() > 12 ? "오후 "+(date.getHours()-12) : "오전 " + date.getHours();
    //         const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            
    //         const year = date.getFullYear();
    //         const month = date.getMonth()+1;
    //         const day = date.getDate();

    //         const msgSize = (undefined === state.content ? 0 : state.content.length);
            
    //         let roomName = state.rooms[state.index].roomName;
            
    //         //상대방과 최초 대화시 방 만들어주기.
    //         if ( 0 === msgSize ){
                
    //             //총 채팅방 조회
    //             const query = await getDocs(collection(db, "rooms")); 
                
    //             //채팅방 문서를 먼저 말들어줘야함. 문서를 먼저 만들지 않고 메세지를 쌓으면 쿼리상 나타나지 않음.
    //             await setDoc(doc(db, "rooms", "room"+query.size), {}); 

    //             roomName = "room"+query.size;
                 
    //             const usersRef = collection(db, "users");

    //             //내 채팅방 만들기
    //             await updateDoc(doc(usersRef, state.email), {
    //                 email: state.email,
    //                 roomList: arrayUnion(
    //                     {
    //                         date: year+"-"+month+"-"+day,
    //                         emailY: state.rooms[state.index].emailY,
    //                         img: "./img/img_profile.png",
    //                         name: state.rooms[state.index].name,
    //                         roomName: roomName,
    //                         titleContents: e.target.value
    //                     }
    //                 )
    //             });

    //             //상대 채팅방 만들기 
    //             await updateDoc(doc(usersRef, state.rooms[state.index].emailY), {
    //                 email: state.rooms[state.index].emailY,
    //                 roomList: arrayUnion(
    //                     {
    //                         date: year+"-"+month+"-"+day,
    //                         emailY: state.email,
    //                         img: "./img/img_profile.png",
    //                         name: state.displayName,
    //                         roomName: roomName,
    //                         titleContents: e.target.value
    //                     }
    //                 )
    //             });

    //         }

    //         // firebase 채팅 push
    //         const roomsRef = collection(db, "rooms/"+ roomName +"/msges");
    //         await setDoc(doc(roomsRef, "msg"+(msgSize+1)), {
    //             chat: e.target.value,
    //             from: state.displayName, 
    //             time: hours + ":" + minutes, 
    //             date: year+"-"+month+"-"+day,
    //             email: state.email,
    //             order: msgSize+1
    //         });

    //         //텍스트창 초기화
    //         e.target.value = "";
            
    //     }

    // }

    const mainRef = React.useRef();
    const inputRef = React.useRef();
    
    React.useEffect(()=>{
        
        const contentLength = (undefined === userMsgObj.msgList ? 0 : userMsgObj.msgList.length);

        if( 0 === contentLength ) return;

        //최신 채팅 업데이드 시 스크롤 하단으로 이동.
        const chatScroll = document.getElementById("main_div_chat");
        chatScroll.scrollTop = mainRef.current.scrollHeight;
        
    },[userMsgObj.msgList]); //[state.content] 가 바뀔때마다 이벤트 발생.

    const onKeyDown = (e) => {
        if ( "Enter" === e.key && "" !== e.target.value ){
            chatOnKeyDown(e.target.value);
        }
    }

    return(
        
        <main className={styles.main_border_css} ref={chatMainRef} >
            <header className={styles.header_css}>
                <h2 className={styles.header_title_css}> { undefined !== userMsgObj.title ? userMsgObj.title : null } </h2>
            </header>
            <main id="main_div_chat" className={styles.main_css} ref={mainRef}>                
                {
                    undefined !== userMsgObj.msgList ? 
                    userMsgObj.msgList.map( (obj, index) => {
                        return <ChatListUi obj={obj} key={index} myEmail={userMsgObj.myEmail} contents={userMsgObj.msgList} />
                    })
                    :
                    null
                    
                }
            </main>
            <footer className={styles.footer_css}>
                <input className={styles.input_css} onKeyDown={onKeyDown} ref={inputRef} maxLength="45"/>
            </footer>
        </main>
        
    )
}

const ChatListUi = ({obj, myEmail, contents}) => {
    
    return(

        <>
            { obj.date !== (contents[obj.order-2] === undefined ? "" : contents[obj.order-2].date ) ? 
            <div className={styles.div_b_date}>
                <b className={styles.b_date} onMouseOver={(e)=>{ e.target.style.opacity = "1"; }} onMouseOut={(e)=>{ e.target.style.opacity = "0.5"; }} >
                    { obj.date }
                </b>
            </div>
            :
            ""
            }

            { myEmail === obj.email ?
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
            }
        </>
        
    )
}

export default Chat;