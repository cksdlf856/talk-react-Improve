import React from 'react';
import styles from "./Main.module.css";
import { useLocation } from 'react-router-dom';

import { db } from "../../firebase";
import { doc, getDocs, collection, setDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

import Header from "../Header/Header";
import Side from "../Side/Side";
import Chat from '../Chat/Chat';

const Main = () => {

    const { state } = useLocation();
    const [ userRooms, setUserRooms ] = React.useState([]);
    const [ userMsgObj, setUserMsgObj ] = React.useState({});
    const [ userMsges, setUserMsges ] = React.useState([]);
    const [ userSearchList, setUserSearchList ] = React.useState([]);

    const mainRef = React.useRef();
    const chatMainRef = React.useRef();
    const headerRef = React.useRef();
    const asideRef = React.useRef();
    const userRef = React.useRef([]);
    const divAutoRef = React.useRef();
    const liRef = React.useRef([]);
    
    
    React.useEffect(()=>{

        //채팅방 리스트
        const q = query(collection(db, "users"), where("email", "==", state.email));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log(change.doc.data());

                    setUserRooms(change.doc.data().roomList);
                }
                if (change.type === "modified") {
                    
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

                if (change.type === "added") {

                    list.push(change.doc.data());
                    
                }

            })
            
            if ( 0 === userRef.current.length ){
                userRef.current = list;
            } else {
                userRef.current = [...userRef.current, ...list];
            }
        })

    },[])

    React.useEffect(()=>{
        
        //debugger;
        userRooms.forEach((data)=>{
            //debugger;
            const q = query(collection(db, "rooms/"+data.roomName+"/msges"), orderBy("order"));
            msgList();
            async function msgList(){

                const query = await getDocs(q);

                if ( 0 === query.size )  return;

                const list = [];
                query.forEach((doc) => {
                    list.push(doc.data());
                });
                
                if ( 0 === userMsges.length ){
                    setUserMsges([{
                        roomName: data.roomName,
                        msgList: list
                    }])
                } else {
                    userMsges.forEach((msgData)=>{
                        if ( data.roomName !== msgData.roomName ){
                            setUserMsges((prev)=>{
                                return [...prev, {
                                    roomName: data.roomName,
                                    msgList: list
                                }]
                            })
                        }
                    })
                }

                // set 안에서 비교하게 되면 중복값이 있어도 쓸때없는 set을 하게 됨.
                // setUserMsges((prev)=>{
                //     console.log(prev.length);
                //     if( 0 === prev.length ){
                //         return [{roomName: data.roomName, msgList: list}]
                //     } else {
                //         console.log(prev);
                //         prev.forEach((msgData)=>{
                //             console.log(msgData.roomName);
                //             if ( data.roomName !== msgData.roomName ){
                //                 return [...prev, {roomName: data.roomName, msgList: list}]
                //             }
                //         })
                //         return [prev]
                //     }
                // })

            }
        })

    },[userRooms, userMsges])

    const headerMenubarOnClick = () =>{
        
        if(!(matchMedia("screen and (max-width: 767px)").matches)) return;
        asideRef.current.style.marginLeft = '-18px';
        chatMainRef.current.style.opacity = '0.1';
        headerRef.current.style.opacity = '0.1';
        console.log("올리기");
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

        console.log(userObj.email);
    }

    const sideListOnClick = (index) =>{
        
        const msgObj = {
            myEmail: state.email,
            myName: state.displayName,
            title: userMsges[index].msgList[0].from,
            msgList: userMsges[index].msgList
        }

        setUserMsgObj(msgObj);

    }

    const chatOnKeyDown = (chat) => {
        //date().date // date().time
        
        
        //debugger;
    }

    const mainOnClick = (e) => {
        
        console.log(e.target.localName);

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
        console.log("내리기");
    }

    const mobileSideOnOff = () =>{
        asideRef.current.style.marginLeft = '-280px';
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

    return(
        <div id="div_main" className={styles.div_main} ref={mainRef} onClick={mainOnClick} >
            <Header headerMenubarOnClick={headerMenubarOnClick} 
                    headerUserSearchInput={headerUserSearchInput}
                    userSearchList={userSearchList} 
                    headerRef={headerRef} 
                    divAutoRef={divAutoRef}
                    liRef={liRef}
                    chatMainHide={chatMainHide}
                    />
            <Side userRooms={userRooms} 
                  sideListOnClick={sideListOnClick} 
                  asideRef={asideRef} />
            <Chat userMsgObj={userMsgObj} 
                  chatOnKeyDown={chatOnKeyDown} 
                  chatMainRef={chatMainRef} />
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