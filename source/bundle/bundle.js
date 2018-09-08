import '../components/scss/style.scss';

var i;


var todoList = document.getElementById('list');

// var todos;

// function toLocal() {
// 	todos = todoList.innerHTML;
// 	localStorage.setItem('todos', todos);
// }


//GET CONTROL BUTTONS IN THE FORMS
document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('cancelTask').addEventListener('click', cancelTask);

//GET CONTROL PANELS WITH FORM
var panel = document.querySelector('.todo__panel'),
form = document.querySelector('.todo__add');

//HIDE/SHOW DESCRIPTION
var toggleBtns = document.getElementsByClassName('todo__btn--toggle');
for(i=0;i < toggleBtns.length; i++) {
	toggleBtns[i].parentNode.previousElementSibling.style.display = 'none';
	toggleBtns[i].addEventListener('click', showHideDescription);
}
function showHideDescription() {
	var elem = this.parentNode.previousElementSibling;
	if(elem.style.display == 'none') {
		elem.style.display = 'block';
	}
	else {
		elem.style.display = 'none';
	}

}
// showHideDescription();


//CHECK AMOUNT ITEMS
// function checkAmount() {
// 	var amount = document.getElementsByClassName('todo__item'),
// 	list = document.getElementById('list');
// 	for(i = 0;i < amount.length;i++) {
// 		if(amount.length <= 1) {
// 			list.style.overflowY = 'hidden';
// 		}
// 		else {
// 			list.style.overflowY = "scroll";
// 		}
// 	}
// 	// toLocal();
// }checkAmount();

//CHECK BLOCK HEIGHT
function checkBlockHeight() {
	var block = document.querySelector('.todo__list').offsetHeight;
	if(block < 200) {
		document.getElementById('list').style.overflowY = "hidden";
	}
	else {
		document.getElementById('list').style.overflowY = "scroll";
	}
}

//DEL LI ITEM
function delItem() {
	var del = document.getElementsByClassName('todo__btn--close');
	for(i = 0;i < del.length;i++) {
		del[i].addEventListener('click', function() {
			this.parentNode.parentNode.remove();
			// checkAmount();
			checkBlockHeight()
		});
	}
	// toLocal();
	
}delItem();

//OPEN ADDING TASK FORM
function addTask(event) {
	event.preventDefault();
	var array = ['Title', 'Name', 'Description']
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
	// toLocal();
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
	// toLocal();
}

//ADD TASK TO LIST
function saveTask(event) {
	event.preventDefault();
	//GET VALUE FROM NEW TASK FORN
	var titleValue = document.getElementById('addTitle').value,
	nameValue = document.getElementById('addName').value,
	prioValue = document.getElementById('addPriority').value,
	descValue = document.getElementById('addDescription').value;
	//CREATE NEW TASK ELEMENTS
	//LI ITEM
	var li = document.createElement('li');
	li.classList.add('todo__item');
	//TITLE
	var title = document.createElement('h3');
	title.classList.add('todo__title');
	title.innerHTML = titleValue;
	//NAME
	var name = document.createElement('span');
	name.classList.add('todo__name');
	name.innerHTML = 'Проект: <p>' + nameValue + '</p>';
	//PRIORITY
	var priority = document.createElement('span');
	priority.classList.add('todo__priority');
	priority.innerHTML = 'Priority: <p>' + prioValue +'</p>';
	//DESCRIPTION
	var desc = document.createElement('p');
	desc.className = 'todo__desc';
	desc.innerHTML = descValue;
	desc.style.display = "none";
	//BUTTONS PANEL
	var btns = document.createElement('div');
	btns.classList.add("todo__btns");
	var btnChange = document.createElement('a');
	btnChange.classList.add("todo__btn", "todo__btn--change");
	btnChange.innerHTML = "Изменить";
	var btnClose = document.createElement('a');
	btnClose.classList.add("todo__btn", "todo__btn--close");
	btnClose.innerHTML = "Закрыть";
	var btnToggle = document.createElement('a');
	btnToggle.classList.add("todo__btn", "todo__btn--toggle");
	btnToggle.innerHTML = "Развернуть";
	btnToggle.onclick = showHideDescription;
	
	// btnToggle.onclick = showHideDescription;
	//BUTTONS PANEL IN THE NEW TASK
	var arrBtn = [btnChange, btnClose, btnToggle];
	for(var i = 0; i < arrBtn.length; i++) {
		arrBtn[i].setAttribute('href', '#');
		btns.appendChild(arrBtn[i])
	}
	//CHECK FORM
	if(descValue == '' || nameValue == '' || titleValue == '') {
		alert('Заполнены не все поля!');
	} else {
		panel.style.display = 'flex';
		form.style.display = "none";
		var item = document.getElementById('list').appendChild(li),
		selectValue = document.getElementById('selectTask').value;
		if(selectValue !== "Все") {
			if(nameValue !== selectValue) {
				item.setAttribute('style', 'display: none');
			}
		}
		var arrEl = [title, name, priority, desc, btns];
		for (i = 0; i < arrEl.length; i++) {
			item.appendChild(arrEl[i]);
		}
		// showHideDescription();
		document.getElementById('saveTask').remove();
	}
	//SELECT CHANGE
	// var select = document.getElementById('selectTask');
	// var option = document.createElement('option');
	// option.setAttribute('value', nameValue);
	// option.innerHTML = nameValue;
	// for(i=0;i < select.options.length;i++) {
	// 	var opt = select.options.item([i]).value;

	// 	if(opt !== nameValue) {
			
	// 	}
	// }

	if(document.getElementById('SetPriority').checked == true) {
		sortList();
	}






	// showHideDescription();
	delItem();
	checkBlockHeight();
}

//CHANGE VALUES OF EXISTING TASK
var list = document.querySelector('ul');
list.addEventListener('click', changeTask);

function changeTask(event) {
	var chg = document.getElementsByClassName('todo__btn--change');
	for(i = 0;i < chg.length;i++) {
		chg[i].addEventListener('click', function() {
			if(form.style.display !== "block") {
				form.style.display = "block";
				panel.style.display = 'none';
			}
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

			console.log(this.parentNode.parentNode)
			document.getElementById('chgTask').addEventListener('click', function() {
				if(title.value == '' || name.value == '' || desc.value == '') {
					alert('Заполнены не все поля!');
				}
				else {
					panel.style.display = 'flex';
					form.style.display = "none";

					var arr = ['title', 'name', 'prio', 'desc'];

					for(i=0;i<arr.length;i++) {
						var x = arr[i].substring(0,1)
						var y = eval("(" + x + ")") ;
						var o = eval("(" + arr[i] + ")");
						y.innerHTML = o.value;
					}

					var selectValue = document.getElementById('selectTask').value;
					if(selectValue !== "Все") {
						if(name.value !== selectValue) {
							item.setAttribute('style', 'display: none');
						}
					}
					// console.log(this.parentNode);

					form.style.display = 'none';
					panel.style.display = 'flex';
					if(document.getElementById('chgTask')) {
						document.getElementById('chgTask').remove();
					}	
				};
				if(document.getElementById('SetPriority').checked == true) {
					sortList();
				}
			});
		});
	};
	// toLocal();
	// eventFire(document.getElementById('SetPriority'), 'click');
	
	



	// sortList();
	// document.getElementById('SetPriority').onclick = sortList;
};




// document.getElementById('SetPriority').addEventListener('click', sortList);

document.getElementById('SetPriority').onclick = sortList;

function sortList() {

	var list, switching, li, one, sec, shouldSwitch
	list = document.getElementById('list');
	switching = true;
	while (switching) {
		switching = false;
		li = list.getElementsByTagName('LI');
		for (i = 0; i < (li.length - 1); i++) {
			shouldSwitch = false;
			one = li[i].getElementsByClassName('todo__priority')[0].children[0].innerHTML;
			sec = li[i + 1].getElementsByClassName('todo__priority')[0].children[0].innerHTML;
			if(document.getElementById('SetPriority').checked == true) {
				if(Number(one) < Number(sec)) {
					shouldSwitch = true;
					break;
				}
			}else {
				if(Number(one) > Number(sec)) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			li[i].parentNode.insertBefore(li[i + 1], li[i]);
			switching = true;
		}
	}
}

// if(localStorage.getItem('todos')) {
// 	todoList.innerHTML = localStorage.getItem('todos')
// }



//FILTER TASKS BY NAME
document.getElementById('selectTask').onclick = filter;



function filter() {
	var selectValue = document.getElementById('selectTask').value;
	var item = document.getElementsByTagName('LI');
	for(i = 0;i < item.length;i++) {
		var txt = item[i].children[1].children[0].innerHTML;
		// console.log(selectValue);
		if (selectValue == "Все") {
			item[i].style.display = "block";
		} else if (txt.toLowerCase() !== selectValue.toLowerCase()) {
			item[i].style.display = "none";
		} else {
			item[i].style.display = "block";	
		}
	}
	checkBlockHeight();
}