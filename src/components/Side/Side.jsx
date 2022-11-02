import React from "react";
import styles from "./Side.module.css";
import { useLocation } from "react-router-dom";


import { db } from "../../firebase";
import { doc, getDocs, collection, setDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

import Chat from "../Chat/Chat";

const Side = () => {
    //debugger;
    const { state } = useLocation();
    const [index, setIndex] = React.useState(-1);
    const [userRooms, setUserRooms] = React.useState([]);
    const [userContent, setUserContent] = React.useState([]);
    //const [userContents, setUserContents] = React.useState([]);
    
    const roomListRef = React.useRef([]);
    
    const forRoof = React.useRef(0);
    const [msges, setMsges] = React.useState([]);
    const msgesLength = React.useRef(0);
    

    const props = {
        email : state.email,
        displayName : state.displayName,
        index : index,
        rooms : userRooms,
        content : userContent
    }

    const onClick = (e) => {

        if ( '' !== e.currentTarget.style.backgroundColor ) return;

        if ( '' === e.currentTarget.style.backgroundColor ) {

            for ( let i = 0 ; i < roomListRef.current.length ; i++ ) {
                roomListRef.current[i].style.backgroundColor = "";
            }

            e.currentTarget.style.backgroundColor = "rgb(33 31 38)";
            
        }
        
        
        console.log(userRooms);
        
        let number = Number(e.currentTarget.id);
        setIndex(number);
        //setUserContent( 1 === msges.length ? [msges[number]] : msges );
        setUserContent(msges[number]);
        msgesLength.current = msges[number].length;
        
        //debugger;
        //setUserContent( 0 === number ? (undefined === userContents[number][1] ? userContents[1]:userContents[number][1]) : userContents[number] );
        
    }

    const refRoomData = (ref, index) => {
        
        roomListRef.current[index] = ref;
        
    }


    React.useEffect(()=>{
        
        if ( -1 === index ) return;

        const unsubscribe = onSnapshot(collection(db, "rooms/"+userRooms[index].roomName+"/msges"), (snapshot) => {
            //debugger;
            

            snapshot.docChanges().forEach((change) => {

                const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
                console.log(source);
                
                //debugger;

                const msgNumber = Number(change.doc.id.replace('msg',''));

                if ( msgesLength.current >= msgNumber ) return;

                if (change.type === "added") {
                    //console.log("New city: ", change.doc.data());
                    
                    console.log(change.doc.data().chat);
                    
                    const msgJson = {
                        chat: change.doc.data().chat,
                        from: change.doc.data().from, 
                        time: change.doc.data().time,
                        date: change.doc.data().date,
                        email: change.doc.data().email,
                        order: change.doc.data().order  
                    }

                    //debugger;
                    //setUserContent([msges[number]]);
                    setUserContent((prevState)=>{
                        return [...prevState, msgJson]
                    });
                    msgesLength.current = msgesLength.current + 1;
                    
                }
                if (change.type === "modified") {
                    
                }
                if (change.type === "removed") {
                    
                }
        
            });



        },(error) => {
              
            console.log("=========error============");
            console.log(error);
        });
        

    })

    React.useEffect(()=> {
        
        const q = query(collection(db, "users"), where("email", "==", state.email));

        async function chatList(){

            const query = await getDocs(q);
            if ( 1 === query.size ){
                
                query.forEach((doc) => {
                    if ( 0 !== doc.data().roomList.length ) {
                        setUserRooms(()=>{
                            
                            return doc.data().roomList;
                        });
                        //debugger;
                        //roomNameRef.current = doc.data().roomList;
                    }
                    
                });
            //해당 email 유저가 없다면 만들어줌.    
            } else if ( 0 === query.size ){ 
                // ==================================
                // firebase 유저 채팅 리스트 push
                // ==================================
                const usersRef = collection(db, "users");
                await setDoc(doc(usersRef, state.email), {
                    email: state.email,
                    name: state.displayName,
                    roomList: []
                });
            }


        }
        chatList();

    },[])

    React.useEffect(()=> {
        
        if ( 0 === userRooms.length ) return;
        if ( userRooms.length-1 < forRoof.current ) return;
        if ( '' === userRooms[forRoof.current].roomName ) return; //채팅방이 안만들어진 상태.

        const q = query(collection(db, "rooms/"+userRooms[forRoof.current].roomName+"/msges"), orderBy("order"));
        //debugger;
        async function msgList(){
            //debugger;
            const query = await getDocs(q);
            
            if ( 0 < query.size ){
                
                
                let list = [];
                query.forEach((doc) => {
                   
                    list.push(doc.data());
                    
                });

                

                if ( 0 === msges.length ){
                    setMsges([list]);
                } else {
                    setMsges((prevState)=>{
                        return [...prevState, list]
                    })
                }

                forRoof.current = forRoof.current + 1;
                //debugger;
            }
            

        }
        msgList();
        
    })    


    
    return(
        <>
            <aside>
                {
                    userRooms.map((obj, index)=>{
                        return (
                            <div key={index} className={styles.div_aside} onClick={onClick} id={index} ref={ref => refRoomData(ref,index)} >
                                <img className={styles.img_profile} src={obj.img} alt=""/>
                                <b className={styles.b_userName} >{obj.name}</b>
                                <small className={styles.small_date} >{obj.date}</small>
                                <p className={styles.p_title_contents} >{obj.titleContents}</p>
                            </div>
                        )
                    })
                }
            </aside>
            <Chat state={props}/>
        </>
    )
}


export default Side;