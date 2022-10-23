import React from "react";
import styles from "./Side.module.css";

const Side = () => {

    
    return(
        <aside>
            여러분 오늘도 에버디벨에 방문해 주셔서 감사합니다.<br/>
            everdevel 관련 사이트 <br/>
            <ul>
                <li><a href='mybook.everdevel.com' target='_blank'>웹코딩 시작하기 서포트 페이지</a></li>
                <li><a href='mybook.everdevel.com/php200/' target='_blank'>php 200제 서포트 페이지</a></li>
                <li><a href='www.startwebcoding.com' target='_blank'>swc</a></li>
                <li><a href='www.tomodevel.jp' target='_blank'>tomodevel</a></li>
            </ul>
        </aside>
    )
}

export default Side;