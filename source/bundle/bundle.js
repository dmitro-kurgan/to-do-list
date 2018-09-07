import '../components/scss/style.scss';

var i;

var obj = {'myCat': 'Cat', 'myDog': 'Dog'}


localStorage.setItem('obj', JSON.stringify(obj));


var myNodelist = document.getElementsByTagName('li');

// myNodelist.innerHTML = (div)

for (var i = 0; i < myNodelist.length; i++) {
	// var o = document.getElementById('listTitle' + [i]);
	// myNodelist[i].innerHTML = (localStorage.myDog)
	
	// console.log(localStorage.myCat);
	// console.log(myNodelist[i])

}

//GET CONTROL BUTTONS IN THE FORMS
document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('cancelTask').addEventListener('click', cancelTask);

//GET CONTROL PANELS WITH FORM
var panel = document.querySelector('.todo__panel'),
form = document.querySelector('.todo__add');

//HIDE/SHOW DESCRIPTION
function showHideDescription() {
	var btn = document.getElementsByClassName('todo__btn--toggle');
	for(i=0;i < btn.length; i++) {
		btn[i].parentNode.previousElementSibling.style.display = 'none';
		btn[i].addEventListener('click', function() {
			var r = this.parentNode.previousElementSibling;
			if(r.style.display == 'none') {
				r.style.display = 'block';
			}
			else {
				r.style.display = 'none';
			}
		})
	}
}showHideDescription();

//CHECK AMOUNT ITEMS
function checkAmount() {
	var amount = document.getElementsByClassName('todo__item'),
	list = document.getElementById('list');
	for(i = 0;i < amount.length;i++) {
		if(amount.length <= 1) {
			list.style.overflowY = 'hidden';
		}
		else {
			list.style.overflowY = "scroll";
		}
	}
}checkAmount();

//DEL LI ITEM
function delItem() {
	var del = document.getElementsByClassName('todo__btn--close');
	for(i = 0;i < del.length;i++) {
		del[i].addEventListener('click', function() {
			this.parentNode.parentNode.remove();
			checkAmount();	
		});
	}
	
}delItem();

//OPEN ADDING TASK FORM
function addTask(event) {
	event.preventDefault();
	document.getElementById('addTitle').value = '',
	document.getElementById('addName').value = '',
	document.getElementById('addDescription').value = '';
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
		arrEl = [title, name, priority, desc, btns];
		for (i = 0; i < arrEl.length; i++) {
			item.appendChild(arrEl[i]);
		}
		document.getElementById('saveTask').remove();
	}
	//SELECT CHANGE
	var select = document.getElementById('selectTask');
	var option = document.createElement('option');
	option.setAttribute('value', nameValue);
	option.innerHTML = nameValue;
	for(i=0;i < select.options.length;i++) {
		var opt = select.options.item([i]).value;
		// console.log(opt == nameValue);
		if(opt !== nameValue) {
			// select.appendChild(option);
		}
	}
	showHideDescription();
	delItem();
	checkAmount();
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

					form.style.display = 'none';
					panel.style.display = 'flex';
					if(document.getElementById('chgTask')) {
						document.getElementById('chgTask').remove();
					}	
				};
			});
		});
	};
};