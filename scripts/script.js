let tickInterval=0;
let currentStep=0;
let timeRemaining=0;
let onSeconds = 180;
let offSeconds = 120;
let lastRound = 6;

const tick = ()=>{
  timeRemaining--;
  
  if (timeRemaining<=0){
    if (currentStep<lastRound){
      
      currentStep++;
      $("#step"+currentStep).addClass("on");

      let audioName = "";
      if (currentStep%2){
        timeRemaining = onSeconds;
        audioName = "start";
        $("#time").addClass("on");
      }
      else {
        timeRemaining = onSeconds;
        audioName = "stop";
        $("#time").removeClass("on");
      }
      var audio = new Audio('mp3/'+audioName+'.mp3');
      audio.play();
    }
    else {
      clearInterval(tickInterval);
    }
  }

  $("#time").text(formatTime(timeRemaining));
}

const formatTime = (time)=>{
  let seconds = time%60;
  if (seconds<10) seconds = "0"+seconds;
  const minutes = Math.floor(time/60);
  return minutes+":"+seconds;
}

const resize = ()=>{
  const w = $(window).width();
  const timeHeight = w/3;
  $("#time").css("font-size", timeHeight+"px");
  $("body").toggleClass("small", w<310);
  $("body").toggleClass("tiny", w<250);
}
$(window).resize(resize);
resize();

const reset = ()=>{
  timeRemaining=offSeconds;
  currentStep=0;
  clearInterval(tickInterval);
  tickInterval = setInterval(tick, 1000);
  $(".step").removeClass("on");
  $("#step0").addClass("on");
  $("button").text("Reset");
}
$("button").click(reset);
