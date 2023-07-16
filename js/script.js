//taking the required elements
const start_btn = document.querySelector(".start_button button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");


const option_list = document.querySelector(".option_list");

//when start is clicked
start_btn.onclick = ()=> {
    info_box.classList.add("activeInfo"); // show info box
}

//when exit button is clicked
exit_btn.onclick = ()=> {
    info_box.classList.remove("activeInfo"); // hide info box
}

//when continue button is clicked
continue_btn.onclick = ()=> {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let counter;
let userScore = 0;
const next_btn = quiz_box.querySelector(".next_btn");

const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult");
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0);
    que_count = 0;
    userScore = 0;
}
quit_quiz.onclick = ()=> {
    window.location.reload();
}
//when next button is clicked...
next_btn.onclick = ()=> {
    if(que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count);
        questionCounter(que_count+1);
        clearInterval(counter);
        startTimer(15);
        clearInterval(counterLine);
        startTimerLine(0);
        next_btn.style.display = "none";
    } else {
        console.log("All questions completed.");
        showResultBox();
    }
}
//fetching questions from questions array based on their indices        
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". "+questions[index].question+'</span>';
    let option_tag = '<div class="option">'+questions[index].options[0]+'<span></span></div>'+'<div class="option">'+questions[index].options[1]+'<span></span></div>'+
    '<div class="option">'+questions[index].options[2]+'<span></span></div>'+
    '<div class="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tick_icon = '<div class="icon tick"><i class="fa fa-check"></i></div>';
let cross_icon = '<div class="icon cross"><i class="fa fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns) {
        userScore++;
        answer.classList.add("correct");
        console.log("yo");
        console.log(userScore);
        answer.insertAdjacentHTML("beforeend", tick_icon);
    } else {
        answer.classList.add("incorrect");
        console.log("no");
        answer.insertAdjacentHTML("beforeend", cross_icon);
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tick_icon);
            }
            
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
        
    }
    next_btn.style.display = "block";
    
}
function questionCounter(index) {
    const ques_counter = quiz_box.querySelector(".total_que");
    let total_que_counter = '<span><p>'+index+'</p>of<p>5</p>Questions</span>';
    ques_counter.innerHTML = total_que_counter;
}

function startTimer(time) {
    counter = setInterval(timer,1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time == 0) {
            clearInterval(counter);
            clearInterval(counterLine);
            if(que_count < questions.length - 1) {
                que_count++;
                showQuestions(que_count);
                questionCounter(que_count+1);
                clearInterval(counter);
                startTimer(15);
                clearInterval(counterLine);
                startTimerLine(0);
                next_btn.style.display = "none";
            } else {
                console.log("All questions completed.");
                showResultBox();
            }
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer,29);
    function timer() {
        time+=1;
        timeLine.style.width = time + 'px';
        if(time > 549) {
            clearInterval(counter);
        }
    }
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); //hide info
    quiz_box.classList.remove("activeQuiz"); //hide quiz
    result_box.classList.add("activeResult"); //show result
    const scoreText = result_box.querySelector(".score");
    let scoreTag = '<span>Your score is<p>'+userScore+'</p>out of<p>5</p></span>';
    scoreText.innerHTML = scoreTag;
}