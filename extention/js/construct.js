/*
	structure
	1 #kly-adons-main-wrapper
		1.1 #kly-adons-open
			1.1.1 #img dolphin

		1.2 .header
			1.2.1 h1 title
			1.2.2 input --> search
			1.2.3 #kly-adons-minimize

		1.3 body
			1.3.1 kly-adons-data
				1.3.1.1 .list
				1.3.1.2 .scroll-down
					i fas fa angle
			1.3.2 kly-adons-date-selected

		1.4 footer
			1.4.1 dmp-tracker-status
				1.4.1.1 success
				1.4.1.2 error
			1.4.2 dmp-wrapper
				1.4.2.1 kly-adons-copy
				1.4.2.2 kly-adons-apply


				*/

// #1 
// create main wrapper 
var _mainWrapper = document.createElement("div");
_mainWrapper.setAttribute("id", "kly-adons-main-wrapper");
_mainWrapper.setAttribute("class", "t5");

//inject main wrapper 
if (!document.getElementById("kly-adons-main-wrapper")) {
	document.body.appendChild(_mainWrapper);
}

// #1.1 
// create open button 
var _openBtn = document.createElement("div");
_openBtn.setAttribute("id", "kly-adons-open");
// append button to mai warapper
_mainWrapper.appendChild(_openBtn);

//#1.1.1
// crate img open button
var _imgOpen = document.createElement("img");
_imgOpen.setAttribute("src", chrome.runtime.getURL("img/icon.png"));
_openBtn.appendChild(_imgOpen);

//#1.2
// create header section for popup
var _header = document.createElement("div");
_header.setAttribute("class", "header");
// append to main wrapper 
_mainWrapper.appendChild(_header);

//#1.2.1
//crate title header
var _title = document.createElement("h1");
_title.setAttribute("class", "title");
_title.textContent = "DMP ";
_header.appendChild(_title);

//create title span
var _titleSpan = document.createElement("span");
_titleSpan.textContent = "Tracker";
_title.appendChild(_titleSpan);

//#1.2.2
// create search 
var _search = document.createElement("input");
_search.setAttribute("type", "text");
_search.setAttribute("id", "kly-adons-search");
_search.setAttribute("class", "search");
_search.setAttribute("placeholder", "search....");
_header.appendChild(_search);

//#1.2.3
// create minimize button on header 
var _minimize = document.createElement("div");
_minimize.setAttribute("id", "kly-adons-minimize");
_header.appendChild(_minimize);
// create icon minimize
var _closeX = document.createElement("i");
_closeX.setAttribute("class", "fas fa-times");
_minimize.appendChild(_closeX);

//#1.3
// create body container popup
var _body = document.createElement("div");
_body.setAttribute("id", "kly-adons-body-content");
_body.setAttribute("class", "body");
_mainWrapper.appendChild(_body);

//1.3.1
// create list wrapper
var _fetchDtaWrapper = document.createElement("div");
_fetchDtaWrapper.setAttribute("id", "kly-adons-data");
_body.appendChild(_fetchDtaWrapper);

//#1.3.1.1
// create list container
var _listData = document.createElement("ul");
_listData.setAttribute("class", "list");
_fetchDtaWrapper.appendChild(_listData);

//1.3.1.2
// create scroll sign , animate up down
var _scroll = document.createElement("div");
_scroll.setAttribute("class", "scroll-down");
_scroll.textContent = "scroll ";
_fetchDtaWrapper.appendChild(_scroll);
//create scroll arror icon
var _scrollArrow = document.createElement("i");
_scrollArrow.setAttribute("class", "fas fa-angle-double-right");
_scroll.appendChild(_scrollArrow);

//#1.3.2
// create selected data container
var _selectedData = document.createElement("div");
_selectedData.setAttribute("id", "kly-adons-data-selected");
_body.appendChild(_selectedData);

//#1.4
// create footer
var _footer = document.createElement("div");
_footer.setAttribute("class", "footer");
_mainWrapper.appendChild(_footer);

//#1.4.1
// create msg wrapper
var _dmpMsg = document.createElement("div");
_dmpMsg.setAttribute("id", "dmp-tracker-status");
_footer.appendChild(_dmpMsg);

//#1.4.1.1
//success 
var _success = document.createElement("span");
_success.setAttribute("class", "success");
_success.innerHTML = `<p>dmp trakcer found, all is well</p> 👍`;
_footer.appendChild(_success);

//#1.4.1.2
// error
var _error = document.createElement("span");
_error.setAttribute("class", "error");
_error.innerHTML = `<p>dmp trakcer not found</p> 😪`;
_footer.appendChild(_error);

//#1.4.2
// button wrapper
var _btnWrapperFooter = document.createElement("div");
_btnWrapperFooter.setAttribute("class", "button-wrapper");
_footer.appendChild(_btnWrapperFooter);

//#1.4.2.1
// btn copy text
