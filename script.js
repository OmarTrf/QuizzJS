const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionConatainerElement = document.getElementById('question-container');
let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById('question');
const answerButtonsElement= document.getElementById('answer-buttons'); 
const resultPo = document.getElementById('resultPo'); 
const resultNe = document.getElementById('resultNe'); 
let resultat = 0;
startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',() => {
	currentQuestionIndex++;
	setNextQuestion();
})
function startGame(){
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - .5);
	currentQuestionIndex = 0;
	resultat = 0;
	questionConatainerElement.classList.remove('hide');
	document.getElementsByClassName('res')[0].classList.add('hide');
	document.getElementsByClassName('res')[1].classList.add('hide');
	setNextQuestion();
}
function showQuestion(question){
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click',selectAnswer);
		answerButtonsElement.appendChild(button);
	}) 

}
function resetState(){
	nextButton.classList.add('hide');
	while (answerButtonsElement.firstChild){
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}
function setNextQuestion(){
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function selectAnswer(ele){
	const selectedButton = ele.target;
	const correct = selectedButton.dataset.correct;
	if (correct) {
		resultat += 1;
	}
	setStatusClass(document.body,correct);
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button,button.dataset.correct);
	})
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');
	}else{
		startButton.innerText = 'Restart';
		startButton.classList.remove('hide');
		if (resultat > parseInt(questions.length/2) ) {
			resultPo.classList.remove('hide');
			resultNe.classList.add('hide');
			document.getElementsByClassName('points')[0].innerHTML = resultat + ' Points';
		}else{
			resultNe.classList.remove('hide');
			resultPo.classList.add('hide');
			document.getElementsByClassName('points')[1].innerHTML = resultat + ' Points';
		}
	}
}
function setStatusClass(elem,correct){
	
	if(correct){
		elem.classList.remove('wrong');
		elem.classList.add('correct');
	}else{
		elem.classList.remove('correct');
		elem.classList.add('wrong');
	}
}
function clearStatusClass(element){
	element.classList.remove('correct');
	element.classList.remove('wrong');
}
const questions = [
	{
		question:'What is 1 + 1',
		answers : [
			{text:'2',correct:true},
			{text:'4',correct:false}
		]
	},
	{
		question:'What is 2 + 1',
		answers : [
			{text:'5',correct:false},
			{text:'3',correct:true}
		]
	},
	{
		question:'How many days are there in a normal year?',
		answers : [
			{text:'265 days',correct:false},
			{text:'300 days',correct:false},
			{text:'365 days',correct:true}
		]
	},
	{
		question:'How many days do we have in a week?',
		answers : [
			{text:'5 days',correct:false},
			{text:'8 days',correct:false},
			{text:'7 days',correct:true},
			{text:'10 days',correct:false}
		]
	}
]