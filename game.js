var buttonColours = ["red", "blue", "green", "yellow"]; // button의 색깔들

var gamePattern = []; // 게임내 패턴을 저장한 배열
var userClickedPattern = []; // 유저가 클릭한 패턴의 배열
var level = -1; // 게임 난이도

// 버튼 클릭시 
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if(level > -1){
        userClickedPattern.push(userChosenColour); // 클릭한 버튼의 색을 유저 패턴 배열에 저장
        checkAnswer(userClickedPattern.length-1);
        console.log("user:"+userClickedPattern);
        console.log("game:"+gamePattern);
    }
});

// 다음 패턴
function nextSequence() {

    // 랜덤한 패턴 생성후 게임 패턴배열에 추가
    var randomNumber = Math.floor(Math.random() * 4); // 0 ~ 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

// 해당 버튼에 맞는 소리 플레이 함수
function playSound(colour) {

    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

// 클릭한 버튼 0.1초간 회색 박스 후 복구
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// 처음 press A key to start
document.addEventListener('keydown', (event)=>{
    if(event.key === 'a' || event.key === 'A'){
        if(level === -1){ nextSequence(); }
    }
});

// 게임 패턴 이후 유저 패턴 찍을 때 함수
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){ // gamePattern과 userClickPattern의 각 인덱스 끼리 값 비교
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){ // userClickPattern의 값 갯수와 gamePattern의 값 갯수가 동일 할 때
            setTimeout( nextSequence, 1000); // 1초뒤 다시 실행
            userClickedPattern = []; // 초기화
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout( ()=>{
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press A key to Restart");
        startOver();
    }
}

function startOver(){
    level=-1;
    userClickedPattern = [];
    gamePattern = [];
}