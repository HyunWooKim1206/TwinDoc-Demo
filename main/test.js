function pagePost(param) {
    localStorage.setItem("prodNum", JSON.stringify(param));
    location.href = 'detail.html';
};

function getProdNum() {
    $.when(
        $.getJSON('../json/test.json', function (data) {
            jsonData = data;
        })
    ).then(function (data) {
        $.each(data, function (idx, product) {
            let Num = product.prodNum;
            let Img = product.prodImg;
            console.log(Num);
            let $div = "<div id='" + Num + "'><a class='link'><img src='" + Img + "'>" + Num + "</a></div>";
            console.log($div);
            $("#product-review").append($div);
        });
    });
};

$(function () {
    getProdNum();
    
});

$(document).on('click', '.link', function(){
    let cId = $(this).parent('div').attr('id');
    pagePost(cId);
});