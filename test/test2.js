function pageAlgo(total, bottomSize, listSize, cursor ){
    //total = 총 갯수
    //bottomSize = 하단크기
    //listSize = 화면에서 보여줄 크기
    //cursor = 현재 나의 페이지

    var totalPageSize = Math.ceil(total / listSize)  //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 

    var firstBottomNumber = cursor%bottomSize > 0 ? cursor - cursor % bottomSize + 1 : cursor - bottomSize + 1;  //하단 최초 숫자
    
    var lastBottomNumber = cursor%bottomSize > 0 ? cursor - cursor % bottomSize + bottomSize : firstBottomNumber + bottomSize - 1;  //하단 마지막 숫자

    if(lastBottomNumber > totalPageSize) lastBottomNumber = totalPageSize  //총 갯수보다 큰 경우 방지

    return {
        firstBottomNumber,
        lastBottomNumber,
        totalPageSize,
        total,
        bottomSize,
        listSize,
        cursor
    }
}
//displayPage(1);
function callPaging(obj) {
    var cur_page = parseInt(obj.id);
    console.log(cur_page);
    displayPage(cur_page);
}

function displayPage(cur_page) {
    //280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
    var info = pageAlgo(280, 20, 10, cur_page);  
    console.log(info);
    var pageHtml = '<br>';
    if ( info.firstBottomNumber > 1 ) pageHtml += "<a href='#' id='" + (info.firstBottomNumber-1) + "' onclick='callPaging(this)'>이전</a><span> </span>";
    for(var i = info.firstBottomNumber ; i <= info.lastBottomNumber; i++){
        var s = i;
        if ( i == info.cursor ) s = '<span style="color:red">' + i + '</span>';
        pageHtml += "<a href='#' id='" + i + "' onclick='callPaging(this)'>" + s + "</a><span> </span>";
    }
    if ( info.lastBottomNumber < info.totalPageSize) pageHtml += "<a href='#' id='" + (info.lastBottomNumber+1) + "' onclick='callPaging(this)'>다음</a><span> </span>";
    var pageobj = document.getElementById('div_page');
    pageobj.innerHTML = pageHtml;
}
window.onload = function(){
    displayPage(1);
}