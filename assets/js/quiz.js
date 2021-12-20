
var timeLeft = 30;
var timerEl = document.getElementById('countdown');
var loop = 0;
var correct = 0;
var wrong = 0;
var question = [];
var answer = [];
var false1 = [];
var false2 = [];
var false3 = [];
var qAndA = "";
var hof = [];
var highScore = localStorage.getItem("highScore");
if(!highScore){
    localStorage.setItem("highScore","0");
}
document.getElementById("record").innerHTML= highScore;

function qSet(){
    /* function to set the questions*/
    var turn = correct + wrong;

    question = [
        "What is the famous quote?",
        "What is Emperor Palpatine's first name?",
        "Which two characters are the only ones to appear in every Episode movie?",
        "How does Luke destroy the Imperial walker (AT-AT)?",
        "What was unique about Darth Maul's lightsaber?",
        "Which year was Star Wars first released?",
        "Which starfighter does Luke Skywalker fly?",
        "Who created Star Wars?",
        "What powers a lightsaber?",
        "Which bounty hunter catches Han Solo?",
        "What is the name of The Child in the Mandalorian?"
    ]

    answer = [
        "'No, I am your father'",
        "Sheev",
        "R2-D2 & C3PO",
        "Tripping it up",
        "It was double ended",
        "1977",
        "X-Wing",
        "George Lucas",
        "Kyber crystal",
        "Boba Fett",
        "Grogu"
    ]
    false1 = [
        "'Luke, I am your father'",
        "Steve",
        "Luke & Leia",
        "Lasers",
        "It was purple",
        "1983",
        "Y-Wing",
        "Steven Spielberg",
        "The force",
        "Dengar",
        "Baby Yoda"
    ]
    false2 = [
        "'Luke, who's your daddy'",
        "Darth",
        "Han Solo & Chewbacca",
        "Missiles",
        "It was curved",
        "1980",
        "The Millenium Falcon",
        "JJ Abrams",
        "The Jedi's mind",
        "Bossk",
        "Little One"
    ]
    false3 = [
        "'Hey, I'm yo pappy'",
        "Garth",
        "Rey & Finn",
        "Asking nicely",
        "It squeaked",
        "1994",
        "TIE Fighter",
        "JRR Tolkein",
        "Batteries",
        "IG-88",
        "He has no name"
    ]

    qAndA = {
        q: question[turn],
        a: answer[turn],
        f1: false1[turn],
        f2: false2[turn],
        f3: false3[turn]
    }
    var nums = "1234";
    var len = nums.length;
    var _loop = 0;
    while(_loop <= len && _loop < 4){
        /* get current length of old password (shortened after each loop )*/
        var l = len - _loop;
        /* pick random char from old pwd*/
        var r = Math.floor(Math.random() * (l));
        var char = nums.charAt(r);
        var btn = "button"+(char);
        if(_loop == 0){
            document.getElementById(btn).innerHTML= "<a class='select' onclick='add5()' href='#'>" + qAndA.a + "</a>";
        }else if(_loop == 1){
            document.getElementById(btn).innerHTML="<a class='select' onclick='sub10()' href='#'>" + qAndA.f1 + "</a>";
        }else if(_loop == 2){
            document.getElementById(btn).innerHTML="<a class='select' onclick='sub10()' href='#'>" + qAndA.f2 + "</a>";
        }else if(_loop == 3){
            document.getElementById(btn).innerHTML="<a class='select' onclick='sub10()' href='#'>" + qAndA.f3 + "</a>";
        }

        nums = nums.replace(char,"");
        _loop = _loop+1;



        /* testing */
        // console.log(l);
        // console.log(btn);
        // console.log(char);
        // console.log(nums);
    }
    // /* testing */
    // var test = qAndA.q;
    // console.log(test);

    document.getElementById("theQuestion").innerHTML=qAndA.q;
}

function start(){
    document.getElementById("mainQuiz").style.display = "contents";
    document.getElementById("quizUL").style.display = "flex";
    document.getElementById("btn_start").style.display = "none";
    document.getElementById("btn_again").style.display = "none";
    document.getElementById("over").style.display = "none";
    timeLeft = 30;
    correct = 0;
    wrong = 0;
    countdown();
}


function countdown() {
/* main parts of countdown code taken from student example '04-WEB-APIS - 01-Monday - 10-Stu-Timers-Intervals', amended code in if statement*/

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
        } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
        } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        document.getElementById("over").innerHTML="Game Over<br/><br/>You scored: "+correct;
        document.getElementById("score").innerHTML="0";
        document.getElementById("btn_again").style.display = "inline-block";
        document.getElementById("over").style.display = "inline-block";
        
        document.getElementById("mainQuiz").style.display = "none";
        
        
        if(correct > highScore || highScore == null){
            localStorage.setItem("highScore",correct);
            document.getElementById("record").innerHTML=correct;
        }
        hallOfFame(correct);
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        }
    }, 1000);
    qSet();
}

function add5(){
    correct +=1;
    timeLeft+=5;
    qSet();
    document.getElementById("score").innerHTML=correct;
}
function sub10(){
    if(timeLeft <10){
        timeLeft = 0;
    }else{
    timeLeft-=10;
    wrong +=1;
    qSet();
    }
}

function clearScore(){
    var $confirm = confirm("Are you sure you want to clear the top score?")
    if($confirm){
        localStorage.setItem("highScore","0");
        document.getElementById("record").innerHTML="0";
    }
}

function hallOfFame(score){

    function rank(a,b){
        if(parseInt(a.score) < parseInt(b.score)){
            return -1;
        }else if(parseInt(a.score) < parseInt(b.score)){
            return 1;
        }else{
            return 0;
        }
    }

    if(score == 101){
        var dummy1={
            uname:"test",
            score:"1"
        }
        var dummy2={
            uname:"test2",
            score:"1"
        }
        var dummy3={
            uname:"test3",
            score:"2"
        }
        
        hof.push(dummy1,dummy2,dummy3);

        localStorage.setItem("hallOfFame", JSON.stringify(hof));
        var list = JSON.parse(localStorage.getItem("hallOfFame"));

        var listLen = list.length;

        var _loop = 0;
        var _1,_2,_3,_4,_5;
        while(_loop < listLen){
            var show = list[_loop];
            console.log(show);
            if(_loop == 0){
                _1 = show;
            }else if(_loop == 1){
                _2 = show;
            }else if(_loop == 2){
                _3 = show;
            }else if(_loop == 3){
                _4 = show;
            }else if(_loop == 4){
                _5 = show;
            }  


            _loop+=1;
        }

        console.log(_1,"\n",_2,"\n",_3,"\n",_4,"\n",_5)

        console.log(list.sort(function(a,b){
            return b.score - a.score;
        }));
        // console.log(list);


        console.log(list.length);
    }
}


