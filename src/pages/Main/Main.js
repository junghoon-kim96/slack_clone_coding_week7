import React from "react";
import styled from "styled-components";




const Main = () => {




    return (
        < Page >
            <Head >
                <LeftHead>돋보기</LeftHead>
                <CenterHead>
                    <SearchID
                        placeholder="검색"
                    />
                </CenterHead>
                <RightHead>프로필</RightHead>
            </Head >
            <div>

            </div>
        </ Page >
    )
}

const Page = styled.div`
width : 100vw;
height: 100vh;
display: flex;
flex-direction: column;
`;

const Head = styled.div`
background: #350d36;
box-shadow: 0 1px 0 0 rgb(255 255 255 /10%);
display: flex;
flex-direction: row;
align-items: center;
position: relative;
z-index: 203;
min-width: 0;
height: 44px;
`
const LeftHead = styled.div`
width: 10vw;
height: 100%;
margin: 0;
`;

const RightHead = styled.div`
width: 10vw;
height: 100%;
margin: 0;
`;

const CenterHead = styled.div`
padding:0;
margin:0;
`;

const SearchID = styled.input`
text-align: center;
margin: 0;
width: 80%;
`;

export default Main;