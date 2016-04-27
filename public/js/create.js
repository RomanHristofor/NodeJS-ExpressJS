var Question = {
		constructor: function( questText, answersArray, rightAnswerNumber ) {
			this.questText = questText;
			this.answers = answersArray;
			this.rightAnswerNumber = rightAnswerNumber;
			return this;
		},
		id: function(){ var count = 0; return function(){return count++;}; }()
};

var question1, question2, question3, question4;

var questionsArrayObj = [
	question1 = Object.create(Question).constructor(
			"1.Какой способ подтверждения прав требует доступа к редактированию кода сайта?",
			["html-файл;",
			"через dns",
			"мета-тэг"],
			2
	),
	question2 = Object.create(Question).constructor(
			"2.Какой из статусов означает, что страница сайта доступна для индексирования?",
			["404",
			"202",
			"200"],
			5
	),
	question3 = Object.create(Question).constructor(
			"3.Что произойдет с уже проиндексированным сайтом, если его сервер перестанет работать?",
			["На сайт не смогут заходить пользователи, и сайт может пропасть из поиска",
			"На сайт смогут заходить пользователи, но сайт пропадет из поиска",
			"Это никак не повлияет на работу моего сайта"],
			6
	),
	question4 = Object.create(Question).constructor(
			"4.Вы проверили одну из страниц вашего сайта и обнаружили, что она проиндексирована, но не доступна пользователям поиска. Что это может означать?",
			["робот проиндексировал страницу, но она пока не попала в поиск",
			"поисковый робот не смог проиндексировать страницу, поэтому она не попала в поиск",
			"поисковый робот ничего не знает о странице"],
			9
	)
];

showQuestions( questionsArrayObj );

function showQuestions( questionsArrayObj ) {
	for (var i = 0; i < questionsArrayObj.length; i++) {
		showQuestion( questionsArrayObj[i], i );
	}
	createButton();
}

function showQuestion( question, counterObj ) {
	var p, container;
		container = document.getElementById("testPage");
		p = document.createElement('p');
		p.textContent = question.questText;
		p.setAttribute("class","question");
		container.appendChild(p);

		for (var i = 0; i < question.answers.length; i++) {
			createInput( container, counterObj, question.id() );
			createArticle( container, question.answers[i] );
		}
		createDiv( container, '', 'q'+i+'a'+question.rightAnswerNumber );
}

function createInput( container, i, id ) {
	var input = document.createElement('input');
		input.setAttribute("id", id);
		input.setAttribute("type","radio");
		input.setAttribute("name","checktInput["+i+"]");
		container.appendChild(input);
}

function createArticle( container, answer, style ) {
	var p = document.createElement('p');
	var div;
		p.textContent = answer;
		if( style !== undefined ) {
			div.textContent = answer;
			div.setAttribute("id", style);
			container.appendChild(div);
		}
		container.appendChild(p);
}

function createDiv( container, answer, style ) {
	var cite = document.createElement('cite');
		cite.textContent = answer;
		cite.setAttribute("id", style);
		container.appendChild(cite);
}

function createButton( questionsArrayObj ) {
	var container, btn;
		container = document.getElementById("testPage");
		btn = document.createElement('input');
		btn.setAttribute("type","button");
		btn.setAttribute("id","nextStep");
		btn.setAttribute("value","Отправить");
		btn.setAttribute("onclick","validateForm()");
		container.appendChild(btn);
}
