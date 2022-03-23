//전역데이터 저장
let jsnData = {};
let reviews = {};
let rvs = [];
// 화면 구성
function setData() {
    $.when(
        // 데이터 불러오기
        $.getJSON('../json/predict_all_rev75prod85_for_demo.json', function (data) {
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

            $.each(review[1], function(i,prod){
            });

            //idx
            // $.each(review[1], function (idx, key) {
            //     console.log(key.idx, "idx");
            // });

            //버튼 all, keyPhrase해당하는 만큼 버튼만들기
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>";
            $("#reviewAll").append($button);
        });
        $(document).on('click', 'button', function () {
            $('#review *').remove();
            $('#allReview *').remove();
            let btnID = $(this).attr('id');
            var rvAll = "";
            if (btnID == 'btnReviewAll') {
                // const reviewAll = [];
                // Object.entries(reviews)
                //     .flatMap(([_, value]) => value)
                //     .forEach(data => {
                //         const sameData = reviewAll.find(resultData => resultData.comment === data.comment)
                //         if (!sameData) reviewAll.push(data);
                //     });
                // rvAll = JSON.stringify(reviewAll).replaceAll("userNum", "회원번호").replaceAll("comment", "리뷰").replaceAll(/["\{\[\]\\\/]/g, " ").replaceAll(/[\}\,]/g, "<br>").replaceAll(/\:/g, ": ");
                // console.log(rvAll);
                $.each(content, function(keyPhrase, review){
                    $.each(review[1], function(i, prod){
                        let $rv = $(`<div class = '${btnID}'>${prod.comment}</div>'`);
                        $('#allReview').append($rv);
                    })
                })
            } else {
                //KeyPhrase에 해당하는 리뷰
                $.each(content, function (keyPhrase, review) {
                    $.each(review[1], function (i, prod) {
                        if (btnID == keyPhrase) {
                            let $rv = $(`<div class = '${btnID}'>${prod.comment}</div>'`)
                            $('#review').append($rv);
                        }
                    });
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
                    }
                });
                $(".modal").fadeIn();
                $(".modal").click(function () {
                    $(".modal").fadeOut();
                    $('#simProd *').remove();
                });
            };
            // $('#allReview').html(rvAll);
        })
    });
};

$(function () {
    setData();
});
