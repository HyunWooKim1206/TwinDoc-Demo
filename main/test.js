//전역데이터 저장
let jsnData = {};
let reviews = {};

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
            reviews[keyPhrase] = review[1];
            console.log(review[1], "리뷰");

            //idx
            $.each(review[1], function (idx, key) {
                console.log(key.idx, "idx");
            });

            //버튼 all, keyPhrase해당하는 만큼 버튼만들기
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>";
            $("#reviewAll").append($button);
        });
        $(document).on('click', 'button', function () {
            let btnID = $(this).attr('id');
            var rvAll = "";
            var rv = "";
            if (btnID == 'btnReviewAll') {
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
                rv = JSON.stringify(reviews[btnID]).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\[\]\\\/]/g, " ").replaceAll(/[\}\,]/g, "<br>").replaceAll(/\:/g, ": ");
                $.each(content, function (keyPhrase, review) {
                    let similarProdName = [];
                    let similarProdImg = [];
                    $.each(review[2], function (i, prod) {
                        similarProdName.push(prod.similarProdName);
                        similarProdImg.push(prod.similarProdImg);
                    });
                    if (btnID == keyPhrase) {
                        for (let i = 0; i < similarProdImg.length; i++) {
                            let $btnId = $(`<div class = '${btnID}'></div>`);
                            $btnId.append($(`<img src = '${similarProdImg[i]}'>`));
                            $btnId.append($(`<div id = '${btnID}'>${similarProdName[i]}</div>`));
                            $('#simProd').append($btnId)
                        }
                        // $.each(similarProdImg, function (i, img) {
                        //     let $img = "<div class= '" + btnID + "'><img src = '" + img + "'</div>";
                        //     $('#simImg').append($img);
                        // });
                        // $.each(similarProdName, function (i, name) {
                        //     let $name = "<div class= '" + btnID + "'>" + name + "</div>";
                        //     $('#simName').append($name);
                        // });
                    }
                });
                $(".modal").fadeIn();
                $(".modal").click(function () {
                    $(".modal").fadeOut();
                    $('#simProd *').remove();
                });
            };
            $('#allReview').html(rvAll);
            $('#review').html(rv);
        })
    });
};

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