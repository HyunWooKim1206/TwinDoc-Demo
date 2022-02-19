// // fetch('./test.json')
// //   .then(response => response.json())
// //   .then(data => console.log(data))
// //   .then(data => displayItems(data))
// //   .catch(error => console.log(error));
document.getElementById('button1').addEventListener('click', loadreview1);
document.getElementById('button2').addEventListener('click', loadreview2);

// 로드 Review1
function loadreview1(e) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', './json/test.json', true);

    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.responseText);

            const review = JSON.parse(this.responseText);
            const output = `
        <ul>
          <li>키워드: <h3>${review.prod1.content[0].keyPhrase1}</h3></li>
          <li>리뷰: ${JSON.stringify(review.prod1.content[0].rv1)}</li>
        </ul>
      `;
            document.getElementById('review1').innerHTML = output;
        }
    }
    xhr.send();
}


// 로드 Review2
function loadreview2(e) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', './json/test.json', true);

    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.responseText);

            const review = JSON.parse(this.responseText);

            const output = `
          <ul>
            <li>키워드: <h3>${review.prod2.content[0].keyPhrase1}</h3></li>
            <li>리뷰: ${JSON.stringify(review.prod2.content[0].rv1)}</li>
          </ul>
        `;

            document.getElementById('review2').innerHTML = output;
        }
    }
    xhr.send();
}