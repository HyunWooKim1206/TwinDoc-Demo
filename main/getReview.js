//전역데이터 저장
let jsnData = {};
let reviews = {};
let similarProds = {};

// 화면 구성
function setData() {
    $.when(
        // 데이터 불러오기
        $.getJSON('../json/10Prod.json', function (data) {
            jsnData = data;
        })
    ).then(function (data) {
        //제품번호 추출
        let prodNum = JSON.parse(localStorage.getItem('prodNum'));
        console.log(prodNum);
        //keyphrase를 추출
        let content = data[prodNum].content;
        console.log(content);
        //각각의 KeyPhrase에 해당하는 리뷰 추출
        $.each(content, function (keyPhrase, review) {
            //리뷰추출
            reviews[keyPhrase] = review[1];
            console.log(review[1], "리뷰");
            //유사상품 추출
            similarProds[keyPhrase] = review[2];
            console.log(review[2], "유사상품");
            //버튼 all, keyPhrase해당하는 만큼 버튼만들기
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>"
            $("#reviewAll").append($button);
        });
    });
};

//해당 keyPhrase를 눌렀을때 review&유사상품 추출
$(document).on('click', 'button', function () {
    let bId = $(this).attr('id');
    console.log(bId);
    //전체 리뷰
    var rvAll = "";
    //리뷰 
    var rv = "";
    //유사상품
    var sp = "";
    //전체리뷰 출력
    if (bId == 'btnReviewAll') {
        const result = [];
        Object.entries(reviews)
            .flatMap(([_, value]) => value)
            .forEach(data => {
                const sameData = result.find(resultData => resultData.comment === data.comment)
                if (!sameData) result.push(data);
            });
        console.log(result);
        rvAll = JSON.stringify(result).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\}\[\]\\\/]/g, " ").replaceAll(/,/g, "<br>").replaceAll(/\:/g,": ");
    } else {
        //KeyPhrase에 해당하는 리뷰
        rv = JSON.stringify(reviews[bId]).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\}\[\]\\\/]/g, " ").replaceAll(/,/g, "<br>").replaceAll(/\:/g,": ");
        sp = JSON.stringify(similarProds[bId]).replaceAll("similarProdNum", "유사제품번호").replaceAll("similarProdName", "유사제품명").replaceAll(/["\\\/]/g, " ").replaceAll(/[\{\}\[\]\,]/g, "<br>").replaceAll(/\:/g,": ");
    }
    //전체 리뷰, 각 리뷰, 유사상품 html에 그리기
    $('#allReview').html(rvAll);
    $('#review').html(rv);
    $('#similar').html(sp);
});

$(function () {
    setData();
});