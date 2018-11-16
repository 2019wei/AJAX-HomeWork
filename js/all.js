//使用ready function來確保網頁資料已讀取完畢再執行推薦行程
$(document).ready(function () {
  //gotop
  $('#gotop').gotop({
    customHtml: '<i class="fas fa-angle-up"></i>',
    bottom: '2em',
    right: '2em'
  });
  //初始化ASO
  AOS.init({ once: true });
});

//JSON data
//使用AJAX下載資料
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
xhr.onload = function () {
  _data = JSON.parse(xhr.responseText);
  defalutData();
};

//Setting DOM
var selectArea = document.getElementById('selectArea');
var btnArea = document.getElementById('btnArea');
var listTitle = document.querySelector('#listTitle');
var list = document.querySelector('#list');

//參考target單元設置監聽事件
//change為觸發下拉選單事件
//click則是點擊事件
selectArea.addEventListener('change', selectList, false);
btnArea.addEventListener('click', btnList, false);

//function
function defalutData() {
  webData = arrayList('岡山區'); //預設初始行程
  selectDown();
  list.innerHTML = webData;
};

function selectList(e) {
  var selectTitle = e.target.value;
  listTitle.textContent = selectTitle;
  selectListData = arrayList(selectTitle);
  list.innerHTML = selectListData;
};

function btnList(e) {
  var btnTitle = e.target.value;
  listTitle.textContent = btnTitle;
  btnListData = arrayList(btnTitle);
  list.innerHTML = btnListData;
};

function arrayList(name) {
  arrayDataList = '';
  var data = _data.result.records;
  for (var i = 0; i < data.length; i++) {
    if (name == data[i].Zone) {
      arrayDataList += `
        <div class="col-md-6 py-2 px-1">
          <div class="card">
            <div class="card bg-dark text-white text-left">
              <img class="card-img-top bg-cover" height="155px" src="` + data[i].Picture1 + `">
              <div class="card-img-overlay d-flex justify-content-between align-items-end p-0 px-3" style="background-color: rgba(0, 0, 0, .2)">
                <h5 class="card-img-title-lg">` + data[i].Name + `</h5>
                <h5 class="card-img-title-sm">` + data[i].Zone + `</h5>
                </div>
              </div>
              <div class="card-body text-left">
                <p class="card-p-text">
                  <i class="far fa-clock fa-clock-time"></i>&nbsp;` + data[i].Opentime + `</p>
                <p class="card-p-text">
                <i class="fas fa-map-marker-alt fa-map-gps"></i>&nbsp;` + data[i].Add + `</p>
              <div class="d-flex justify-content-between align-items-end">
                  <p class="card-p-text">
                  <i class="fas fa-mobile-alt fa-mobile"></i>&nbsp;` + data[i].Tel + `</p>
                  <p class="card-p-text"><i class="fas fa-tags text-warning"></i>&nbsp;` + data[i].Ticketinfo + `</p>
              </div>
            </div>
          </div>
        </div>`;
    };
  };
  return arrayDataList;
};
function selectDown() {
  var areaList = [];
  var data = _data.result.records;
  for (var i = 0; i < data.length; i++) {
    areaList.push(data[i].Zone);
  };

  var Zone = [];
  areaList.forEach(function (value) {
    if (Zone.indexOf(value) == -1) {
      Zone.push(value);
    }
  });
  var str = '';
  for (var i = 0; i < Zone.length; i++) {
    str += `<option value="` + Zone[i] + `">` + Zone[i] + `</option>`; //因為是陣列所以要用迴圈方式取得
  }
  selectArea.innerHTML = str;
}



