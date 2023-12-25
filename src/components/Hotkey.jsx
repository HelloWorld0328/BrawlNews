import React from "react"

const Hotkey=()=>{
    return(
        <table>
            <tr id="th">
                <th>단축키</th>
                <th>기능</th>
                <th>특이사항</th>
            </tr>
            <tr>
                <td>alt+h</td>
                <td>홈으로 가기</td>
                <td>홈일때 사용하면 글을 불러오는 기능으로 사용할수 있다.</td>
            </tr>
            <tr>
                <td>alt+Enter</td>
                <td>작성중이던 글 업로드</td>
                <td>작성화면에서만 사용가능</td>
            </tr>
            <tr>
                <td>alt+i</td>
                <td>정보페이지로 가기</td>
                <td>없음</td>
            </tr>
            <tr>
                <td>alt+n</td>
                <td>글 작성하기</td>
                <td>작성화면에서 누르면 작성하던 글이 초기화되니 주의</td>
            </tr>
            <tr>
                <td>alt+s</td>
                <td>단축키 표시</td>
                <td>없음</td>
            </tr>
        </table>
    )
}

  export default Hotkey;