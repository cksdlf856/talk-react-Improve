import React from "react";
import styles from "./Header.module.css";

const Header = ({ headerMenubarOnClick, 
                  headerRef, 
                  headerUserSearchInput, 
                  divAutoRef, 
                  userSearchList, 
                  liRef, 
                  chatMainHide, 
                  newUserAdd }) => {
    
    const iMenubarRef = React.useRef();
    const pCancelRef = React.useRef();
    const iptSearchRef = React.useRef();
    const divMenubarRef = React.useRef();
    const divRightRef = React.useRef();

    const onClickI = () =>{
        headerMenubarOnClick();
    }

    const onChangeSearch = (e) => {
        onClickSearch();
        headerUserSearchInput(e.target.value);
    }

    const liOnClick = (e) =>{

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
            
            divAutoRef.current.style.width = "100%";
            divAutoRef.current.style.display = "block";
            
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
            
            divAutoRef.current.style.width = "0px";
            divAutoRef.current.style.display = "none";
        }
    }
    
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