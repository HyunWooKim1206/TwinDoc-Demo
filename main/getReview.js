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
        let prodNum = JSON.parse(localStorage.getItem('prodNum'));
        console.log(prodNum);
        //content[0] 뽑기
        //불러온 애들의 keyphrase를 추출
        let content = data[prodNum].content;
        console.log(content);
        //keyPhrase에 해당하는 rv를 
        //버튼 all, keyPhrase해당하는 만큼 버튼만들기
        $.each(content, function (keyPhrase, review) {
            //리뷰추출
            reviews[keyPhrase] = review[1];
            console.log(review[1], "리뷰");
            //유사상품 추출
            similarProds[keyPhrase] = review[2];
            console.log(review[2], "유사상품");
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>"
            $("#reviewAll").append($button);
        });
    });
};

//해당 keyPhrase를 눌렀을때 review&유사상품 추출
$(document).on('click', 'button', function () {
    let bId = $(this).attr('id');
    console.log(bId);
    //리뷰 
    var rv = "";
    var rvAll = "";
    //유사상품
    var sp = "";
    if (bId == 'btnReviewAll') {
        const result = [];
        Object.entries(reviews)
            .flatMap(([_, value]) => value)
            .forEach(data => {
                const sameData = result.find(resultData => resultData.comment === data.comment)
                if (!sameData) result.push(data);
            });
        console.log(result);
        rvAll = JSON.stringify(result).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\}\\\/]/g, " ").replaceAll(/[\[\],]/g, "<br>");;
    } else {
        rv = JSON.stringify(reviews[bId]).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\}\[\]\\\/]/g, " ").replaceAll(/,/g, "<br>");
        sp = JSON.stringify(similarProds[bId]).replaceAll("similarProdNum", "유사제품번호").replaceAll("similarProdName", "유사제품명").replaceAll(/["\\\/]/g, " ").replaceAll(/[\{\}\[\]\,]/g, "<br>");
    }

    $('#allReview').html(rvAll);
    $('#review').html(rv);
    $('#similar').html(sp);
});

$(function () {
    setData();
});