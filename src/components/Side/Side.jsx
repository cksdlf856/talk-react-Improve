import React from "react";
import styles from "./Side.module.css";
// import { useLocation } from "react-router-dom";

// import { db } from "../../firebase";
// import { doc, getDocs, collection, setDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

// import Chat from "../Chat/Chat";

const Side = ({ userRooms, sideListOnClick, asideRef, roomListRef }) => {
    
    // const { state } = useLocation();
    
    // const indexRef = React.useRef(-1);
    // const [userRooms, setUserRooms] = React.useState([]);
    // const [userContent, setUserContent] = React.useState([]);
    
    // const roomListRef = React.useRef([]);
    
    // const forRoof = React.useRef(0);
    // const [msges, setMsges] = React.useState([]);
    // const msgesLength = React.useRef(0);
    
    //const asideRef = React.useRef();
    // const asideOnOffRef = React.useRef('');

    // const props = {
    //     email : state.email,
    //     displayName : state.displayName,
    //     index : indexRef.current,
    //     rooms : userRooms,
    //     content : userContent
    // }
    // console.log(props.index);

    //유저 검색 후 클릭 useEffect
    // React.useEffect(()=>{

    //     debugger;

    //     if ( undefined === state.sideOnOff ) return;
        
    //     asideOnOffRef.current = state.sideOnOff;
    //     if( asideOnOffRef.current ){
    //         asideRef.current.style.marginLeft = '-18px';
    //         asideOnOffRef.current = '';
    //     } else if ( !asideOnOffRef.current ) {
    //         asideRef.current.style.marginLeft = '-280px';
    //         asideOnOffRef.current = '';
    //     }

        
    //     if ( undefined === state.emailY ) return;

    //     let userRoomsCheck = false;
    //     userRooms.forEach((data, index)=>{
    //         if(state.emailY === data.emailY) {

    //             for ( let i = 0 ; i < roomListRef.current.length ; i++ ) {
    //                 roomListRef.current[i].style.backgroundColor = "";
    //             }

    //             userRoomsCheck = true;
    //             roomListRef.current[index].style.backgroundColor = "rgb(33 31 38)";
                
    //             indexRef.current = index;

    //             msges.forEach((data, msgIndex)=>{

    //                 if ( userRooms[index].roomName === data.roomName ){
    //                     setUserContent(data.msgList);
    //                     msgesLength.current = data.msgList.length;
    //                     debugger;
    //                 } else if ( msges.length-1 === msgIndex ){
    //                     setUserContent([]);
    //                     msgesLength.current = 0;
    //                 }

    //             })
    //         }
    //     })

    //     if ( userRoomsCheck ) return;
        
    //     const date = new Date();
    //     const year = date.getFullYear();
    //     const month = date.getMonth()+1;
    //     const day = date.getDate();

    //     const stateRef = {
    //         date: year+"-"+month+"-"+day,
    //         emailY: state.emailY,
    //         img: "./img/img_profile.png",
    //         name: state.nameY,
    //         roomName: "",
    //         titleContents: "",
    //     }

    //     if ( 0 === userRooms.length ){
    //         setUserRooms([stateRef]);
    //     } else {
    //         setUserRooms((prevState)=>{
    //             return [...prevState, stateRef]
    //         })
    //     }
        
    //     indexRef.current = roomListRef.current.length;

    //     setUserContent([]);
    //     msgesLength.current = 0;

    // },[state])

    //채팅방 리스트 useEffect
    // React.useEffect(()=>{
        
    //     if ( undefined === state.emailY ) return;
    //     if ( 0 === roomListRef.current.length ) return;
        
    //     for ( let i = 0 ; i < roomListRef.current.length ; i++ ) {
    //         if ( null !== roomListRef.current[i] )
    //         roomListRef.current[i].style.backgroundColor = "";
    //     }
        
    //     roomListRef.current[roomListRef.current.length-1].style.backgroundColor = "rgb(33 31 38)";
        
    //     indexRef.current = roomListRef.current.length-1;

    //     if ( '' === userRooms[roomListRef.current.length-1].roomName ){
    //         setUserContent([]);
    //         msgesLength.current = 0;
    //     } else {
    //         msges.forEach((data, msgIndex)=>{

    //             if ( userRooms[roomListRef.current.length-1].roomName === data.roomName ){
    //                 setUserContent(data.msgList);
    //                 msgesLength.current = data.msgList.length;
    //             } else if ( msges.length-1 === msgIndex ){
    //                 setUserContent([]);
    //                 msgesLength.current = 0;
    //             }

    //         })
    //     }

    // },[userRooms])

    // const onClick = (e) => {
        
    //     if ( '' !== e.currentTarget.style.backgroundColor ) return;

    //     if ( '' === e.currentTarget.style.backgroundColor ) {

    //         for ( let i = 0 ; i < roomListRef.current.length ; i++ ) {
    //             roomListRef.current[i].style.backgroundColor = "";
    //         }

    //         e.currentTarget.style.backgroundColor = "rgb(33 31 38)";
            
    //     }
        
    //     let number = Number(e.currentTarget.id);
        
    //     indexRef.current = number;
    
    //     msges.forEach((data, msgIndex)=>{

    //         if ( userRooms[number].roomName === data.roomName ){
    //             setUserContent(data.msgList);
    //             msgesLength.current = data.msgList.length;
    //             debugger;
    //         } else if ( msges.length-1 === msgIndex ){
    //             setUserContent([]);
    //             msgesLength.current = 0;
    //         }

    //     })
        
    // }

    // const refRoomData = (ref, index) => {
        
    //     roomListRef.current[index] = ref;
        
    // }

    //채팅방 리스트 실시간 불러오기.
    // React.useEffect(()=>{
    //     const q = query(collection(db, "users"), where("email", "==", state.email));

    //     const unsubscribe = onSnapshot(q, (snapshot) => {

    //         snapshot.docChanges().forEach((change) => {

    //             if (change.type === "added") {
                    
    //             }
    //             if (change.type === "modified") {
                    
    //                 setUserRooms(change.doc.data().roomList);
                    
    //             }

    //         });

    //     },(error) => {
              
    //         console.log("=========error============");
    //         console.log(error);
    //     });
    // })
    
    //클릭된 채팅방 실시간 메세지 불러오기.
    // React.useEffect(()=>{

    //     if ( -1 === indexRef.current ) return;
    //     if ( undefined === userRooms[indexRef.current] ) return;
    //     if ( '' === userRooms[indexRef.current].roomName ) return; //새로운 상대와 처음 대화시 채팅방이 없는 상태.

    //     const unsubscribe = onSnapshot(collection(db, "rooms/"+userRooms[indexRef.current].roomName+"/msges"), (snapshot) => {
            
    //         snapshot.docChanges().forEach((change) => {

    //             const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";

    //             const msgNumber = Number(change.doc.id.replace('msg',''));

    //             if ( msgesLength.current >= msgNumber ) return;

    //             if (change.type === "added") {
                    
    //                 //console.log(change.doc.data().chat);
                    
    //                 const msgJson = {
    //                     chat: change.doc.data().chat,
    //                     from: change.doc.data().from, 
    //                     time: change.doc.data().time,
    //                     date: change.doc.data().date,
    //                     email: change.doc.data().email,
    //                     order: change.doc.data().order  
    //                 }

    //                 setUserContent((prevState)=>{
    //                     return [...prevState, msgJson]
    //                 });
    //                 msgesLength.current = msgesLength.current + 1;
                    
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
        
    // })

    //채팅 리스트 불러오기
    // React.useEffect(()=> {

    //     const q = query(collection(db, "users"), where("email", "==", state.email));

    //     async function chatList(){

    //         const query = await getDocs(q);
    //         if ( 1 === query.size ){
                
    //             query.forEach((doc) => {
    //                 if ( 0 !== doc.data().roomList.length ) {
    //                     setUserRooms(()=>{
                            
    //                         return doc.data().roomList;
    //                     });
    //                 } 
    //             });

    //         //해당 email 유저가 없다면 만들어줌.    
    //         } else if ( 0 === query.size ){ 
    //             // ==================================
    //             // firebase 유저 채팅 리스트 push
    //             // ==================================
    //             const usersRef = collection(db, "users");
    //             await setDoc(doc(usersRef, state.email), {
    //                 email: state.email,
    //                 name: state.displayName,
    //                 roomList: []
    //             });
    //         }

    //     }
    //     chatList();

    // },[])

    //메세지 리스트 불러오기.
    // React.useEffect(()=> {
    
    //     if ( 0 === userRooms.length ) return;
    //     if ( userRooms.length-1 < forRoof.current ) return;
    //     if ( '' === userRooms[forRoof.current].roomName ) return; //채팅방이 안만들어진 상태.
        
    //     const q = query(collection(db, "rooms/"+userRooms[forRoof.current].roomName+"/msges"), orderBy("order"));
        
    //     async function msgList(){
            
    //         const query = await getDocs(q);
            
    //         if ( 0 < query.size ){
                
    //             let list = [];
    //             query.forEach((doc) => {
                   
    //                 list.push(doc.data());
                    
    //             });

    //             if ( undefined === userRooms[forRoof.current] ) return;

    //             if ( 0 === msges.length ){
    //                 setMsges([
    //                     {
    //                         roomName: userRooms[forRoof.current].roomName,
    //                         msgList: list
    //                     }
    //                 ])

    //             } else {
    //                 const listJson = {
    //                     roomName: userRooms[forRoof.current].roomName,
    //                     msgList: list
    //                 }
    //                 setMsges((prevState)=>{
    //                     return [...prevState, listJson]
    //                 })
    //             }

    //             forRoof.current = forRoof.current + 1;
            
    //         }

    //     }
    //     msgList();
        
    // })
    
    const onClick = (e) => {
        
        if ( '' !== e.currentTarget.style.backgroundColor ) return;

        // if ( '' === e.currentTarget.style.backgroundColor ) {

        //     for ( let i = 0 ; i < roomListRef.current.length ; i++ ) {
        //         roomListRef.current[i].style.backgroundColor = "";
        //     }

        //     e.currentTarget.style.backgroundColor = "rgb(33 31 38)";
            
        // }        
        
        sideListOnClick(userRooms[Number(e.currentTarget.id)], e.currentTarget);
    }
    
    return(
        <>  
            <aside id="aside_list" className={styles.aside_list} ref={asideRef} >
                {
                    userRooms.map((obj, index)=>{
                        return (
                            <div key={index} className={styles.div_aside} onClick={onClick} id={index} ref={(ref) => {roomListRef.current[index] = ref}} >
                                <img className={styles.img_profile} src={obj.img} alt=""/>
                                <b className={styles.b_userName} >{obj.name}</b>
                                <small className={styles.small_date} >{obj.date}</small>
                                <p className={styles.p_title_contents} >{obj.titleContents}</p>
                            </div>
                        )
                    })
                }
            </aside>
            {/* <Chat state={props}/> */}
        </>
    )
}

export default Side;