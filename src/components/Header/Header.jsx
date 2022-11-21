import React from "react";
import styles from "./Header.module.css";

// import { db } from "../../firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ headerMenubarOnClick, 
                  headerRef, 
                  headerUserSearchInput, 
                  divAutoRef, 
                  userSearchList, 
                  liRef, 
                  chatMainHide, 
                  newUserAdd }) => {
    //debugger;
    // const userRef = React.useRef([]);
    // const refJsonRef = React.useRef();

    // const [user, setUser] = React.useState([]);

    //const liRef = React.useRef([]);
    //const divAutoRef = React.useRef();

    // const navigate = useNavigate();
    // const { state } = useLocation();

    const iMenubarRef = React.useRef();
    const pCancelRef = React.useRef();
    const iptSearchRef = React.useRef();
    const divMenubarRef = React.useRef();
    const divRightRef = React.useRef();

    // React.useEffect(()=>{
        
    //     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
    //         const list = [];
    //         snapshot.docChanges().forEach((change) => {

    //             if (change.type === "added") {

    //                 list.push(change.doc.data());
                    
    //             }

    //         })
            
    //         if ( 0 === userRef.current.length ){
    //             userRef.current = list;
    //         } else {
    //             userRef.current = [...userRef.current, ...list];
    //         }

    //     })

    // },[])
    
    // const onChangeSearch = (e) => {
        
    //     if ( null === state ) return;

    //     onClickSearch();

    //     if ( '' === e.target.value && 0 === user.length ) return;

    //     if ( '' === e.target.value && 0 !== user.length ) {
    //         setUser([]); 
    //         return;     
    //     }

    //     const userObj = userRef.current.find((data)=>{
    //         console.log(data.email);
    //         return data.email.includes(e.target.value)
    //     })

    //     if ( undefined === userObj ) return;
    //     if ( state.email === userObj.email ) return;
        
    //     if ( 0 === user.length ){
    //         setUser([userObj]);
    //     } else {
            
    //         let count = 0;
    //         user.forEach((data)=>{
    //             if (data.email === userObj.email) count++;
    //         })

    //         if ( 0 === count ){
    //             setUser((prevState)=>{
    //                 return [userObj, ...prevState]
    //             });
    //         }
            
    //     }

    // }

    // const onClick = (e) => {

    //     if ( '' === e.target.style.backgroundColor ){
            
    //         liRef.current.forEach((ref)=>{
    //             if (null !== ref)
    //             ref.style.backgroundColor = '';
    //         })
    //         e.target.style.backgroundColor = 'rgb(33, 31, 38)';

    //     } else if ( '' !== e.target.style.backgroundColor ){
    //         e.target.style.backgroundColor = '';
    //     }

    //     const refJson = {
    //         emailY: "", 
    //         name: ""
    //     }

    //     userRef.current.forEach((ref)=>{
    //         if ( ref.email === e.target.innerHTML ){
    //             refJson.emailY = ref.email;
    //             refJson.name = ref.name;
    //         }
    //     })

    //     refJsonRef.current = refJson

    //     const stateJson = {
    //         email: state.email,
    //         displayName: state.displayName,
    //         emailY: refJson.emailY,
    //         nameY: refJson.name,
    //     }

    //     navigate('/side', {state: stateJson});

    // }

    // const onClickSearch = () => {

    //     if ( 'visible' === divAutoRef.current.style.visibility ) return;

    //     divAutoRef.current.style.marginTop = "166px";
    //     divAutoRef.current.style.height = '120px';
    //     divAutoRef.current.style.visibility = 'visible';  
    // }

    // window.addEventListener('click',(e)=>{
   
    //     if ( null === e.target.parentElement ) return;

    //     if( 'ipt_search' === e.target.id ) return;
    //     if( 'div_search_auto' === e.target.id  ) return;
    //     if( 'div_search_auto' === e.target.parentElement.id ) return;
    //     if( 'div_search_auto' === e.target.parentElement.parentElement.id ) return;
    //     if ( null === divAutoRef.current ) return; 

    //     if( 'visible' === divAutoRef.current.style.visibility ){
    //         divAutoRef.current.style.marginTop = "45px";
    //         divAutoRef.current.style.height = '0px';
    //         divAutoRef.current.style.visibility = 'hidden';
    //     }

    //     //mobile
    //     if(matchMedia("screen and (max-width: 767px)").matches){

    //         if( null === state ) return;

    //         //asideOnOff();
    //         const stateJson = {
    //             email: state.email,
    //             displayName: state.displayName,
    //             emailY: "",
    //             nameY: "",
    //             sideOnOff: false
    //         }
    
    //         if ( undefined === refJsonRef.current ){
                
    //             stateJson.emailY = undefined;
    //             stateJson.nameY = undefined;
                
    //         } else {
                
    //             stateJson.emailY = refJsonRef.current.emailY;
    //             stateJson.nameY = refJsonRef.current.name;
    
    //         }
    
    //         navigate('/side', {state: stateJson});

    //     //pc
    //     } else {

    //     }

    // });

    const onClickI = () =>{
        headerMenubarOnClick();
    }

    const onChangeSearch = (e) => {
        onClickSearch();
        headerUserSearchInput(e.target.value);
    }

    const liOnClick = (e) =>{

        //if(matchMedia("screen and (max-width: 767px)").matches) return;

        if ( '' === e.target.style.backgroundColor ){
        
            liRef.current.forEach((ref)=>{
                if (null !== ref)
                ref.style.backgroundColor = '';
            })
            e.target.style.backgroundColor = 'rgb(33, 31, 38)';

        } else if ( '' !== e.target.style.backgroundColor ){
            e.target.style.backgroundColor = '';
        }
        cancelOnClick();

        newUserAdd(e.target.innerHTML);

    }

    const onClickSearch = () => {
        if ( 'visible' === divAutoRef.current.style.visibility ) return;

        //pc
        if(!(matchMedia("screen and (max-width: 767px)").matches)) {

            divAutoRef.current.style.marginTop = "172px";
            divAutoRef.current.style.height = '120px';
            divAutoRef.current.style.visibility = 'visible';

        //mobile  
        } else { 

            chatMainHide(true);

            divMenubarRef.current.style.display = "none";
            pCancelRef.current.style.display = "block";
            iMenubarRef.current.style.display = "none";
            iptSearchRef.current.style.width = "270px";
            iptSearchRef.current.style.fontSize = "16px";
            divRightRef.current.style.gridTemplateRows = "60px 1fr";
            divRightRef.current.style.height = "500px";

            divAutoRef.current.style.height = "100%"; //520
            // divAutoRef.current.style.marginTop = "610px";
            // divAutoRef.current.style.marginLeft = "-5px";
            
            divAutoRef.current.style.width = "100%";
            divAutoRef.current.style.display = "block";
            //divAutoRef.current.style.gridRow = "2/3";
            //divAutoRef.current.style.position = "inherit";
        }

        
    }

    const cancelOnClick = () =>{

        //pc
        if(!(matchMedia("screen and (max-width: 767px)").matches)) {

            divAutoRef.current.style.marginTop = "45px";
            divAutoRef.current.style.height = '0px';
            divAutoRef.current.style.visibility = 'hidden';

        //mobile  
        } else { 

            chatMainHide(false);

            divMenubarRef.current.style.display = "block";
            pCancelRef.current.style.display = "none";
            iMenubarRef.current.style.display = "inline";
            iptSearchRef.current.style.width = "163px";
            iptSearchRef.current.style.fontSize = "revert";
            divRightRef.current.style.gridTemplateRows = "none";
            divRightRef.current.style.height = "auto";

            
            divAutoRef.current.style.height = "0px";
            // divAutoRef.current.style.marginLeft = "-5px";
            
            // divAutoRef.current.style.marginTop = "600px";
            
            divAutoRef.current.style.width = "0px";
            divAutoRef.current.style.display = "none";
        }
    }

    // const onClickI = () =>{
        
    //     if(!(matchMedia("screen and (max-width: 767px)").matches)) return;

    //     if( null === state ) return;

    //     //asideOnOff();

    //     const stateJson = {
    //         email: state.email,
    //         displayName: state.displayName,
    //         emailY: "",
    //         nameY: "",
    //         sideOnOff: true
    //     }

    //     if ( undefined === refJsonRef.current ){
            
    //         stateJson.emailY = undefined;
    //         stateJson.nameY = undefined;
            
    //     } else {
            
    //         stateJson.emailY = refJsonRef.current.emailY;
    //         stateJson.nameY = refJsonRef.current.name;

    //     }

    //     navigate('/side', {state: stateJson});
    //}

    // const asideOnOff = () =>{
    //     debugger;
    //     if( null === state ) return;

    //     const stateJson = {
    //         email: state.email,
    //         displayName: state.displayName,
    //         emailY: "",
    //         nameY: "",
    //         sideOnOff: true
    //     }

    //     if ( undefined === refJsonRef.current ){
            
    //         stateJson.emailY = undefined;
    //         stateJson.nameY = undefined;
            
    //     } else {
            
    //         stateJson.emailY = refJsonRef.current.emailY;
    //         stateJson.nameY = refJsonRef.current.name;

    //     }

    //     navigate('/side', {state: stateJson});
    // }

    return (
        <header className={styles.header} ref={headerRef}>
            <nav className={styles.header_nav}>
                <div ref={divMenubarRef} className={styles.div_menubar}>
                    <i id="i_menubar" ref={iMenubarRef} className="fa-solid fa-bars" onClick={onClickI} ></i>
                </div>
                <div className={styles.header_div_right} ref={divRightRef}>
                    <input id="ipt_search" ref={iptSearchRef} className={styles.ipt_search} placeholder="user email search" onChange={onChangeSearch} onClick={onClickSearch} ></input>

                    <div id="div_search_auto" className={styles.div_search_auto} ref={divAutoRef}>
                        <ul>
                            {
                                userSearchList.map((data, index)=>{
                                    return(
                                        <li key={index} onClick={liOnClick} ref={(ref)=>{liRef.current[index]=ref}} >
                                            {data}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    {/* <i ref={iMenubarRef} className="fa-solid fa-bell" style={{"marginLeft":"20px"}}></i> */}
                    <p ref={pCancelRef} className={styles.p_cancel} onClick={cancelOnClick} >취소</p>
                </div>

            </nav>
        </header >
    )
}

export default Header;