const _mainWrapper = document.getElementById("kly-adons-main-wrapper");
const _overlayWrapper = document.getElementById("kly-adons-overlay");
const _klySearchAdons = document.getElementById("kly-adons-search");
const _klyMinimizeAdons = document.getElementById("kly-adons-minimize");
const _klyOpenAdons = document.getElementById("kly-adons-open");
const _klyApplyButton = document.getElementById("kly-adons-apply");
const _klyToastWrapper = document.getElementById("kly-adons-toast");
const _klyAdonsBodyContent = document.getElementById("kly-adons-body-content");
const _klyAdonsFooterMsg = document.getElementById("dmp-tracker-status");


const _klyAdonsDataWrapper = document.getElementById("kly-adons-data");
const _klyAdonsDataSelectedWrapper = document.getElementById("kly-adons-data-selected");


//
var _klyAdonsSelectedArray = [];
var _klyAdonsListjsData = null;

_bootExt();

function _bootExt() {
    _fetchData();
    _klyOpenAdons.addEventListener("click", _openPopupExt);
    _klyMinimizeAdons.addEventListener("click", _minimizePopupExt);
    _overlayWrapper.addEventListener("click", _minimizePopupExt);

    _klyApplyButton.addEventListener("click", _klyApplyEvent);
    _klyAdonsDataSelectedWrapper.addEventListener("mouseover", _klyAdonsClearSearch);
}

function _klyAdonsClearSearch() {
    //_klySearchAdons.value = "";
    _klyAdonsListjsData.search('');
}

function _openPopupExt() {
    _mainWrapper.classList.add("active");
    _mainWrapper.classList.remove("remove");
    _overlayWrapper.classList.add("active");
    _overlayWrapper.classList.remove("remove");
    _klyApplyButton.disabled = false;

    // _klyAdonsInputCheck();

    //normalize button 

    // _klySearchAdons.focus();
}

function _minimizePopupExt() {
    _mainWrapper.classList.add("remove")
    _mainWrapper.classList.remove("active")
    _overlayWrapper.classList.remove("active");
    _overlayWrapper.classList.add("remove");
}

function _klyAdonsOpenToast() {
    _klyToastWrapper.classList.add("active");
    setTimeout(() => {
        _klyAdonsCloseToast();
        _minimizePopupExt();
    }, 3000);
}

function _klyAdonsCloseToast() {
    _klyToastWrapper.classList.remove("active");
}

function _klyApplyEvent() {
    _klyAdonsOpenToast();
}

function _fetchData() {
    fetch("https://www.newshub.id/api/category-management/&token=06c0cb9bc610871859140e9c1c04808c&limit=1000")
    .then(res => res.json())
    .then(res => {
        res.data.map(dmp => {
            _klyAdonsGenerateItem(dmp);

        });
    })
    .then(()=>{
        var options = {
            valueNames: [ 'kly-adons-item','pixel-id' ]
          };
          
          // Init list
          _klyAdonsListjsData = new List('kly-adons-main-wrapper', options);
          
    })
    .catch((err) =>{
        console.log(err)
    })
}

function _klyAdonsGenerateItem(item) {

    var _parentName = (item.parent == "") ? "no parent" : item.parent;
    var _li = document.createElement("li");
    _li.setAttribute("class", "kly-adons-li");

    var _span = document.createElement("span");
    _span.setAttribute("class", "kly-adons-item");
    _span.setAttribute("id", `kly-adons-item-${item.id}`);
    _span.setAttribute("title", `${_parentName.toString().toLowerCase()}`);
    _span.setAttribute("data-item-name", `${item.category_code}`);
    _span.setAttribute("data-item-pixelid", `${(item.pixel_id == null) ? "no pixel id" :item.pixel_id }`);

    _span.textContent = item.category_code;
    _span.addEventListener("click", _klyAdonsSelectItem);
    _li.appendChild(_span);


    var _div = document.createElement("div");
    _div.setAttribute("class", "pixel-id");
    _div.textContent = (item.pixel_id == null) ? "no pixel id" :item.pixel_id ;
    _span.appendChild(_div);

    _klyAdonsDataWrapper.querySelector(".list").appendChild(_li);
}

function _klyAdonsSelectItem() {

    this.classList.add("selected");
    var _name = this.getAttribute("data-item-name");

    _klyAdonsSelectedArray.push(_name);
    
    _klyCeckSelectedArray();

    var _span = document.createElement("span");
    _span.setAttribute("class", "kly-adons-item");
    _span.setAttribute("id", `${this.getAttribute("id")}`);
    _span.setAttribute("title", `${this.getAttribute("title").toString().toLowerCase()}`);
    _span.setAttribute("data-item-name", `${this.getAttribute("data-item-name")}`);
    
    _span.addEventListener("click", _klyAdonsRemoveSelectedItem);
    _span.textContent = this.getAttribute("data-item-name");

    var _div = document.createElement("div");
    _div.setAttribute("class", "pixel-id");
    _div.textContent = this.getAttribute("data-item-pixelid");
    _span.appendChild(_div);

    _klyAdonsDataSelectedWrapper.appendChild(_span);
    
}

function _klyAdonsRemoveSelectedItem() {
    var _index =  _klyAdonsSelectedArray.indexOf(this.textContent);
    _klyAdonsSelectedArray.splice(_index, 1);
    
    var _id = this.getAttribute("id");
    _klyAdonsDataWrapper.querySelector(`.list li #${_id}`).classList.remove("selected");

    this.remove();

    _klyCeckSelectedArray();

}

function _klyCeckSelectedArray() {
    if(_klyAdonsSelectedArray.length == 0){
        _klyAdonsBodyContent.classList.remove("active");
    }else{
        _klyAdonsBodyContent.classList.add("active");
    }
}

//input check

// check dmp tracker field
function _klyAdonsCheckDmpFieldTracker() {
    var _target = null;
    var _x  = document.querySelectorAll(".tab-content .field-label")
    _x.forEach(function(el, i){
        
        el.querySelectorAll("span").forEach(function (_el, _i) {
            
            if (_el.textContent == "DMP Category") {
                _target = el;
            }

        })

    })

    return _target;

}

//get value
function _klyAdonsGetTargetField() {
    var _tarEl = _klyAdonsCheckDmpFieldTracker();
    var _parentSibling = _tarEl.parentElement.parentElement.nextElementSibling;
    var _value = (_parentSibling.querySelector("input")) ? _parentSibling.querySelector("input").value : _parentSibling.querySelector(".CodeMirror .CodeMirror-line span").textContent;

    return _value;
}

function _klyAdonsSetTargetField(value) {
    var _tarEl = _klyAdonsCheckDmpFieldTracker();
    var _parentSibling = _tarEl.parentElement.parentElement.nextElementSibling;

    if (_parentSibling.querySelector("input")) {
        _parentSibling.querySelector("input").value = value;
    }else{
        _parentSibling.querySelector(".CodeMirror .CodeMirror-line span").textContent = value;
    }
}


function _klyAdonsInputCheck() {
    var _check = Boolean(_klyAdonsCheckDmpFieldTracker());
    _klyAdonsFooterMsg.querySelector(".success").classList.remove("active");
    _klyAdonsFooterMsg.querySelector(".error").classList.remove("active");

    if(_check){
        //msg true
        _klyAdonsFooterMsg.querySelector(".success").classList.add("active");
    }else{
        //msg false
        _klyAdonsFooterMsg.querySelector(".error").classList.add("active");
        _klyApplyButton.disabled = true;

    }
}
