var jsnData = {};
var reviews = {};
// var btnList = ["all","keyPhrase1","keyPhrase2"];

// 화면 구성
function setData() {
    $.when(
        // 데이터 불러오기
        $.getJSON('../json/reviews.json', function (data) {
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
            console.log(review[1]);
            //유사상품 추출
            console.log(review[2]);
            reviews[keyPhrase] = review[1];
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>"
            $("#reviewAll").append($button);
        });
    });
};

//해당 keyPhrase를 눌렀을때 review 추출
$(document).on('click','button', function () {
    let bId = $(this).attr('id');
    console.log(bId);
    let rv = "";
    if(bId == 'btnReviewAll'){
        $.each(reviews, function(keyPhrase, review){
            rv += JSON.stringify(review);
        })
    } else {
        rv = JSON.stringify(reviews[bId]);
    }
    $('#review').text(rv);
});


//toggle기능
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


// $(document).on('click', "#tb button", function () {
//     var btnClss = $(this).attr('class').replace("btn ", "").split(' ');
//     var prod = btnClss[0], btn = btnClss[1];
//     console.log(prod);
//     console.log(btn);
//     console.log(jsnData);
//     var sendData = {};
//     var content = jsnData[prod].content[0];
//     sendData.prod = prod;
//     sendData.btn = btn;
//     sendData.prodNum = jsnData[prod].prodNum;
//     sendData.content = content;

//     console.log(sendData);

//     pagePost(sendData);
// });