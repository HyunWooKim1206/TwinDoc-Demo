$(document).on('click', 'button', function () {
    $(function () {
        if (keyPhrase == 'keyPhrase1') {
            let keyword = '설날에 같이'.split(' ');
            $.each(keyword, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase2') {
            let keyword2 = "금방 조리할 수 있어서".split(' ');
            $.each(keyword2, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase3') {
            let keyword3 = "엄마가 맛있다고 하시네요".split(' ');
            $.each(keyword3, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase4') {
            let keyword4 = "몸에 좋을 것 같아요".split(' ');
            $.each(keyword4, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase4') {
            let keyword5 = "몸에 좋은 것".split(' ');
            $.each(keyword5, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase5') {
            let keyword6 = "야들야들하고".split(' ');
            $.each(keyword6, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase6') {
            let keyword7 = "고기양이 넉넉 합니다".split(' ');
            $.each(keyword7, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase6') {
            let keyword8 = "고기양도 많고".split(' ');
            $.each(keyword8, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase7') {
            let keywor9 = "수삼 향이 퍼지면서 향이 좋았고".split(' ');
            $.each(keywor9, function (idx, key) {
                $('.rv').highlight(key);
            });
        }

        if (keyPhrase == 'keyPhrase7') {
            let keyword10 = "수삼이 있어서 향도 좋고".split(' ');
            $.each(keyword10, function (idx, key) {
                $('.rv').highlight(key);
            });
        }
    });
});