//javascript for maths game!
//this code will be executed once when ua page is loaded
var playing=false;
//this code will be loaded when ever u click start reset button.
var score;
var timeremaining;
var correctAnswer;
document.getElementById("startReset").onclick=function(){
    //code to be written wen startreset button is clicked
    //checking whether playing or not
    if(playing==true){
        location.reload();//refresh or reload the page.
    }
    else{//we are not playing
        playing=true;
        //changing the text of the button
        score=0;
        show("timeRemaining");//this is the id from html
        timeremaining=60;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        startCountdown();
        document.getElementById("value").innerHTML=score;
        
        hide("gameover");
        document.getElementById("startReset").innerHTML="Reset Game";
        
        generateQA();
    }
}

function startCountdown(){
    var action=setInterval(function(){
        timeremaining-=1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){//game over
            clearInterval(action);
            document.getElementById("gameover").innerHTML="<p>GAMEOVER!</p><p>Your score is:"+score+"</p>";
            show("gameover");
            hide("timeRemaining");
            playing=false;
            document.getElementById("startReset").innerHTML="Start Game";
        }
    },1000);
}
//handling events
//we could have done this for each box but for loop will handle all the boxes in one code.
for(i=1;i<5;i++){
        document.getElementById("box"+i).onclick=function(){
            if(playing==true){
            if(this.innerHTML==correctAnswer){
                score++;
                document.getElementById("value").innerHTML=score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                //generate QA
                generateQA();
            }else{
                    hide("correct");
                    show("wrong");
                    setTimeout(function(){
                        hide("wrong");
                    },1000);
                }
            }
        }
}

function generateQA(){
    /*Math.random will produce random numbers btwn 0-1
    As we need only single precsion value we round off the value. 
    Now to make it an integer initially we multiplied it by 10. But then it would give value from 0-10 we wanted values from 1-10.
    So we multipled by 9 and added 1.
    If we want nums from 2-10 then multiply by 8 and add 2 and so on.*/
    var x= 1+Math.round(9 * Math.random());
    var y= 1+Math.round(9 * Math.random());
    var operators = [{
        sign: "+",
        method: function(x,y){ return x + y; }
    },{
        sign: "-",
        method: function(x,y){ return x - y; }
    },{
        sign: "*",
        method: function(x,y){ return x * y; }
    },{
        sign: "/",
        method: function(x,y){ return x / y; }
    }];

    var selectedOperator = Math.floor(Math.random()*operators.length);
    
    var noPrecisionAnswer = operators[selectedOperator].method(x,y);
    
    correctAnswer=noPrecisionAnswer.toFixed(1);
    
    document.getElementById("question").innerHTML=x+operators[selectedOperator].sign+y;
    
    //4 blocks so *3 and +1 will give nums btwn 1-4
    var correctPosition=1+Math.round(3*Math.random());
    //below code fills the correct answer in random box
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
    // this array will containe the correct answer and set of other 3 non-repeated wrong answers!
    var answers=[correctAnswer];
    
    for(i=1;i<5;i++){
        if(i!=correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer=(1+Math.round(9 * Math.random()))*(1+Math.round(9 * Math.random()));
                var precisionAnswer=wrongAnswer.toFixed(1);
                document.getElementById("box"+i).innerHTML=precisionAnswer;
            }
            while(answers.indexOf(wrongAnswer)>-1)
            answers.push(precisionAnswer);
            //push is a method for arrays!
            //anythng other than 0 in a condition is true!
            document.getElementById("box"+i).innerHTML=precisionAnswer;
            
        }
    }
}
function show(Id){
    document.getElementById(Id).style.display="block";
}
function hide(Id){
    document.getElementById(Id).style.display="none";
}

