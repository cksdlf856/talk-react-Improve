import React from "react";
import styles from "./Header.module.css";

import { db } from "../../firebase";
import { doc, getDocs, collection, setDoc, addDoc, onSnapshot, query, where, orderBy, updateDoc, arrayUnion } from "firebase/firestore";

const Header = () => {

    //debugger;

    const userRef = React.useRef([]);

    const [user, setUser] = React.useState([]);

    const liRef = React.useRef([]);
    const divAutoRef = React.useRef();

    React.useEffect(()=>{
        const q = query(collection(db, "users"), orderBy("email"));
        async function userList(){

            const list = [];
            const query = await getDocs(q);
            query.forEach((doc) => {
                list.push(doc.data());
                console.log(doc.data().email);
            })
            userRef.current = list;
            
            //debugger;
        }
        userList()
    },[]);

    
    const onChangeSearch = (e) => {
        console.log(e.target.value);

        if ( '' === e.target.value && 0 === user.length ) return;

        if ( '' === e.target.value && 0 !== user.length ) {
            setUser([]); 
            return;     
        }
        //debugger;


        const userObj = userRef.current.find((data)=>{
            console.log(data.email);
            return data.email.includes(e.target.value)
        })

        //console.log(userObj);

        if ( undefined === userObj ) return;

        if ( 0 === user.length ){
            setUser([userObj]);
        } else {
            
            let count = 0;
            user.forEach((data)=>{
                if (data.email === userObj.email) count++;
            })

            if ( 0 === count ){
                setUser((prevState)=>{
                    return [userObj, ...prevState]
                });
            }
            
        }

        //console.log("user: ", user.email);
        //console.log("user: ", user.name);
    }

    const onClick = (e) => {

        //debugger;

        if ( '' === e.target.style.backgroundColor ){
            
            liRef.current.forEach((ref)=>{
                if (null !== ref)
                ref.style.backgroundColor = '';
            })
            e.target.style.backgroundColor = 'rgb(33, 31, 38)';

        } else if ( '' !== e.target.style.backgroundColor ){
            e.target.style.backgroundColor = '';
        }

    }

    const onClickSearch = () => {
        
        divAutoRef.current.style.marginTop = "166px";
        divAutoRef.current.style.height = '120px';
        divAutoRef.current.style.visibility = 'visible';  
    }

    window.addEventListener('click',(e)=>{
        
        if( 'ipt_search' === e.target.id ) return;
        if( 'div_search_auto' === e.target.id  ) return;
        if( 'div_search_auto' === e.target.parentElement.parentElement.id ) return;

        if( 'visible' === divAutoRef.current.style.visibility ){
            divAutoRef.current.style.marginTop = "45px";
            divAutoRef.current.style.height = '0px';
            divAutoRef.current.style.visibility = 'hidden';
        }
    });


    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <div>
                    <i className="fa-solid fa-bars" ></i>
                </div>
                <div className={styles.header_div_right}>
                    <input id="ipt_search" className={styles.ipt_search} placeholder="user search" onChange={onChangeSearch} onClick={onClickSearch} ></input>
                    <div id="div_search_auto" className={styles.div_search_auto} ref={divAutoRef}>
                        <ul>
                            {
                                user.map((data, index)=>{
                                    return(
                                        <li key={index} onClick={onClick} ref={(ref)=>{liRef.current[index]=ref}} >
                                            {data.email}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                    <i className="fa-solid fa-bell" style={{"marginLeft":"20px"}}></i>
                </div>

            </nav>
        </header >
    )
}

export default Header;