function pagePost(param) {
    localStorage.setItem("prodNum", JSON.stringify(param));
    location.href = 'detail.html';
};

function getProd() {
    $.when(
        $.getJSON('../json/predict_test_new_idx_for_demo.json', function (data) {
            jsonData = data;
        })
    ).then(function (data) {
        $.each(data, function (idx, product) {
            let prodNum = product.prodNum;
            let prodImg = product.prodImg;
            let prodName = product.prodName;
            console.log(prodName, prodNum);
            //home.html에 상품 갯수에 맞게 추가
            let $div = "<div id='" + prodNum + "'><a class='link'><img src='" + prodImg + "'>" + prodName + "</a></div>";
            $("#product-review").append($div);
        });
    });
};

$(function () {
    getProd();
});

$(document).on('click', '.link', function () {
    let cId = $(this).parent('div').attr('id');
    pagePost(cId);
});