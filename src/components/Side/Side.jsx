import React from "react";
import styles from "./Side.module.css";
import { useLocation } from "react-router-dom";


import { db } from "../../firebase";
import { doc, getDocs, collection, setDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

import Chat from "../Chat/Chat";

const Side = () => {

    const { state } = useLocation();
    const [index, setIndex] = React.useState(-1);
    const [userRooms, setUserRooms] = React.useState([]);
    const [userContent, setUserContent] = React.useState([]);
    //const [userContents, setUserContents] = React.useState([]);
    

    const roomListRef = React.useRef([]);
    //const roomNameRef = React.useRef([]);
    //const roomListLengthRef = React.useRef(0);
    //const iRef = React.useRef(0);

    //const [forRoof, setForRoof] = React.useState(0);
    const forRoof = React.useRef(0);
    const [msges, setMsges] = React.useState([]);
    
    //const [data, setData] = React.useState([]);
    

    const props = {
        email : state.email,
        displayName : state.displayName,
        index : index,
        rooms : userRooms,
        content : userContent
        //data : data
    }

    const onClick = (e) => {
        if ( '' === e.currentTarget.style.backgroundColor ) {

            for ( let i = 0 ; i < roomListRef.current.length ; i++ ) {
                roomListRef.current[i].style.backgroundColor = "";
            }

            e.currentTarget.style.backgroundColor = "rgb(33 31 38)";
            
        } else {
            e.currentTarget.style.backgroundColor = "";
        }
        //console.log(userContents);
        console.log(userRooms);
        
        let number = Number(e.currentTarget.id);
        setIndex(number);//userContents[number][1]
        //setUserContent(docData.current.firebase);
        debugger;
        //setUserContent( 0 === number ? (undefined === userContents[number][1] ? userContents[1]:userContents[number][1]) : userContents[number] );
        //debugger;
    }

    const refRoomData = (ref, index) => {
        
        roomListRef.current[index] = ref;
        
    }


    // React.useEffect(()=>{
        
    //     const unsubscribe = onSnapshot(collection(db, "rooms/room"+index+"/msges"), (snapshot) => {

    //         //debugger;
    //         if ( -1 === index ) return;


    //         snapshot.docChanges().forEach((change) => {

    //             const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
    //             console.log(source);
    //             //debugger; snapshot.docChanges()[0].doc.id
    //             //debugger;

    //             const msgNumber = Number(change.doc.id.replace('msg',''));

    //             if ( userContent.length >= msgNumber ) return;

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

    React.useEffect(()=> {
        debugger;
        
        const q = query(collection(db, "users"), where("email", "==", state.email));

        async function chatList(){

            const query = await getDocs(q);
            if ( 1 === query.size ){
                
                query.forEach((doc) => {
                    if ( 0 !== doc.data().roomList.length ) {
                        setUserRooms(()=>{
                            
                            return doc.data().roomList;
                        });
                        
                        //roomNameRef.current = doc.data().roomList;
                    }
                    debugger;
                });
            //해당 email 유저가 없다면 만들어줌.    
            } else if ( 0 === query.size ){ 
                // ==================================
                // firebase 유저 채팅 리스트 push
                // ==================================
                const usersRef = collection(db, "users");
                await setDoc(doc(usersRef, state.email), {
                    email: state.email,
                    roomList: []
                });
            }


        }
        chatList();

    },[])

    React.useEffect(()=> {
        debugger;
        if ( 0 === userRooms.length ) return;
        if ( userRooms.length-1 < forRoof.current ) return;

        const q = query(collection(db, "rooms/"+userRooms[forRoof.current].roomName+"/msges"), orderBy("order"));
        debugger;
        async function msgList(){
            debugger;
            const query = await getDocs(q);
            
            if ( 0 < query.size ){
                debugger;
                
                let list = [];
                query.forEach((doc) => {
                   
                    list.push(doc.data());
                    debugger;
                });

                debugger;

                if ( 0 === msges.length ){
                    setMsges(list);
                } else {
                    setMsges((prevState)=>{
                        return [prevState, list]
                    })
                }

                forRoof.current = forRoof.current + 1;

            }
            debugger;

        }
        msgList();

        // setForRoof((index)=>{
        //     return index + 1
        // });
        
    })

    // React.useEffect( ()=>{
        
    //     //debugger;
    //     const q = query(collection(db, "users"), where("email", "==", state.email));
    //     const qq = query(collection(db, "rooms/room"+(iRef.current)+"/msges"), orderBy("order"));
    //     //debugger;
        
    //     async function chatList(){

    //         if( 0 === iRef.current ){

    //             const query = await getDocs(q);

    //             //해당 email 유저가 있다면 채팅 리스트 불러옴.
    //             if ( 1 === query.size ){ 
    //                 query.forEach((doc) => {
    //                     if ( 0 !== doc.data().roomList.length ) {
    //                         setUserRooms(()=>{
    //                             return doc.data().roomList;
    //                         });
    //                         roomListLengthRef.current = doc.data().roomList.length;
    //                         //debugger;
    //                     }
    //                     debugger;
    //                 });
    //             //해당 email 유저가 없다면 만들어줌.    
    //             } else if ( 0 === query.size ){ 
    //                 // ==================================
    //                 // firebase 유저 채팅 리스트 push
    //                 // ==================================
    //                 const usersRef = collection(db, "users");
    //                 await setDoc(doc(usersRef, state.email), {
    //                     email: state.email,
    //                     roomList: []
    //                 });
    //             }
    //         //debugger;
    //         }



    //         if ( iRef.current === roomListLengthRef.current ) return;

    //         const list = [];
    //         const querySnapshot = await getDocs(qq);
    //         querySnapshot.forEach((doc) => {

    //             list.push({
    //                 chat: doc.data().chat,
    //                 time: doc.data().time,
    //                 email: doc.data().email,
    //                 from: doc.data().from,
    //                 date: doc.data().date,
    //                 order: doc.data().order
    //             });

    //         });
            
    //         //debugger;

    //         setUserContents((prevState)=>{
    //             // debugger;
    //             // if ( 0 === prevState.length ) {
    //             //     debugger;
    //             //     return [list];
    //             // } 
    //             return [[...prevState], list];
    //         });

    //         iRef.current = iRef.current + 1;
    //         //debugger;

    //     }
    //     chatList();

    // },[userContents])


    
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