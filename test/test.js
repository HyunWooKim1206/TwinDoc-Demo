//전역데이터 저장
let jsnData = {};
let reviews = {};
let reviewArray = [];

// 화면 구성
function setData() {
    $.when(
        // 데이터 불러오기
        $.getJSON('../json/predict_all_rev75prod85_with_demo.json', function (data) {
            jsnData = data;
        })
    ).then(function (data) {
        //제품번호 가져오기
        let prodNum = JSON.parse(localStorage.getItem('prodNum'));
        console.log(prodNum);

        //이미지, 제품명 가져오기
        let prodImg = data[prodNum].prodImg;
        let prodName = data[prodNum].prodName;
        let $img = "<img src = '" + prodImg + "'>" + prodName + "</button>"
        $("#prod").append($img);

        //keyphrase를 추출
        let content = data[prodNum].content;
        console.log(content, "content");
        
        let pageNum = 0;
        let numberOfReview = 0;

        //detail.html 시작에 보여줄 allReview
        $.each(content, function (keyPhrase, review) {
            $.each(review[1].sort(date_descending), function (i, prod) {
                numberOfReview++;
                if (numberOfReview % 10 == 0) {
                    pageNum++;
                    let $pageNum = $(`<button type="button" class="${pageNum}"><span>${pageNum}</span></button>`)
                    $('.reviewTab-paging').append($pageNum);
                }
                let $rv = $(`<div class = '${keyPhrase}'><div id='date'>${prod.rev_date}</div>${prod.comment}</div>'`);
                reviewArray.push($rv);
            });
            //$('#allReview').append(reviewArray);
        });

        function pageAlgo(total, bottomSize, listSize, cursor ){
            //total = 총 갯수
            //bottomSize = 하단크기
            //listSize = 화면에서 보여줄 크기
            //cursor = 현재 나의 페이지
        
            var totalPageSize = Math.ceil(total / listSize)  //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 
        
            var firstBottomNumber = cursor%bottomSize > 0 ? cursor - cursor % bottomSize + 1 : cursor - bottomSize + 1;  //하단 최초 숫자
            
            var lastBottomNumber = cursor%bottomSize > 0 ? cursor - cursor % bottomSize + bottomSize : firstBottomNumber + bottomSize - 1;  //하단 마지막 숫자
        
            if(lastBottomNumber > totalPageSize) lastBottomNumber = totalPageSize  //총 갯수보다 큰 경우 방지
        
            return {
                firstBottomNumber,
                lastBottomNumber,
                totalPageSize,
                total,
                bottomSize,
                listSize,
                cursor
            }
        };

        function displayPage(cur_page) {
            //280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
            var info = pageAlgo(280, 20, 10, cur_page);
            console.log(info);
            var pageHtml = '<br>';
            if ( info.firstBottomNumber > 1 )
            pageHtml += "<a href='#' id='" + (info.firstBottomNumber-1) + "' onclick='callPaging(this)'>이전</a><span> </span>";
            for(var i = info.firstBottomNumber ; i <= info.lastBottomNumber; i++){
                var s = i;
                if ( i == info.cursor ) s = '<span style="color:red">' + i + '</span>';
                pageHtml += "<a href='#' id='" + i + "' onclick='callPaging(this)'>" + s + "</a><span> </span>";
            }
            if ( info.lastBottomNumber < info.totalPageSize) 
            pageHtml += "<a href='#' id='" + (info.lastBottomNumber+1) + "' onclick='callPaging(this)'>다음</a><span> </span>";
            var pageobj = document.getElementById('div_page');
		    pageobj.innerHTML = pageHtml;
        }
        window.onload = function(){
            displayPage(1);
            console.log("test");
        }
        
        function callPaging(obj) {
            var cur_page = parseInt(obj.id);
            console.log(cur_page);
            displayPage(cur_page);
        }
        // $(document).on('click', 'button', function () {
        //     let page = $(this).attr('class');
        //     page = Number(page);
        //     console.log(page);
        //     $('#allReview').append(reviewArray.slice((page * 10) - 10, (page * 10) - 1));
        // })

        

        // $('#allReview').append(reviewArray.slice(30, 40));
        // reviewArray[0].forEach(value => {
        //     $('#allReview').append(reviewArray[pageNum]);
        // });

        //각각의 KeyPhrase에 해당하는 리뷰 추출
        $.each(content, function (keyPhrase, review) {
            //리뷰추출
            reviews[keyPhrase] = review[1];
            console.log(review[1]);

            //버튼 all, keyPhrase해당하는 만큼 버튼만들기
            let $button = "<button id = '" + keyPhrase + "'>" + review[0] + "</button>";
            $("#reviewAll").append($button);
        });

        //keyPhrase 클릭시 해당 리뷰 & 유사상품 출력
        $(document).on('click', 'button', function () {
            //review & allReview div 내용 삭제
            $('#review *').remove();
            $('#allReview *').remove();
            let btnID = $(this).attr('id');
            if (btnID != 'btnReviewAll') {
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
                            let highlight = comment.substring(0, idx[0]) + '<font color="red">' + comment.substring(idx[0], idx[1]) + '</font>' + comment.substring(idx[1]);
                            let $rv = $(`<div class = '${btnID}'><div id='date'>${rvDate.substring(0, 10).replace(/-/g, '')}</div>${highlight}</div>'`)
                            $('#review').append($rv);
                            console.log();
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
                            let $btnId = $(`<div class = '${btnID}'></div>`);
                            $btnId.append($(`<img src = '${similarProdImg[i]}'>`));
                            $btnId.append($(`<div id = '${btnID}'>${similarProdName[i]}</div>`));
                            $('#simProd').append($btnId)
                        }
                    }
                });
                //모달 form
                $(".modal").fadeIn();
                $(".modal").click(function () {
                    $(".modal").fadeOut();
                    $('#simProd *').remove();
                });
            } else {
                //모든 리뷰
                $.each(content, function (keyPhrase, review) {
                    $.each(review[1].sort(date_descending), function (i, prod) {
                        let $rv = $(`<div class = '${btnID}'><div id='date'>${prod.rev_date}</div>${prod.comment}</div>'`);
                        $('#allReview').append($rv);
                    })
                })
            }
        });
    });
};

//시간 순 정렬
function date_descending(a, b) {
    var dateA = new Date(a['rev_date']).getTime();
    var dateB = new Date(b['rev_date']).getTime();
    return dateA < dateB ? 1 : -1;
};


$(function () {
    setData();
});