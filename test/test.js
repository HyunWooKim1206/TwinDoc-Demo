var jsnData = {};
var btnList = ["all","keyPhrase1","keyPhrase2"];

function setData(){
    // 데이터 불러오기
    $.getJSON('test.json', function(data){
        var prods = Object.keys(data);
        jsnData = data;

        $.each(prods, function(idx, prod){
            var $tr = $("<tr>", {});
            var $td = $("<td>", {});
            var $div = $("<div>", {});
            $div.append("<div>"+prod+"</div>");
            
            $.each(btnList, function(i, btnClass){
                var btn = '<button class="btn '+prod+' '+btnClass+'">'+btnClass+'</button>';
                $div.append(btn);
            });
            $td.append($div);
            $tr.append($td);
            $("#tb").append($tr);
        });
    });
};

$(document).ready(function(){
    //데이터 세팅
    setData();
});

$(document).on('click', "#tb button", function(){
    var btnClss = $(this).attr('class').replace("btn ", "").split(' ');
    var prod = btnClss[0], btn = btnClss[1];
    console.log(prod);
    console.log(btn);
    console.log(jsnData);
    var sendData = {};
    var content = jsnData[prod].content[0];
    sendData.prod = prod;
    sendData.btn = btn;
    sendData.prodNum = jsnData[prod].prodNum;
    sendData.content = content;

    console.log(sendData);
});