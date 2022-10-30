import React from "react";
import styles from "./Chat.module.css";

import { db } from "../../firebase";
import { doc, getDocs, collection, setDoc, onSnapshot, query, where, orderBy, updateDoc, arrayUnion } from "firebase/firestore";


const Chat = ({state}) => {

    const [test, setTest] = React.useState([]);
    debugger;

    
    // React.useEffect(()=>{
        
    //     const unsubscribe = onSnapshot(collection(db, "rooms/room"+state.index+"/msges"), (snapshot) => {

    //         debugger;
    //         if ( -1 === state.index ) return;

    //         let snapList = [];

    //         snapshot.docChanges().forEach((change) => {

    //             const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
    //             console.log(source);
    //             //debugger; snapshot.docChanges()[0].doc.id
    //             //debugger;

    //             const msgNumber = Number(change.doc.id.replace('msg',''));

    //             if ( state.content.length >= msgNumber ) return;

    //             if (change.type === "added") {
    //                 //console.log("New city: ", change.doc.data());
                    
    //                 console.log(change.doc.data().chat);
                    
    //                 // setTest(
    //                 //     (prevState)=> {
    //                 //         return [...prevState, 
    //                 //             { 
    //                 //                 chat: change.doc.data().chat,
    //                 //                 from: change.doc.data().from, 
    //                 //                 time: change.doc.data().time,
    //                 //                 date: change.doc.data().date,
    //                 //                 email: change.doc.data().email,
    //                 //                 order: change.doc.data().order
    //                 //             } 
    //                 //         ]
    //                 //     }
    //                 // );
    //                 //debugger;
                    
    //             }
    //             if (change.type === "modified") {
                    
    //             }
    //             if (change.type === "removed") {
                    
    //             }
        
    //         });



    //     },(error) => {
              
    //         console.log("=========error============");
    //         console.log(error);
    //     });
        

    // },[])

    const onKeyDown = async (e) => {

        if ( "Enter" === e.key && "" !== e.target.value ){

            const date = new Date();
            
            const hours = date.getHours() > 12 ? "오후 "+(date.getHours()-12) : "오전 " + date.getHours();
            const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();

            //const msgSize = test.length+1;
            const msgSize = state.content.length;

            //local 내가 쓴 글 작업.
            // setTest((contents)=>{
            //     return[
            //         ...contents,
            //         { 
            //             chat: e.target.value,
            //             from: state.displayName, 
            //             time: hours + ":" + minutes,
            //             date: year+"-"+month+"-"+day,
            //             email: state.email,
            //             order: msgSize
            //         }
            //     ]
            // })

            
            
            //상대방과 최초 대화시 방 만들어주기.
            if ( 1 === msgSize ){
                
                // ==================================
                // firebase 유저 채팅 리스트 push
                // ==================================
                // const usersRef = collection(db, "users");
                // await setDoc(doc(usersRef, state.email), {
                //     email: state.email,
                //     roomList: "room"+state.rooms.length
                // });


                // ==================================
                // firebase 상대방 채팅 리스트 push
                // ==================================
                // const usersRef2 = collection(db, "users");
                // await setDoc(doc(usersRef2, state.rooms[state.index].emailY), {
                //     email: state.rooms[state.index].emailY,
                //     roomList: "room"+state.rooms.length
                // });

            }


            // firebase 채팅 push
            // const roomsRef = collection(db, "rooms/room"+ state.index +"/msges");
            // await setDoc(doc(roomsRef, "msg"+msgSize), {
            //     chat: e.target.value,
            //     from: state.displayName, 
            //     time: hours + ":" + minutes, 
            //     date: year+"-"+month+"-"+day,
            //     email: state.email,
            //     order: msgSize
            // });

            const roomsRef = collection(db, "users/"+ state.email);
            // await setDoc(doc(roomsRef, "msg"+msgSize), {
            //     chat: e.target.value,
            //     from: state.displayName, 
            //     time: hours + ":" + minutes, 
            //     date: year+"-"+month+"-"+day,
            //     email: state.email,
            //     order: msgSize
            // });


            debugger;
            // await updateDoc(roomsRef.id., {
            //     msges: arrayUnion(
            //         {
            //             chat: e.target.value,
            //             from: state.displayName, 
            //             time: hours + ":" + minutes, 
            //             date: year+"-"+month+"-"+day,
            //             email: state.email,
            //             order: msgSize
            //         }
            //     )
            // });
            //debugger;

            //텍스트창 초기화
            e.target.value = "";

            //setTest(1);
            
        }

    }

    const mainRef = React.useRef();
    const inputRef = React.useRef();
    
    React.useEffect(()=>{
        
        if( 0 === state.content.length ) return;

        // setTest(
        //     state.content
        // );
        debugger;
        
        
    },[state.content]); //[state.content] 가 바뀔때마다 이벤트 발생.

    //최신 채팅 업데이드 시 스크롤 하단으로 이동.
    React.useEffect(()=>{
        
        const chatScroll = document.getElementById("main_div_chat");
        chatScroll.scrollTop = mainRef.current.scrollHeight;

    },[test])

    return(
        
        <main className={styles.main_border_css} >
            <header className={styles.header_css}>
                <h2 className={styles.header_title_css}> {state.name} </h2>
            </header>
            <main id="main_div_chat" className={styles.main_css} ref={mainRef}>                
                {
                    undefined !== state.content ? 
                    state.content.map( (obj, index) => {
                        return <ChatListUi obj={obj} key={index} email={state.email} contents={state.content} />
                    })
                    :
                    null
                }
                {
                    // undefined !== test ? 
                    // test.map( (obj, index) => {
                    //     return <ChatListUi obj={obj} key={index} email={state.email} contents={test} />
                    // })
                    // :
                    // null
                }
            </main>
            <footer className={styles.footer_css}>
                <input 
                className={styles.input_css} 
                onKeyDown={onKeyDown} 
                ref={inputRef} 
                maxLength="45"
                />
            </footer>
        </main>
        
    )
}

const ChatListUi = ({obj, email, contents}) => {
    
    return(

        <>
            { obj.date !== (contents[obj.order-2] === undefined ? "" : contents[obj.order-2].date ) ? 
            <div style={{
                "textAlign": "center",
                "padding": "50px"
            }}>
                <b style={{
                    "backgroundColor":"rgb(53 55 59)",
                    "color":"rgb(170 171 173)",
                    "borderRadius":"6px",
                    "padding":"10px",
                    "paddingLeft":"80px",
                    "paddingRight":"80px",
                    "fontSize": "13px",
                    "opacity": "0.5",
                    "cursor": "pointer",
                    "transition": "all 1"
                }} onMouseOver={(e)=>{ e.target.style.opacity = "1"; }} onMouseOut={(e)=>{ e.target.style.opacity = "0.5"; }} >
                    { obj.date }
                </b>
            </div>
            :
            ""
            }

            { email === obj.email ?
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