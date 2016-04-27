function validateForm() {
	var count = document.getElementsByTagName("input");
	var questions = document.getElementsByClassName("question");
	var form = document.getElementById("testPage");
	var curr = 0, p;
		for (var i = 0; i < count.length; ++i) {
				if( count[i].checked )
						curr++;
		}
		if(curr !== questions.length ) {
			document.getElementById("msg").innerHTML = '';
			p = 'Вы ответили не на все вопросы теста!';
			return outputDiv( p );
		}
		else
			document.getElementById("msg").innerHTML = '';
			form.removeChild(form.lastChild);
			checked(count);
}

function outputDiv( text ) {
	var div = document.getElementById("msg");
	var p = document.createElement('p');
		p.textContent = text;
		div.appendChild(p);
}

function checked( check ) {
	var checkedID=[];
	for (var i = 0; i < check.length; ++i) {
		if( check[i].checked )
			checkedID.push(+check[i].id);
	}
	showValidateAnswer( checkedID );
}

function showValidateAnswer( checkedID ) {
	var validAnswer, cite, span, count = 0;
	validAnswer = getRightAnswerArray();
		for (var i = 0; i < validAnswer.length; ++i) {
			for (var j = 0; j < checkedID.length; ++j) {
				cite = document.getElementsByTagName('cite')[j];
					if( checkedID[j] === validAnswer[j] ) {
						count++;
						span = "Это правильный ответ!";
						createSpan( span, cite );
					}
					else {
						span = "Это неверный ответ!";
						createSpan( span, cite );
					}
			}
			break;
		}
		countValidQuestions( count, validAnswer.length );
}

function getRightAnswerArray() {
	var number=[], result;
	for (var i = 0; i < questionsArrayObj.length; ++i) {
		result = questionsArrayObj[i].rightAnswerNumber;
		number.push(result);
	}
	return number;
}

function createSpan( text, cite ) {
	var span = document.createElement('span');
	span.textContent = text;
	span.setAttribute("style", "color:blue;");

	if( cite.childNodes.length === 0 ) {
		cite.insertBefore(span, null);
	}
	else cite.replaceChild(span, cite.firstChild);
}

function countValidQuestions( count, i ) {
	var container, div, tmp, btnReset, btnId;
	container = document.getElementById("testPage");
	btnId = document.getElementById("btRst");
	btnReset = reloadForm();

	div = document.createElement('div');
	div.setAttribute("id", "countQuest");
	div.textContent = "Вы верно ответили на " + count + " из " +i+ " вопросов!";

	tmp = document.getElementById("countQuest");
	if( !tmp ) {
		container.insertBefore(div, null);
		container.appendChild(btnReset);
	}
	else {
		tmp.parentNode.removeChild(tmp);
		container.replaceChild(div, btnId);
		container.insertBefore(btnId, null);
	}
}

function reloadForm() {
	var btnReset = document.createElement('button');
	btnReset.setAttribute("type","reset");
	btnReset.setAttribute("id","btRst");
	btnReset.setAttribute("onclick","window.location.reload(true);");
	btnReset.textContent = "Попробовать еще раз?";
	return btnReset;
}