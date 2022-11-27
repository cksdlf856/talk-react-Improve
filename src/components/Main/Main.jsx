import React from 'react';
import { useEffect, useState, useRef } from 'react';
import styles from "./Main.module.css";
import { useLocation } from 'react-router-dom';

import { db } from "../../firebase";
import { doc, getDocs, collection, setDoc, onSnapshot, query, where, orderBy, updateDoc, arrayUnion } from "firebase/firestore";

import Header from "../Header/Header";
import Side from "../Side/Side";
import Chat from '../Chat/Chat';

const Main = () => {
    
    const { state } = useLocation();
    const [ userRooms, setUserRooms ] = useState([]);
    const [ userMsgObj, setUserMsgObj ] = useState({});
    const [ userMsges, setUserMsges ] = useState([]);
    const [ userSearchList, setUserSearchList ] = useState([]);

    const mainRef = useRef();
    const chatMainRef = useRef();
    const headerRef = useRef();
    const asideRef = useRef();
    const userRef = useRef([]);
    const divAutoRef = useRef();
    const liRef = useRef([]);
    const chatRef = useRef();
    const roomListRef = useRef([]);
    const userMsgOrderRef = useRef(0);
    
    const searchClickOnOff = useRef(false);
    
    useEffect(()=>{

        // //채팅방 리스트
        const q = query(collection(db, "users"), where("email", "==", state.email));
        
        userChecked();
        async function userChecked(){
            const query = await getDocs(q);

            //console.log("useEffect :: query.size =", query.size);
            //console.log("==============================================================");

            if( 0 === query.size ){
                const usersRef = collection(db, "users");
                await setDoc(doc(usersRef, state.email), {
                    email: state.email,
                    name: state.displayName,
                    roomList: []
                });
            }

        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {                
                    setUserRooms(change.doc.data().roomList);
                }
            });
        },(error) => { 
            console.log("=========error============");
            console.log(error);
        });

        //유저검색 리스트
        const unsubscribe2 = onSnapshot(collection(db, "users"), (snapshot) => {
            const list = [];
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added" ) {
                    list.push(change.doc.data());
                    console.log(change.doc.data());
                }
            })
            
            if ( 0 === userRef.current.length ){
                userRef.current = list;
            } else {
                userRef.current = [...userRef.current, ...list];
            }
        })
        
        if(!(matchMedia("screen and (max-width: 767px)").matches)) return;
        asideRef.current.style.marginLeft = mobileAsideMargin();
        chatRef.current.style.height = mobileHeight();
        asideRef.current.style.width = (window.innerWidth/1.3) + "px";
        
    },[])

    useEffect(()=>{
        
        //채팅방 리스트
        const q = query(collection(db, "users"), where("email", "==", state.email));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    
                }
                if (change.type === "modified") {
                    //console.log("change.type :: modified :: userRooms = " ,userRooms);
                    setUserRooms(change.doc.data().roomList);
                    //debugger;
                }
            });
        },(error) => { 
            console.log("=========error============");
            console.log(error);
        });
    })

    useEffect(()=>{
        
        if ( 0 === userRooms.length ) return;
        
        //console.log("userRooms = ", userRooms);
        userRooms.forEach((data)=>{
            
            if ( undefined === data.roomName ) return;
            if ( '' === data.roomName ) return;

            const q = query(collection(db, "rooms/"+data.roomName+"/msges"), orderBy("order"));
            //console.log("userRooms.forEach :: data.roomName = ", data.roomName);
            
            msgList();
            async function msgList(){
                const query = await getDocs(q);
                //console.log("async :: msgList query.size = ", query.size);

                if ( 0 === query.size )  return;

                const list = [];
                query.forEach((doc) => {
                    list.push(doc.data());
                });
                
                //console.log("async :: msgList query list = ", list);
                
                
                
                setUserMsges((prev)=>{
                    
                    if ( 0 === prev.length ){
                        return [{
                            roomName: data.roomName,
                            msgList: list
                        }]
                    } else {
                        //console.log("setUserMsges :: prev = ", prev);
                        const obj = {
                            count: 0
                        }
                        prev.forEach((prevData)=>{
                            if( data.roomName === prevData.roomName ){
                                obj.count ++;
                            }
                        });
                        
                        if ( 0 === obj.count ){
                            
                            //console.log( "userRooms.forEach :: list = ", list);
                            return [...prev, {
                                roomName: data.roomName,
                                msgList: list
                            }]
                        }
                        return prev
                    }
                })
            }
        })
        
    //},[userRooms])
    })

    useEffect(()=>{
        //console.log(userMsgObj);
        
        if( undefined === userMsgObj.roomName ) return;
        if( '' === userMsgObj.roomName ) return;
        
        const q = query(collection(db, "rooms/"+userMsgObj.roomName+"/msges"), orderBy("order"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    //console.log(change.doc.data());
                    //console.log("=========================================================================")
                    //console.log("msges onSnapshot :: userMsgOrderRef.current = ", userMsgOrderRef.current);
                    //console.log("msges onSnapshot :: change.doc.data().order = ", change.doc.data().order);
                    if(userMsgOrderRef.current < change.doc.data().order){
                        
                        //console.log(userMsgObj);
                        setUserMsgObj((prev)=>({
                            ...prev,
                            msgList: [...prev.msgList, change.doc.data()]
                        }))
                        

                        // setUserMsgObj((prev)=>({
                        //     ...prev,
                        //     msgList: prev.msgList.forEach((data,index)=>{
                        //         if( data.order !== change.doc.data().order ){
                        //             return [...prev.msgList, change.doc.data()]
                        //         }
                        //         return prev.msgList
                        //     })
                        // }))


                        userMsgOrderRef.current = change.doc.data().order;

                    }
                    
                }
                if (change.type === "modified") {
                    
                    
                }
            });
        },(error) => { 
            console.log("=========error============");
            console.log(error);
        });

    })

    useEffect(()=>{
        
        if(!searchClickOnOff.current) return;
        sideFocus();

    },[userRooms])

    const mobileHeight = () =>{
        return  (window.innerHeight - 175) + "px"
    }

    const mobileAsideMargin = () =>{
        return (-(window.innerWidth/1.3)-18) + "px";
    }

    const headerUserSearchInput = (txt) =>{

        if ( '' === txt && 0 === userSearchList.length ) return;

        if ( '' === txt && 0 < userSearchList.length ){
            setUserSearchList([]);
            return
        }

        const userObj = userRef.current.find((data)=>{
            return data.email.split("@")[0].includes(txt)
        })

        if ( undefined === userObj ) return;

        if ( 0 === userSearchList.length ){
            setUserSearchList([userObj.email]);
        } else {
            if( !userSearchList.includes(userObj.email) ){
                setUserSearchList((prev)=>{
                    return [userObj.email, ...prev]
                })
            }
        }

    }

    const chatOnKeyDown = async (chat) => {
        
        const obj = {
            roomName: userMsgObj.roomName,
            msgSize: userMsgObj.msgList.length
        }
        
        //상대방과 최초 대화시 방 만들어주기.
        if ( 0 === obj.msgSize ){
            
            //총 채팅방 조회
            const query = await getDocs(collection(db, "rooms")); 

            //채팅방 문서를 먼저 말들어줘야함. 문서를 먼저 만들지 않고 메세지를 쌓으면 쿼리상 나타나지 않음.
            await setDoc(doc(db, "rooms", "room"+query.size), {}); 

            obj.roomName = "room"+query.size;

            const usersRef = collection(db, "users");

            //내 채팅방 만들기
            await updateDoc(doc(usersRef, state.email), {
                email: state.email,
                roomList: arrayUnion(
                    {
                        date: date().date,
                        emailY: userMsgObj.userEmail, //상대방 email
                        img: "./img/img_profile.png",
                        name: userMsgObj.userName, //상대방 name
                        roomName: obj.roomName,
                        titleContents: chat
                    }
                )
            });

            //상대 채팅방 만들기 
            await updateDoc(doc(usersRef, userMsgObj.userEmail), { //상대방 email
                email: userMsgObj.userEmail, //상대방 email
                roomList: arrayUnion(
                    {
                        date: date().date,
                        emailY: state.email,
                        img: "./img/img_profile.png",
                        name: state.displayName,
                        roomName: obj.roomName,
                        titleContents: chat
                    }
                )
            });
            //debugger;
            setUserMsgObj((prev)=>({
                ...prev, roomName: obj.roomName
            }))

        }

        const msgPushObj = {
            chat: chat,
            from: state.displayName, 
            time: date().time, 
            date: date().date,
            email: state.email,
            order: obj.msgSize+1
        }

        if ( 0 === obj.msgSize ){

            userMsgOrderRef.current = obj.msgSize+1;
            setUserMsgObj((prev)=>({
                ...prev,
                msgList: [...prev.msgList, msgPushObj]
            }))

        }

        // firebase 채팅 push
        const roomsRef = collection(db, "rooms/"+ obj.roomName +"/msges");
        await setDoc(doc(roomsRef, "msg"+(obj.msgSize+1)), msgPushObj);
        
    }
    

    const headerMenubarOnClick = () =>{
        if(!(matchMedia("screen and (max-width: 767px)").matches)) return;
        asideRef.current.style.marginLeft = '-18px';
        chatMainRef.current.style.opacity = '0.1';
        headerRef.current.style.opacity = '0.1';
        //console.log("올리기");
    }

    const mainOnClick = (e) => {
        
        

        if ( 'ipt_search' === e.target.id ) {
            if ( matchMedia("screen and (max-width: 767px)").matches && '-18px' === asideRef.current.style.marginLeft ){
                mobileSideOnOff();
                return;
            } else {
                return;
            }
        }

        if ( 'div_search_auto' === e.target.id ) return;
        if ( 'li' === e.target.localName ) return;

        if( 'visible' === divAutoRef.current.style.visibility ){
            divAutoRef.current.style.marginTop = "45px";
            divAutoRef.current.style.height = '0px';
            divAutoRef.current.style.visibility = 'hidden';
        }

        if(!(matchMedia("screen and (max-width: 767px)").matches)) return;
        if ( '-280px' === asideRef.current.style.marginLeft || '' === asideRef.current.style.marginLeft ) return;
        if ( 'aside_list' === e.target.id ) return;
        if ( 'i_menubar' === e.target.id ) return;

        if ( '-18px' === asideRef.current.style.marginLeft ){
            mobileSideOnOff();
        }
        //console.log("내리기");
    }

    const mobileSideOnOff = () =>{
        asideRef.current.style.marginLeft = mobileAsideMargin();
        chatMainRef.current.style.opacity = '1';
        headerRef.current.style.opacity = '1';
    }

    const chatMainHide = (division) =>{
        if ( division ) {
            chatMainRef.current.style.display = "none";
        } else {
            chatMainRef.current.style.display = "block";
        }   
        
    }

    const sideListOnClick = (uRoomsObj, currentTarget) =>{
        //debugger;
        //console.log("sideListOnClick :: userMsges = ", userMsges);
        const msgObj = {
            myEmail: state.email,
            myName: state.displayName,
            userName: uRoomsObj.name,
            roomName: uRoomsObj.roomName,
            userEmail: uRoomsObj.emailY,
            msgList: userMsges.map((data)=>{
                if( uRoomsObj.roomName === data.roomName ){
                    return data.msgList
                }
                return []
            }).flat()
        }
        
        if ( 0 !== msgObj.msgList.length ){
            userMsgOrderRef.current = msgObj.msgList[msgObj.msgList.length-1].order;
        }

        setUserMsgObj(msgObj);

        for ( let i = 0 ; i < roomListRef.current.length ; i++ ) {
            roomListRef.current[i].style.backgroundColor = "";
        }

        //===왼쪽 사이드 클릭시===
        if ( null !== currentTarget ) { 
            currentTarget.style.backgroundColor = "rgb(33 31 38)";

        //===검색창에서 유저 클릭시===
        } else { 
            
            roomListRef.current.forEach((data)=>{
                
                //===userRooms 기존에 있는 유저 클릭시===
                if( uRoomsObj.name === data.innerText.split('\n')[0] ){ 
                    data.style.backgroundColor = "rgb(33 31 38)";
                    
                //===userRooms 새로 추가된 유저 클릭시===  
                } else { 
                    
                    searchClickOnOff.current = true;
                }
            }) 
            
        }

    }

    const sideFocus = () => {// userRooms 신규 추가 시 useEffect 이후 발생해야해서.
        roomListRef.current[roomListRef.current.length-1].style.backgroundColor = "rgb(33 31 38)";
        searchClickOnOff.current = false;
    }

    const newUserAdd = (userEmail) =>{

        const cntObj = {
            cnt: 0
        }
        
        userRooms.forEach((data)=>{
            if( userEmail === data.emailY ){
                sideListOnClick(data, null);
                cntObj.cnt ++;
            }
        });
        
        if ( 0 < cntObj.cnt ) return;
        

        userRef.current.forEach((data)=>{
            
            if ( data.email === userEmail ){
                const userJson = {
                    date: date().date,
                    emailY: data.email,
                    img: "./img/img_profile.png",
                    name: data.name,
                    roomName: "",
                    titleContents: "",
                }
                
                const cntObj = {
                    cnt: 0
                }
                userRooms.forEach((data)=>{
                    if( userEmail === data.emailY ){
                        cntObj.cnt++;
                    }
                })
                
                if ( 0 === cntObj.cnt ){
                    setUserRooms((prev)=>{
                        return [...prev, userJson]
                    });
                    sideListOnClick(userJson, null);
                }
                
            }
        })

    }

    return(
        <div id="div_main" className={styles.div_main} ref={mainRef} onClick={mainOnClick} >
            <Header headerMenubarOnClick={headerMenubarOnClick} 
                    headerUserSearchInput={headerUserSearchInput}
                    userSearchList={userSearchList} 
                    headerRef={headerRef} 
                    divAutoRef={divAutoRef}
                    liRef={liRef}
                    chatMainHide={chatMainHide}
                    newUserAdd={newUserAdd}
                    />
            <Side userRooms={userRooms} 
                  sideListOnClick={sideListOnClick} 
                  asideRef={asideRef} 
                  roomListRef={roomListRef}
                  />
            <Chat userMsgObj={userMsgObj} 
                  chatOnKeyDown={chatOnKeyDown} 
                  chatMainRef={chatMainRef}
                  chatRef={chatRef} 
                  />
        </div>
    )

}

const date = () => { 
    const date = new Date();
            
    const hours = date.getHours() > 12 ? "오후 "+(date.getHours()-12) : "오전 " + date.getHours();
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    const dateJson = {
        date: year+"-"+month+"-"+day,
        time: hours + ":" + minutes 
    }
    
    return dateJson
}


export default Main