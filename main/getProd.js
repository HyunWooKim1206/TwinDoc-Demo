function pagePost(param) {
    localStorage.setItem("prodNum", JSON.stringify(param));
    location.href = 'detail.html';
};

function getProd() {
    $.when(
        $.getJSON('../json/10Prod.json', function (data) {
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
    let cId = $(this).parent('div').attr('id');
    pagePost(cId);
});