function pagePost(param) {
    localStorage.setItem("prodNum", JSON.stringify(param));
    location.href = 'detail2.html';
};

function getProd() {
    $.when(
        $.getJSON('../json/predict_all_rev75prod85_for_demo.json', function (data) {
            jsonData = data;
        })
    ).then(function (data) {
        $.each(data, function (idx, product) {
            let prodNum = product.prodNum;
            let prodImg = product.prodImg;
            let prodName = product.prodName;
            console.log(prodName, prodNum);
            //home.html에 상품 갯수에 맞게 추가
            let $div =
                "<li id='" +
                prodNum +
                "'><a class='link'><div><img src='" +
                prodImg +
                "'></div> " +
                "<div class='product-info'><p class='title'> " +
                prodName +
                "</p><p class='price'><strong>57,320</strong>원</p><div class='star-rating'><span class='star'>★★★★</span>★<span class='count'>(99)</span></div></div>";

            "</></li > ";
            $("#product-review").append($div);
        });
    });
};

$(function () {
    getProd();
});

$(document).on('click', '.link', function () {
    let cId = $(this).parent('li').attr('id');
    pagePost(cId);
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