let jsnData = {};
let reviews = {};
let similarProds = {};
// 화면 구성
function setData() {
    $.when(
        // 데이터 불러오기
        $.getJSON('../json/for_demo_75_85.json', function (data) {
            jsnData = data;
        })
    ).then(function (data) {
        let prodNum = JSON.parse(localStorage.getItem('prodNum'));
        console.log(prodNum);
        //content[0]불러와
        //불러온 애들의 keyphrase를 뽑아
        let content = data[prodNum].content;
        console.log(content);
        //keyPhrase에 해당하는 rv를 
        //버튼 all, keyPhrase해당하는 만큼 버튼만들기
        $.each(content, function (keyPhrase, review) {
            //리뷰추출
            reviews[keyPhrase] = review[1];
            console.log(review[1], "리뷰");
            //유사상품 추출
            similarProds[keyPhrase] = review[2];
            console.log(review[2], "유사상품");
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>"
            $("#reviewAll").append($button);
        });
    });
};

//해당 keyPhrase를 눌렀을때 review&유사상품 추출
$(document).on('click', 'button', function () {
    let bId = $(this).attr('id');
    console.log(bId);
    //리뷰 
    var rv = "";
    //유사상품
    var sp = "";
    // if (bId == 'btnReviewAll') {
    //     $.each(reviews, function (keyPhrase, review) {
    //         rv += JSON.stringify(review);
    //         rv += '<br>';
    //     })
    // } else {
    //     rv = JSON.stringify(reviews[bId]);
    //     sp = JSON.stringify(similarProds[bId]);
    // }
    $.each(reviews, function (key, review) {
        if (bId == 'btnReviewAll') {
            rv += JSON.stringify(review);
            rv += '<br>';
        }else{
            rv = JSON.stringify(reviews[bId]);
            sp = JSON.stringify(similarProds[bId]);
        }
    });
    $('#review').html(rv.replace(/["\{\}\[\]\\\/]/g, ""));
    $('#similar').html(sp.replace(/["\{\}\[\]\\\/]/g, ""));
});

$(function () {
    setData();
    // $('#prodNum').text(data.prodNum);
    // $('#content').text(data.content[data.btn]);
    // if(data.content.hasOwnProperty(data.btn)){
    //     $('#content').text(data.content[data.btn]);
    // } else {
    //     var rv = "";
    //     $.each(data.content, function(k, rev){
    //         if(k.indexOf('key') == -1){
    //             if(typeof rev === 'object'){
    //                 $.each(rev, function(user, rvw){
    //                     rv += user+' : '+rvw;
    //                     rv += '<br>';
    //                 })
    //             } else {
    //                 rv += rev;
    //                 rv += "<br>";
    //             }
    //             console.log(rv);
    //         }
    //     })
    //     $('#content').html(rv);
    // }

    // $('#goBack').on('click', function(){
    //     history.back();
    // })
});