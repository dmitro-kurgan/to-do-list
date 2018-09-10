import '../components/scss/style.scss';

var i;

//GET LIST AND FORM LOCAL DATA
var todoList = document.getElementById('list'),
todoPanel = document.getElementById('panel');

var todos, todos2;

//LOCAL LIST FUNCTION
function toLocal() {
	todos = todoList.innerHTML;
	localStorage.setItem('todos', todos);
}

//LOCAL FORM FUNCTION
function toLocal2() {
	todos2 = todoPanel.innerHTML;
	localStorage.setItem('todos2', todos2);
}

//CHECK ITEMS ON THE PAGE
function checkItems() {
	var li = document.getElementsByTagName('LI')[0];
	if (!document.body.contains(li)) {
		var list = document.getElementById('list');
		var div = document.createElement('div');
		div.innerHTML = "Задач нет. Добавьте новую задачу!";
		div.classList.add('toto__alert');
		div.setAttribute('id', 'todoAlert');
		list.appendChild(div);
	}
}checkItems();

//CHECK BLOCK HEIGHT
function checkBlockHeight() {
	var block = document.getElementById('list')
	if (block.offsetHeight < 200) {
		block.style.overflowY = "hidden";
	} else {
		block.style.overflowY = "scroll";
	}
	if (document.getElementsByTagName('LI')) {
		var li = document.getElementsByTagName('LI');
		if (li.length > 1) {
			document.getElementById('list').style.overflowY = "scroll";
		}
		for (i=0;i < li.length;i++) {
			li[i].style.display = "block";
		}
	}
}

//CHANGE VALUES OF EXISTING TASK
function changeTask(event) {
	//HIDE/SHOW CONTROL PANEL
	if(form.style.display !== "block") {
		form.style.display = "block";
		panel.style.display = 'none';
	}
	//CREATE CHANGE BUTTON
	if(!document.getElementById('chgTask')) {
		var chgTask = document.createElement('a');
		function setAttributes(el, attrs) {
		  for(var key in attrs) {
		    el.setAttribute(key, attrs[key]);
		  }
		}
		setAttributes(chgTask, {"href": "#", "id": "chgTask"});
		chgTask.innerHTML = 'Save changes';

		form.insertBefore(chgTask, form.children[4]);
	}
	else if(document.getElementById('saveTask')) {
		document.getElementById('saveTask').remove();
	}
	//GET VALUES FROM FORM
	var item = this.parentNode.parentNode;
	var t = this.parentNode.parentNode.getElementsByClassName('todo__title')[0],
	tc = t.textContent,
	title = document.getElementById('addTitle');
	title.value = tc;
	var n = this.parentNode.parentNode.getElementsByClassName('todo__name')[0].querySelector('p'),
	nc = n.textContent,
	name = document.getElementById('addName');
	name.value = nc;
	var p = this.parentNode.parentNode.getElementsByClassName('todo__priority')[0].querySelector('p'),
	pc = p.textContent,
	prio = document.getElementById('addPriority');
	prio.value = pc;
	var d = this.parentNode.parentNode.getElementsByClassName('todo__desc')[0],
	dc = d.textContent,
	desc = document.getElementById('addDescription');
	desc.value = dc;
	//CHECK FORM
	document.getElementById('chgTask').addEventListener('click', function() {
		if(title.value == '' || name.value == '' || desc.value == '') {
			alert('Заполнены не все поля!');
		}
		else {
			panel.style.display = 'flex';
			form.style.display = "none";
			//ADD NEW OPTION IN SELECT
			var li = document.getElementsByTagName('LI');
			const arrLi = [...li].map((li) => li.children[1].children[0].textContent.toLowerCase());
			if (!arrLi.includes(name.value.toLowerCase())) {
				var option = document.createElement('option');
				option.setAttribute('value', name.value);
				option.setAttribute('id', name.value.replace(/\s/g, '').toLowerCase());
				option.innerHTML = name.value;
				document.getElementById('selectTask').appendChild(option);
			}	
			//CHANGE TASK
			var arr = ['title', 'name', 'prio', 'desc'];
			for(i=0;i<arr.length;i++) {
				var x = arr[i].substring(0,1)
				var y = eval("(" + x + ")") ;
				var o = eval("(" + arr[i] + ")");
				y.innerHTML = o.value;
			}
			//REMOVE OPTION FROM SELECT
			var id = nc.replace(/\s/g, '').toLowerCase();
			var li = document.getElementsByTagName('LI');
			const arrLi2 = [...li].map((li) => li.children[1].children[0].textContent.replace(/\s/g, '').toLowerCase());
			if (!arrLi2.includes(id)) {
				document.getElementById(id).remove();
			}
			//HIDE/SHOW NOT ACTIVE TASKS
			var selectValue = document.getElementById('selectTask').value;
			if (selectValue !== "Все") {
				if (name.value !== selectValue) {
					item.setAttribute('style', 'display: none');
				}
			}
			//REMOVE CHANGE BUTTON
			if (document.getElementById('chgTask')) {
				document.getElementById('chgTask').remove();
			}
		};
		//CHECK IF CHECKBOX IS CHECKED WHILE REPLACING VALUES IN TASK
		if (document.getElementById('SetPriority').checked == true) {
			sortList();
		}
		toLocal();
		toLocal2();
	});	
};

//DEL LI ITEM
function delItem(event) {
	event.preventDefault();
	var elem = this.parentNode.parentNode;
	var name = this.parentNode.parentNode.children[1].children[0].textContent.toLowerCase();
	elem.remove();
	//REMOVE OPTION FROM SELECT
	var li = document.getElementsByTagName('LI');
	const arrList = [...li].map((li) => li.children[1].children[0].textContent.toLowerCase());
	if (!arrList.includes(name)) {
		var id = name.replace(/\s/g, '');
		document.getElementById(id).remove();
	}
	checkBlockHeight();
	checkItems();
	toLocal();
	toLocal2();
}

//HIDE/SHOW DESCRIPTION
function showHideDescription(event) {
	event.preventDefault();
	var elem = this.parentNode.previousElementSibling;
	if (elem.style.display == 'none') {
		elem.style.display = 'block';
	} else {
		elem.style.display = 'none';
	}
}

//OPEN ADDING TASK FORM
function addTask(event) {
	event.preventDefault();
	var array = ['Title', 'Name', 'Description'];
	for (i=0;i < array.length;i++) {
		document.getElementById('add' + array[i]).value = '';
	}
	if(form.style.display == "block") {
		form.style.display = "none";
	} else {
		panel.style.display = 'none';
		form.style.display = "block";
		var add = document.createElement('a');
		function setAttributes(el, attrs) {
		  for(var key in attrs) {
		    el.setAttribute(key, attrs[key]);
		  }
		}
		setAttributes(add, {"href": "#", "id": "saveTask"});
		add.innerHTML = 'Save changes';
		form.insertBefore(add, form.children[4]);
	}
	document.getElementById('saveTask').addEventListener('click', saveTask);
}

//CANCEL ADDING TASK AND CLOSE FORM
function cancelTask(event) {
	event.preventDefault();
	panel.style.display = 'flex';
	form.style.display = "none";
	if(document.getElementById('saveTask')) {
		document.getElementById('saveTask').remove();
	}
	else if(document.getElementById('chgTask')) {
		document.getElementById('chgTask').remove();
	}
}

//ADD AND SAVE NEW TASK TO LIST FUNCTION
function saveTask(event) {
	event.preventDefault();
	//GET VALUE FROM NEW TASK FORN
	var titleValue = document.getElementById('addTitle').value,
	nameValue = document.getElementById('addName').value,
	prioValue = document.getElementById('addPriority').value,
	descValue = document.getElementById('addDescription').value;
	//CREATE NEW TASK ELEMENTS
	//CREATE LI ITEM
	var li = document.createElement('li');
	li.classList.add('todo__item');
	//CREATE TITLE
	var title = document.createElement('h3');
	title.classList.add('todo__title');
	title.innerHTML = titleValue;
	//CREATE NAME
	var name = document.createElement('span');
	name.classList.add('todo__name');
	name.innerHTML = 'Проект: <p>' + nameValue + '</p>';
	//CREATE PRIORITY
	var priority = document.createElement('span');
	priority.classList.add('todo__priority');
	priority.innerHTML = 'Priority: <p>' + prioValue +'</p>';
	//CREATE DESCRIPTION
	var desc = document.createElement('p');
	desc.className = 'todo__desc';
	desc.innerHTML = descValue;
	desc.style.display = "none";
	//CREATE BUTTONS PANEL
	var btns = document.createElement('div');
	btns.classList.add("todo__btns");
	var btnChange = document.createElement('a');
	btnChange.classList.add("todo__btn", "todo__btn--change");
	btnChange.innerHTML = "Изменить";
	btnChange.onclick = changeTask;
	var btnClose = document.createElement('a');
	btnClose.classList.add("todo__btn", "todo__btn--close");
	btnClose.innerHTML = "Закрыть";
	btnClose.onclick = delItem;
	var btnToggle = document.createElement('a');
	btnToggle.classList.add("todo__btn", "todo__btn--toggle");
	btnToggle.innerHTML = "Развернуть";
	btnToggle.onclick = showHideDescription;
	var arrBtn = [btnChange, btnClose, btnToggle];
	for(var i = 0; i < arrBtn.length; i++) {
		arrBtn[i].setAttribute('href', '#');
		btns.appendChild(arrBtn[i])
	}
	//CHECK FORM
	if (descValue == '' || nameValue == '' || titleValue == '') {
		alert('Заполнены не все поля!');
	} else {
		panel.style.display = 'flex';
		form.style.display = "none";
		//ADD NEW OPTION IN SELECT
		var elem = document.getElementsByTagName('LI');
		const arrElem = [...elem].map((elem) => elem.children[1].children[0].textContent.toLowerCase());
		if (!arrElem.includes(nameValue.toLowerCase())) {
			var option = document.createElement('option');
			option.setAttribute('value', nameValue);
			option.setAttribute('id', nameValue.replace(/\s/g, '').toLowerCase());
			option.innerHTML = nameValue;
			document.getElementById('selectTask').appendChild(option);
		}
		//ADD ELEMENT
		var item = document.getElementById('list').appendChild(li),
		selectValue = document.getElementById('selectTask').value,
		count = localStorage.on_load_counter || 0;
		item.setAttribute('data', localStorage.on_load_counter = ++count);
		if (selectValue !== "Все") {
			if (nameValue !== selectValue) {
				item.setAttribute('style', 'display: none');
			}
		}
		var arrEl = [title, name, priority, desc, btns];
		for (i = 0; i < arrEl.length; i++) {
			item.appendChild(arrEl[i]);
		}
		if (document.getElementById('todoAlert')) {
			document.getElementById('todoAlert').remove();
		}
		document.getElementById('saveTask').remove();
	}
	if (document.getElementById('SetPriority').checked == true) {
		sortList();
	}
	checkBlockHeight();
	toLocal();
	toLocal2();
}

//SORTING LIST FUNCTION
function sortList() {
	var list, switching, li, one, sec, shouldSwitch
	list = document.getElementById('list');
	switching = true;
	function shouldSwitchFunc() {
		li[i].parentNode.insertBefore(li[i + 1], li[i]);
		switching = true;
	}
	if(document.getElementById('SetPriority').checked == true) {
		while (switching) {
			switching = false;
			li = list.getElementsByTagName('LI');
			for (i = 0; i < (li.length - 1); i++) {
				shouldSwitch = false;
				one = li[i].getElementsByClassName('todo__priority')[0].children[0].innerHTML;
				sec = li[i + 1].getElementsByClassName('todo__priority')[0].children[0].innerHTML;
				if (Number(one) > Number(sec)) {
					shouldSwitch = true;
					break;
				}
			}
			if (shouldSwitch) {
				shouldSwitchFunc();
			}
		}
	}
	else {
		while (switching) {
			switching = false;
			li = list.getElementsByTagName('LI');
			for (i = 0; i < (li.length - 1); i++) {
				shouldSwitch = false;
				one = li[i].getAttribute('data');
				sec = li[i + 1].getAttribute('data');
				if (Number(one) > Number(sec)) {
					shouldSwitch = true;
					break;
				}
			}
			if (shouldSwitch) {
				shouldSwitchFunc();
			}
		}
	}
}

//FILTER TASKS BY NAME
function filterList() {
	var selectValue = document.getElementById('selectTask').value,
	item = document.getElementsByTagName('LI');
	for (i = 0;i < item.length;i++) {
		var txt = item[i].children[1].children[0].innerHTML;
		if (selectValue == "Все") {
			item[i].style.display = "block";
		} else if (txt.toLowerCase() !== selectValue.toLowerCase()) {
			item[i].style.display = "none";
		} else {
			item[i].style.display = "block";	
		}
	}
	if (todoList.offsetHeight < 200) {
		todoList.style.overflowY = "hidden";
	} else {
		todoList.style.overflowY = "scroll";
	}
}

//TO LOCAL STORAGE
if(localStorage.getItem('todos')) {
	// localStorage.clear();
	todoList.innerHTML = localStorage.getItem('todos');
}

if(localStorage.getItem('todos2')) {
	// localStorage.clear();
	todoPanel.innerHTML = localStorage.getItem('todos2');
}

//EVENTS ON ADD TASK CANCEL ADD TASK BUTTONS
document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('cancelTask').addEventListener('click', cancelTask);

//EVENTS ON CHECKBOX AND SELECT
document.getElementById('SetPriority').onclick = sortList;
document.getElementById('selectTask').onclick = filterList;

//GET CONTROL PANELS WITH FORM
var panel = document.querySelector('.todo__panel'),
form = document.querySelector('.todo__add');

checkBlockHeight();

//CHANGE BUTTONS IN THE TASKS
var changeBtns = document.getElementsByClassName('todo__btn--change');
for (i = 0;i < changeBtns.length;i++) {
	changeBtns[i].addEventListener('click', changeTask);
}
//CLOSE BUTTONS IN THE TASKS
var del = document.getElementsByClassName('todo__btn--close');
for (i = 0;i < del.length;i++) {
	del[i].addEventListener('click', delItem);
}
//TOGGLE BUTTONS IN THE TASKS
var toggleBtns = document.getElementsByClassName('todo__btn--toggle');
for(i=0;i < toggleBtns.length; i++) {
	toggleBtns[i].parentNode.previousElementSibling.style.display = 'none';
	toggleBtns[i].addEventListener('click', showHideDescription);
}