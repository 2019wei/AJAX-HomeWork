//DOM
var bmiBtnID = document.querySelector('#btn-bmi')
var bmiList = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('listBmiData')) || [];

//監控
bmiBtnID.addEventListener('click', addData, false);
bmiList.addEventListener('click', toggleDone);

//監聽與更新
updataList(data);

//加入BMI
function addData(e) {
    e.preventDefault();
    var cmId = parseInt(document.getElementById('cm').value);
    var kgId = parseInt(document.getElementById('kg').value);
    var bmis = kgId / ((cmId / 100) * (cmId / 100));
    var bmi = bmis.toFixed(2);
    var status = '';
    if (bmi <= 14.9) {
        status = '你厭食症了吧?';
    } else if (bmi >= 15& bmi < 15.9) {
        status = '小心BMI太低囉';
    } else if (bmi >= 16 && bmi < 18.4) {
        status = '過輕';
    } else if (bmi >= 18.5 & bmi <= 24.9) {
        status = '理想';
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = '過重';
    } else if (bmi >= 30 && bmi <= 34.9) {
        status = "中等肥胖";
    } else if (bmi >= 35 && bmi <= 39.9) {
        status = "嚴重肥胖";
    } else if (bmi >= 40) {
        status = "肥死你";
    };

    var todo = {
        height: cmId,
        weight: kgId,
        bmi: bmi,
        status: status
    }

    data.push(todo);
    updataList(data);
    localStorage.setItem('listBmiData', JSON.stringify(data));
}

//更新網頁內容
function updataList(data) {
    str = '';
    var len = data.length;
    for (var i = 0; i < len; i++) {
        str += '<li class=text-center ' + 123 + '>';
        str += '<span>' + data[i].status + '</span>';
        str += '<span><span>BMI</span> ' + data[i].bmi + '</span>';
        str += '<span><span>height</span> ' + data[i].weight + ' kg </span>';
        str += '<span><span>weight</span> ' + data[i].height + ' cm </span>';
        str += '<a href="#" data-index=' + i + ' />刪除</a>';
        str += '</li>';
    }
    bmiList.innerHTML = str;
}
//刪除BMI
function toggleDone(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return };
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('listBmiData', JSON.stringify(data));
    updataList(data);
}
