/* set all vars needed at this point */
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
var highScore = localStorage.getItem("highScore");
/* if highscore isn't set, set it to 0*/
if(!highScore){
    localStorage.setItem("highScore","0");
}
document.getElementById("record").innerHTML= highScore;

function qSet(){
    /* function to set the questions and answers*/


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
        "What is the name of The Child in the Mandalorian?",
        "Which planet was Padmé Amidala Queen of?",
        "What is Han Solo's response when Leia says 'I love you'?",
        "What language are the words written on Darth Vader's chest piece in?",
        "Who is the only rebel starfighter pilot to survive all three movies in the original trilogy?",
        "When Luke asked what was in the cave on Dagobah, what was Yoda's response?",
        "What does TIE in TIE Fighter stand for?",
        "What was Grand Admiral Thrawn's project, which lost out to the Death Star for the Emperors approval?",
        "What was the name of the command given to Clone Troopers to execute the Jedi?",
        "What is the last name of the character my daughter is named after?"
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
        "Grogu",
        "Naboo",
        "'I know'",
        "Ancient Hebrew",
        "Wedge Antilles",
        "'Only what you take with you'",
        "Twin Ion Engine",
        "The TIE Defender",
        "Order 66",
        "Jade"
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
        "Baby Yoda",
        "Tatooine",
        "'I love you too'",
        "Basic",
        "Luke Skywalker",
        "'Your fear'",
        "This Is Evil",
        "World Devastator",
        "Command 66",
        "Skywalker"
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
        "Little One",
        "Coruscant",
        "'No you don't'",
        "Huttese",
        "General Hux",
        "'Me'",
        "Turbo Intergalactic Engine",
        "Death Troopers",
        "Execute Jedi Order",
        "Amidala"
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
        "He has no name",
        "Hoth",
        "Silence",
        "Ancient Egyptian",
        "Admiral Ackbar",
        "No response, just a smile",
        "The Imperial Empire",
        "The Clone Army",
        "Kill Team Go",
        "Organa"
    ]
    /*check to see if reached the last question. 
    this way means that formula doesn't need to be adjusted if more questions asked*/
    var qlen = question.length;
    var turn = correct + wrong;
 
    if(turn > qlen - 1){
        alert("Well done! You reached the end.");
        timeLeft = 0;
    }else{
        /* set the q&a set for this round */
        qAndA = {
            q: question[turn],
            a: answer[turn],
            f1: false1[turn],
            f2: false2[turn],
            f3: false3[turn]
        }
        /* randomise which answers are set to which button*/
        var nums = "1234";
        var len = nums.length;
        var _loop = 0;
        /* loop through and set answers */
        while(_loop <= len && _loop < 4){
            /* get current length of string (shortened after each loop )*/
            var l = len - _loop;
            /* pick random char from string*/
            var r = Math.floor(Math.random() * (l));
            var char = nums.charAt(r);
            var btn = "button"+(char);
            /* button is selected at random, so answers don't appear in the same location*/
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

        }

        document.getElementById("theQuestion").innerHTML=qAndA.q;
    }
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

        if((correct + wrong ) == question.length){
            document.getElementById("over").innerHTML="Well done, you reached the end of the trench run!<br/><br/>You scored: "+correct;
        }else{
            document.getElementById("over").innerHTML="Game Over<br/><br/>You scored: "+correct;
        }
        document.getElementById("score").innerHTML="0";
        document.getElementById("btn_again").style.display = "inline-block";
        document.getElementById("over").style.display = "inline-block";
        
        document.getElementById("mainQuiz").style.display = "none";

        /* find out if score is new record, and display if it is */
        if(correct > highScore || highScore == null){
            localStorage.setItem("highScore",correct);
            document.getElementById("record").innerHTML=correct;
        }
        /* redisplay hall of fame */
        hallOfFame(correct);
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        }
    }, 1000);

    if((correct + wrong ) <= question.length){
        /* if not at the last question, get the next question set */
        qSet();
    } else{
        timerEl.textContent = '';
        /* once user has gotten to the last question, find out if all questions answered correctly
        or not and display message accordingly */
        if((correct + wrong ) == question.length){
            if(correct == question.length){
                document.getElementById("over").innerHTML="Well done, you reached the end of the trench run and your missile hit!<br/>Bye bye Death Star!<br/><br/>You scored: "+correct;
            }else{
                document.getElementById("over").innerHTML="Well done, you reached the end of the trench run but your shot missed! The Rebel Base has been blown up!<br/><br/>You scored: "+correct;
            }
        }else{
            document.getElementById("over").innerHTML="Game Over<br/><br/>You scored: "+correct;
        }
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

}

function add5(){
    /* add 5 seconds if correct answer guessed and move on to next question */
    correct +=1;
    timeLeft+=5;
    qSet();
    document.getElementById("score").innerHTML=correct;
}
function sub10(){
    /* subtract 10 seconds if wrong guess and move on to next question , set to 0 if less than 10 seconds */
    if(timeLeft <10){
        timeLeft = 0;
    }else{
    timeLeft-=10;
    wrong +=1;
    qSet(); 
    }
}

function clearScore(){
    /* clear record and hall of fame if user requests */
    var $confirm = confirm("Are you sure you want to clear the top score and Hall of Fame?")
    if($confirm){
        localStorage.setItem("highScore","0");
        localStorage.removeItem("hallOfFame");
        document.getElementById("record").innerHTML="0";
        hallOfFame(101);
        showHof();
    }
}

function showHof(){
    /* display hall of fame*/
    var showList = JSON.parse(localStorage.getItem("hallOfFame"));
    var $loop = 0;
    var display = "";

    while($loop < showList.length){
        if($loop == 0){
            display += "<br/><h4 id='topScore' class='scoreboard'><img class='firstPlaceBoba' src='./assets/images/fett.png' alt='Boba Fett helmet'/>"+showList[$loop].uname+" - "+showList[$loop].score+"<img class='firstPlaceBoba' src='./assets/images/fett.png' alt='Boba Fett helmet'/></h4>";
        }else{
            display += "<br/><h4 id='topScore' class='scoreboard'>"+showList[$loop].uname+" - "+showList[$loop].score+"</h4>";
        }
        $loop++;
    }

    document.getElementById("hallOfFame").innerHTML = display;

}

function hallOfFame(num){
    /* if hall of fame is empty, load dummy data, other wise pull hall of fame, 
    add users score, then trim off the last record */

    if(num == 101){
        var list = JSON.parse(localStorage.getItem("hallOfFame")); 
        if(!list){
            var dummy1={
                uname:"Mr High Ground",
                score:"3"
            }
            var dummy2={
                uname:"Beat this!",
                score:"2"
            }
            var dummy3={
                uname:"Yoda",
                score:"1"
            }
            var dummy4={
                uname:"That's Mr Vader!",
                score:"1"
            }
            var dummy5={
                uname:"FN-2187",
                score:"1"
            }
            
            var hof = [];
            hof.push(dummy1,dummy2,dummy3,dummy4,dummy5);
            localStorage.setItem("hallOfFame", JSON.stringify(hof));
        }

        showHof();
    } else 
    var list = JSON.parse(localStorage.getItem("hallOfFame")); 
        if (!list){
            hallOfFame(101);
            var list = JSON.parse(localStorage.getItem("hallOfFame")); 
        }

        /* pull hall of fame and order according to score */
        var listSort = list.sort(function(a,b){
            return b.score - a.score;
        });
        var lastSort = listSort[listSort.length - 1];


        var lowest = lastSort.score;

        var thisScore = {
            uname: "",
            score: num
        }
        if(num !== 101){
            /* 101 is dummy parameter, checks that isn't a dummy run and then gets users name for user board
            if score is high enough, otherwise advises didn't make it*/
            if(thisScore.score > parseInt(lowest)){
                var user = prompt("The force is strong in this one.\n\nYou've made the leaderboard!\n\nWhat's your name?");
                var thisScore = {
                    uname: user,
                    score: num
                }
                var newList = list.push(thisScore);
                newList = list.sort(function(a,b){
                    return b.score - a.score;
                });
                var $len = newList.length;
                if($len > 5){
                newList.pop();
                }
                
            localStorage.setItem("hallOfFame", JSON.stringify(newList));
            }else{
                alert("Unlucky, you've not made the leaderboard this time. \n\nTry again, and may the force be with you.");
            }
        }
    showHof();
}