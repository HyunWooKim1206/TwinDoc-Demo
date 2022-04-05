function pagePost(param) {
    localStorage.setItem("prodNum", JSON.stringify(param));
    location.href = 'detail2.html';
};

function getProd() {
    $.when(
        $.getJSON('../json/predict_all_rev75prod85_with_demo.json', function (data) {
            jsonData = data;
        })
    ).then(function (data) {
        $.each(data, function (idx, product) {
            let prodNum = product.prodNum;
            let prodImg = product.prodImg;
            let prodName = product.prodName;
            let prodPrice = product.prodPrice;
            console.log(product);
            console.log(prodName, prodNum, prodPrice);
            //home.html에 상품 갯수에 맞게 추가
            let $div =
                "<li id='" +
                prodNum +
                "'><a class='link'><div><img src='" +
                prodImg +
                "'></div> " +
                "<div class='product-info'><p class='title'> " +
                prodName +
                "</p><p class='price'><strong>" + prodPrice + "</strong></p><div class='star-rating'><span class='star'>★★★★</span>★<span class='count'>(99)</span></div></div>";

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