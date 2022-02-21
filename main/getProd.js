function pagePost(param) {
    localStorage.setItem("prodNum", JSON.stringify(param));
    location.href = 'detail.html';
};

function getProd() {
    $.when(
        $.getJSON('../json/test.json', function (data) {
            jsonData = data;
        })
    ).then(function (data) {
        $.each(data, function (idx, product) {
            let prodNum = product.prodNum;
            let prodImg = product.prodImg;
            let prodName = product.prodName;
            console.log(Num);
            console.log(Name);
            let $div = "<div id='" + prodNum + "'><a class='link'><img src='" + prodImg + "'>" + prodName + "</a></div>";
            console.log($div);
            $("#product-review").append($div);
        });
    });
};

$(function () {
    getProd();
});

$(document).on('click', '.link', function(){
    let cId = $(this).parent('div').attr('id');
    pagePost(cId);
});