//전역데이터 저장
let jsnData = {};
let reviews = {};

// 화면 구성
function setData() {
    $.when(
        // 데이터 불러오기
        $.getJSON(
            "../json/predict_all_rev75prod85_with_demo.json",
            function (data) {
                jsnData = data;
            }
        )
    ).then(function (data) {
        //제품번호 가져오기
        let prodNum = JSON.parse(localStorage.getItem("prodNum"));
        console.log(prodNum);

        //이미지, 제품명 가져오기
        let prodImg = data[prodNum].prodImg;
        let prodName = data[prodNum].prodName;
        // let $img = "<img src = '" + prodImg + "'>" + prodName + "</button>";
        let $img =
            "<div class='product-info-box left'><div class='product-images'>" +
            "<img src = '" +
            prodImg +
            "'> " +
            "</div>" +
            "</div > " +
            "<div class='product-info-box right'>" +
            "<div class='product-title'>" +
            "<div class='btn-util-area'><a href='' class='btn-util-share'></a><button type='button' class='btn-util-wish'></button></div>" +
            "<h3 class='product-name'>" +
            prodName +
            "</h3>" +
            "<p class='product-country'>원산지 : 하단 상품정보 원산지표시 참조</p>" +
            "<div class='price-info'>" +
            "<div class='price_item'>" +
            "<div class='product_sel_price'><span class='number ff-roboto'>57,320</span>원</div>" +
            "<div class='product_prime_price'><span class='number ff-roboto'>56,820</span>원<span class='txt'>the프라임 회원가</span><a href='' class='link'>무료체험하기</a></div>" +
            "</div>" +
            "<ul class='product-info-list'>" +
            "<li><span class='label'>카드혜택</span> CJ ONE 제휴카드 할인 <a href='' class='icon-help'></a></li>" +
            "<li><span class='label'>포인트적립</span> CJ ONE 19P (1%) <a href='' class='icon-help'></a></li>" +
            "<li><span class='label'>배송정보</span> 3,000원 <a href='' class='icon-help'></a></li>" +
            "</ul > " +
            "</div>" +
            "<div class='price-total'><span class='label'>합계</span><span class='price'><strong>57,320</strong>원</span></div>" +
            "<div class='detail-btn-group'>" +
            "<button type='button' class='btn-white3-lg-gift'><span>선물</span></button>" +
            "<button type='button' class='btn-black'><span>주문하기</span></button>" +
            "<button type='button' class='btn-default-lg'><span>바로구매</span></button>" +
            "</div>";
        "</div>" + "</div>";
        $("#prod").append($img);
        //keyphrase를 추출
        let content = data[prodNum].content;
        console.log(content, "content");
        //detail.html 시작에 보여줄 allReview
        $.each(content, function (keyPhrase, review) {
            $.each(review[1].sort(date_descending), function (i, prod) {
                let $rv =
                    "<li class='default_item ellips'>" +
                    "<div class='review_user_info'>" +
                    "<span class='thumb'>" +
                    "<img src='../img/profile_06.png' alt=''>" +
                    "</span>" +
                    "<div class='best-review-tag'>" +
                    "<p class='review_star'>" +
                    "<span class='star_box'><span class='star_per' style='width:100.0%'></span></span>" +
                    "<span class='star_num'><span class='blind'>별점</span>5</span>" +
                    "</p>" +
                    "</div>" +
                    "<p class='user_info'>" +
                    "<span class='id'>acs1***</span> <span class='date'>" + prod.rev_date.substring(0, 10) + "</span>" +
                    "<button class='btn_notify' type='button' onclick=''>" +
                    "<span>신고하기</span>" +
                    "</button>" +
                    "</p>" +
                    "</div>" +
                    "<div class = '" +
                    keyPhrase +
                    "'>" +
                    prod.comment +
                    "</div>" +
                    " <div class='review_btm'>" +
                    "<button id='recomm_1862828' class='btn_recommend notLogin' type='button' onclick=''>도움돼요!" +
                    "<em class='fc-green' id='recomm_cnt_1862828'>0</em>" +
                    "</button>" +
                    "</div>" +
                    "</li>";
                $("#allReview").append($rv);
            });
        });

        //각각의 KeyPhrase에 해당하는 리뷰 추출
        $.each(content, function (keyPhrase, review) {
            //리뷰추출
            reviews[keyPhrase] = review[1];
            console.log(review[1], "리뷰");

            //버튼 all, keyPhrase해당하는 만큼 버튼만들기
            let $button =
                "<button id = '" +
                keyPhrase +
                "' class='review_tag '>" + "# " +
                review[0] +
                "</button>";
            $("#reviewAll").append($button);
        });

        //keyPhrase 클릭시 해당 리뷰 & 유사상품 출력
        $(document).on("click", "button", function () {
            //review & allReview div 내용 삭제
            $("#review *").remove();
            $("#allReview *").remove();
            let btnID = $(this).attr("id");
            //버튼 active class
            $('.review_all').removeClass('active');
            if ($(this).hasClass('active')) {
                $('.review_tag').removeClass('active');
            } else {
                $('.review_tag').removeClass('active');
                $(this).addClass('active');
            }
            if (btnID != "btnReviewAll") {
                //KeyPhrase에 해당하는 리뷰
                $.each(content, function (keyPhrase, review) {
                    $.each(review[1].sort(date_descending), function (i, prod) {
                        if (btnID == keyPhrase) {
                            //highlighting을 위한 index값
                            let idx = prod.idx[0];
                            //review(comment)
                            let comment = prod.comment;
                            //review date
                            let rvDate = prod.rev_date;
                            //review highlighting
                            let highlight =
                                comment.substring(0, idx[0]) +
                                '<span style="background:#ffd081">' +
                                comment.substring(idx[0], idx[1]) +
                                "</span>" +
                                comment.substring(idx[1]);
                            let $rv =
                                //   $(
                                //   `<div class = '${btnID}'><div id='date'>${rvDate
                                //     .substring(0, 10)
                                //     .replace(/-/g, "")}</div>${highlight}</div>'`
                                // );
                                "<li class='default_item ellips'>" +
                                "<div class='review_user_info'>" +
                                "<span class='thumb'>" +
                                "<img src='../img/profile_06.png' alt=''>" +
                                "</span>" +
                                "<div class='best-review-tag'>" +
                                "<p class='review_star'>" +
                                "<span class='star_box'><span class='star_per' style='width:100.0%'></span></span>" +
                                "<span class='star_num'><span class='blind'>별점</span>5</span>" +
                                "</p>" +
                                "</div>" +
                                "<p class='user_info'>" +
                                "<span class='id'>acs1***</span> <span class='date'>" + rvDate.substring(0, 10) + "</span>" +
                                "<button class='btn_notify' type='button' onclick=''>" +
                                "<span>신고하기</span>" +
                                "</button>" +
                                "</p>" +
                                "</div>" +
                                "<div class = '" +
                                btnID +
                                "'>" +
                                highlight +
                                "</div>" +
                                " <div class='review_btm'>" +
                                "<button id='recomm_1862828' class='btn_recommend notLogin' type='button' onclick=''>도움돼요!" +
                                "<em class='fc-green' id='recomm_cnt_1862828'>0</em>" +
                                "</button>" +
                                "</div>" +
                                "</li>";
                            $("#review").append($rv);
                        }
                    });
                    //유사상품 이미지 & 명
                    let similarProdName = [];
                    let similarProdImg = [];
                    $.each(review[2], function (i, prod) {
                        similarProdName.push(prod.similarProdName);
                        similarProdImg.push(prod.similarProdImg);
                    });
                    //모달 form에 전달할 유사상품 정보
                    if (btnID == keyPhrase) {
                        for (let i = 0; i < similarProdImg.length; i++) {
                            let $btnId =
                                //   $(`<div class = '${btnID}'></div>`);
                                // $btnId.append($(`<img src = '${similarProdImg[i]}'>`));
                                // $btnId.append(
                                //   $(`<div id = '${btnID}'>${similarProdName[i]}</div>`)
                                // );
                                "<li>" +
                                "<div class='product-info'>" +
                                "<div class='name'>" +
                                similarProdName[i] +
                                "</div>" +
                                "<p class='cart'></p>" +
                                "</div>" +
                                "<img src='" +
                                similarProdImg[i] +
                                "'>" +
                                "</li>";
                            $("#simProd").append($btnId);
                        }
                    }
                });
                //모달 form
                $(".modal").fadeIn();
                $(".modal").click(function () {
                    $(".modal").fadeOut();
                    $("#simProd *").remove();
                });
            } else {
                //모든 리뷰
                $.each(content, function (keyPhrase, review) {
                    $.each(review[1].sort(date_descending), function (i, prod) {
                        let $rv =
                            //   $(
                            //   `<div class = '${btnID}'><div id='date'>${prod.rev_date}</div>${prod.comment}</div>'`
                            // );
                            "<li class='default_item ellips'>" +
                            "<div class='review_user_info'>" +
                            "<span class='thumb'>" +
                            "<img src='../img/profile_06.png' alt=''>" +
                            "</span>" +
                            "<div class='best-review-tag'>" +
                            "<p class='review_star'>" +
                            "<span class='star_box'><span class='star_per' style='width:100.0%'></span></span>" +
                            "<span class='star_num'><span class='blind'>별점</span>5</span>" +
                            "</p>" +
                            "</div>" +
                            "<p class='user_info'>" +
                            "<span class='id'>acs1***</span> <span class='date'>" + prod.rev_date + "</span>" +
                            "<button class='btn_notify' type='button' onclick=''>" +
                            "<span>신고하기</span>" +
                            "</button>" +
                            "</p>" +
                            "</div>" +
                            "<div class = '" +
                            btnID +
                            "'>" +
                            prod.comment +
                            "</div>" +
                            " <div class='review_btm'>" +
                            "<button id='recomm_1862828' class='btn_recommend notLogin' type='button' onclick=''>도움돼요!" +
                            "<em class='fc-green' id='recomm_cnt_1862828'>0</em>" +
                            "</button>" +
                            "</div>" +
                            "</li>";
                        $("#allReview").append($rv);
                    });
                });
            }
        });
    });
}

//시간 순 정렬
function date_descending(a, b) {
    var dateA = new Date(a["rev_date"]).getTime();
    var dateB = new Date(b["rev_date"]).getTime();
    return dateA < dateB ? 1 : -1;
}

$(function () {
    setData();
});
