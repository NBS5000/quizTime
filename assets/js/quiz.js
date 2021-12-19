
var timeLeft = 30;
var timerEl = document.getElementById('countdown');
var loop = 0;
var correct = 0;
var question = [];
var answer = [];
var false1 = [];
var false2 = [];
var false3 = [];
var qAndA = "";
var highScore = localStorage.getItem("highScore");
if(!highScore){
    localStorage.setItem("highScore","0");
}
document.getElementById("record").innerHTML= highScore;

function qSet(){
        

    question = [
        "What is the famous quote?",
        "What is Emperor Palpatine's first name?",
        "Which two characters are the only ones to appear in every Episode movie?",
        "How does Luke destroy the Imperial walker (AT-AT)?",
        "What was unique about Darth Maul's lightsaber?"
    ]

    answer = [
        "No, I am your father",
        "Sheev",
        "R2-D2 & C3PO",
        "Tripping it up",
        "It was double ended"
    ]
    false1 = [
        "Luke, I am your father",
        "Steve",
        "Luke & Leia",
        "Lasers",
        "It was purple"
    ]
    false2 = [
        "Luke, who's your daddy",
        "Darth",
        "Han Solo & Chewbacca",
        "Missiles",
        "It was curved"
    ]
    false3 = [
        "Yo, I'm yo pappy",
        "Garth",
        "Rey & Finn",
        "Asking nicely",
        "It squeaked"
    ]

    qAndA = {
        q: question[correct],
        a: answer[correct],
        f1: false1[correct],
        f2: false2[correct],
        f3: false3[correct]
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
            document.getElementById(btn).innerHTML=qAndA.a;
        }else if(_loop == 1){
            document.getElementById(btn).innerHTML=qAndA.f1;
        }else if(_loop == 2){
            document.getElementById(btn).innerHTML=qAndA.f2;
        }else if(_loop == 3){
            document.getElementById(btn).innerHTML=qAndA.f3;
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
        
        if(correct > highScore || highScore == null){
            localStorage.setItem("highScore",correct);
            document.getElementById("record").innerHTML=correct;
        }
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        }
    }, 1000);
    qSet();
}

function add10(){
    correct +=1;
    timeLeft+=10;
    qSet();
    document.getElementById("score").innerHTML=correct;
}
function sub10(){
    if(timeLeft <10){
        timeLeft = 1;
    }else{
    timeLeft-=10;
    }
}



