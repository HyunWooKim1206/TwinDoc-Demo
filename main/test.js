//전역데이터 저장
let jsnData = {};
let reviews = {};
let similarProds = {};
let similarProdsImg = {};
// 화면 구성
function setData() {
    $.when(
        // 데이터 불러오기
        $.getJSON('../json/predict_test_new_idx_for_demo.json', function (data) {
            jsnData = data;
        })
    ).then(function (data) {
        //제품번호 가져오기
        let prodNum = JSON.parse(localStorage.getItem('prodNum'));
        console.log(prodNum);

        //이미지, 제품명 가져오기
        let prodImg = data[prodNum].prodImg;
        let prodName = data[prodNum].prodName;
        let $img = "<img src = '" + prodImg + "'>" + prodName + "</button>"
        $("#prod").append($img);
        // console.log(data[prodNum].content.keyPhrase1[1][0].phrase, "phrase");
        //keyphrase를 추출
        let content = data[prodNum].content;
        console.log(content, "content");
        //각각의 KeyPhrase에 해당하는 리뷰 추출
        $.each(content, function (keyPhrase, review) {
            //리뷰추출
            reviews[keyPhrase] = review[1][0];
            console.log(review[1][0].comment, "리뷰");
            //유사상품 추출
            //유사상품이미지
            let sim = [];
            let simImg = [];
            // similarProds[keyPhrase] = review[2];
            $.each(review[2], function (i, prod) {
                sim.push(prod.similarProdName);
                simImg.push(prod.similarProdImg);
            });
            similarProds[keyPhrase] = sim;
            similarProdsImg[keyPhrase] = simImg;
            //idx
            $.each(review[1], function (idx, key) {
                console.log(key.idx, "idx");
            });
            //버튼 all, keyPhrase해당하는 만큼 버튼만들기
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>";
            $("#reviewAll").append($button);
        });
        $(document).on('click', 'button', function () {
            let btnId = $(this).attr('id');
            if (btnId == 'btnReviewAll') {
                const reviewAll = [];
                Object.entries(reviews)
                    .flatMap(([_, value]) => value)
                    .forEach(data => {
                        const sameData = reviewAll.find(resultData => resultData.comment === data.comment)
                        if (!sameData) reviewAll.push(data);
                    });
                rvAll = JSON.stringify(reviewAll).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\[\]\\\/]/g, " ").replaceAll(/[\}\,]/g, "<br>").replaceAll(/\:/g, ": ");
                console.log(rvAll);
            } else {

            }
        })
    });
};

//해당 keyPhrase를 눌렀을때 review&유사상품 추출
$(document).on('click', 'button', function () {
    let keyPhrase = $(this).attr('id');
    console.log(keyPhrase);
    //전체 리뷰
    var rvAll = "";
    //리뷰 
    var rv = "";
    //유사상품
    var sp = "";
    //전체리뷰 출력
    if (keyPhrase == 'btnReviewAll') {
        const reviewAll = [];
        Object.entries(reviews)
            .flatMap(([_, value]) => value)
            .forEach(data => {
                const sameData = reviewAll.find(resultData => resultData.comment === data.comment)
                if (!sameData) reviewAll.push(data);
            });
        rvAll = JSON.stringify(reviewAll).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\[\]\\\/]/g, " ").replaceAll(/[\}\,]/g, "<br>").replaceAll(/\:/g, ": ");
        console.log(rvAll);
    } else {
        //KeyPhrase에 해당하는 리뷰
        rv = JSON.stringify(reviews[keyPhrase]).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\[\]\\\/]/g, " ").replaceAll(/[\}\,]/g, "<br>").replaceAll(/\:/g, ": ");
        sp = JSON.stringify(similarProds[keyPhrase]).replaceAll(/[\{\[\]\\\/]/g, " ").replaceAll(/[\,\"]/g, "<br>").replaceAll(/\:/g, ": ");
        $(".modal").fadeIn();
        $(".modal").click(function () {
            $(".modal").fadeOut();
        });
        console.log(rv);
    };
    //전체 리뷰, 각 리뷰, 유사상품 html에 그리기
    $('.modal_content').html(sp);
    $('#allReview').html(rvAll);
    $('#review').html(rv);
});
console.log(similarProdsImg);
$(function () {
    setData();
});

// var items = data[1]; // 두번쨰 데이터를 가져와서

// // 항목 개수만큼 돌면서
// for (var i = 0; i < items.length; i++) {
//     var item = items[i]; // 아이템을 얻고
//     var phrase = item['phrase']; // phrase를 가져오고
//     var s_index = item['idx'][0][0]; // 시작 위치
//     var e_index = item['idx'][0][1]; // 끝 위치
//     var start = msg.substring(0, s_index); // 처음부터 phrase 시작위치까지 문자열을 찾는다.
//     var middle = msg.substr(s_index, phrase.length);	// 시작위치 부터 phrase 길이만큼의 문자열을 가져온다.
//     var end = msg.substr(s_index + phrase.length); // phrase 뒤 문자열을 찾는다.
//     console.log(start, middle, end);
// }