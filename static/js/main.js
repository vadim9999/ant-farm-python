// document.getElementById("TextBlock").innerHTML = 100;


loadDoc();
window.setInterval(function(){
//  loadDoc()
}, 5000)

// ***********************Socket*****************
// console.log("Executing")
// var socket = new WebSocket('ws://' + window.location.hostname + ':8084/');
//
// socket.onopen = function(){
// console.log('Connection is set')
// socket.send("Hi I am from client")
// }

//console.log(socket)
// socket.onmessage = function(event){
// console.log(event.data)
// }

// socket.onclose = function(event) {
// if(event.wasClean){
// console.log('Connection was Closed')
// }
// else{
// console.log("connection was killed")
// }
// console.log('Code ' + event.code + ' reason '+ event.reason)
// }
// *********************************************
var h1 = document.getElementById('stopWatch'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    document.getElementById("blinkingCircle").style.backgroundColor = "red";
    document.getElementById("blinkingCircle").style.animation = "blinker 1.5s cubic-bezier(.5, 0, 1, 1) infinite alternate"
    t = setTimeout(add, 1000);
}
// timer();


/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
    document.getElementById("blinkingCircle").style.backgroundColor = "";
    document.getElementById("blinkingCircle").style.animation = ""
}

/* Clear button */
clear.onclick = function() {
    h1.innerHTML = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}



   function loadDoc(){

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var data = document.test_form.test_text.value;
        sensors = JSON.parse(this.responseText)
      console.log(data);
      document.getElementById("TextBlock").innerHTML = this.responseText ;
      document.getElementById("sotTemp").innerHTML = sensors[0][0] ;
      document.getElementById("sotHum").innerHTML = sensors[0][1] + "%";
      document.getElementById("humidityCircle").setAttribute("stroke-dasharray",(sensors[0][1] + " 135"));
      let sotHum = sensors[0][1];
      // document.getElementById("humAnimation").setAttribute("values",
      // ("0 200; " + ((sotHum/6) + " 180; ") + ((sotHum/4) + " 150; ") + ((sotHum/7) + " 135; ") + (sensors[0][1] + " 135; ")+(sensors[0][1] + " 135; ")));

      document.getElementById("arenaTemp").innerHTML = sensors[1][0] ;
      document.getElementById("arenaHum").innerHTML = sensors[1][1] ;
      document.getElementById("roomTemp").innerHTML = sensors[2][0] ;
      document.getElementById("roomHum").innerHTML = sensors[2][1] ;
// Water level
      switch(sensors[3]){
      case 1:
        document.getElementById("waterLvlLow").innerHTML = 1;
        document.getElementById('topWater').style.background = "red";
        document.getElementById('sky').style.height = '80%';
        break;
      case 2:
        document.getElementById("waterLvlMiddle").innerHTML = 1;
        document.getElementById('topWater').style.background = "orange";
        document.getElementById('sky').style.height = '50%';
        break;
      case 3:
        document.getElementById("waterLvlHigh").innerHTML = 1;
        document.getElementById('topWater').style.background = "green";
        document.getElementById('sky').style.height = '20%';
        break;
      }
      console.log("Response");
      console.log(JSON.parse(this.responseText));
    }
  }
  xhttp.open("GET","/sensors", true);
  xhttp.send();
}

function test(){
  console.log("_____test______");
  userId = getUrlParam('id', 'Empty')
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if(this.readyState == 4) {
        console.log("TEST");
        // console.log(this.responseText);
      }
    }
    xhttp.open("POST","/test?id=" + userId, true);
    xhttp.send(12);
}
// --------------video files
function getVideoFiles(){
	userId = getUrlParam('id', 'Empty')
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.log("get video files");
        var response = this.responseText; 
        var data = response.substring(2,response.length-2)
        var fileNames = data.split("', '");
        console.log(fileNames)
        console.log(data)
        document.getElementById("fileList").innerHTML = "";
        
        fileNames.forEach(video => {
          var a = document.createElement('a');
          a.className = "list-group-item list-group-item-action";
          a.innerHTML = video;
          a.href="#";
          console.log(a);
          
          document.getElementById("fileList").appendChild(a);
        });
        // var a = document.createElement('a');
        // a.className = "list-group-item list-group-item-action";
        // a.innerHTML = "OKOK";
        // console.log(a);
        // document.getElementById("fileList").innerHTML = "";
        // document.getElementById("fileList").appendChild(a);
        // var videoFiles = JSON.parse(this.responseText)
        // console.log(videoFiles)
        console.log(this.responseText);
      }
    }
    xhttp.open("GET","/videos?id=" + userId, true);
    xhttp.send();
}
function buildFiles(){
  // <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
  var a = document.createElement('a');
  a.className = "list-group-item list-group-item-action";
  a.innerHTML = "OKOK";
  console.log(a);
  document.getElementById("fileList").innerHTML = "";
  document.getElementById("fileList").appendChild(a);
}
// ----------------------------------------
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

// -------preview---------

function stopPreview(){
userId = getUrlParam('id', 'Empty')
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4) {
      console.log("POST");
      console.log(this.responseText);
    }
  }
  xhttp.open("POST","/stop?id=" + userId, true);
  xhttp.send(12);
}

function startPreview(){
  userId = getUrlParam('id', 'Empty')
  var xhttp = new XMLHttpRequest();
  streamUrl =location.protocol + "//" + location.host + "/stream.mjpg?id=" + userId;
  console.log(streamUrl);

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {

      console.log("GET /start _____");
      console.log(this.responseText);
      document.getElementById('badge').src = streamUrl;
    }
  }
  xhttp.open("GET","/start?id=" + userId, true);
  xhttp.send();

}

// -------------------

// ----------stream-------------
function startStream(){
  userId = getUrlParam('id', 'Empty')
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange
  = function() {
    if(this.readyState == 4) {
      console.log("POST /start_stream");
      console.log(this.responseText);
    }
  }
  xhttp.open("POST","/start_stream?id=" + userId, true);
  xhttp.send(33);
  waitStartPreview()
}

function stopStream(){
  userId = getUrlParam('id', 'Empty')
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange
  = function() {
    if(this.readyState == 4) {
      console.log("POST /stop_stream");
      console.log(this.responseText);
    }
  }
  xhttp.open("POST","/stop_stream?id=" + userId, true);
  xhttp.send(12);

}

function waitStartPreview(){
  userId = getUrlParam('id', 'Empty')
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange
  = function() {
    if(this.readyState == 4) {
      console.log("POST /wait_start_preview");
      console.log(this.responseText);
      startPreview()
    }
  }
  xhttp.open("POST","/wait_start_preview?id=" + userId, true);
  xhttp.send(22);
}

// ---------------------
// ---------Video-Record----------
function startRecord(){
  console.log("starting recording");
  document.getElementById("stop-record").removeAttribute("disabled")
  document.getElementById("start-record").disabled = "true"
  console.log(document.getElementById("start-record-input").value)
  var filename = document.getElementById("start-record-input").value
  userId = getUrlParam('id', 'Empty')

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange
  = function() {
    if(this.readyState == 4) {
      console.log("POST /start_record");
      console.log(this.responseText);
    }
  }
  xhttp.open("POST","/start_record?id=" + userId, true);
  xhttp.send(filename);
}

function stopRecord(){
  document.getElementById("start-record").removeAttribute("disabled")
  document.getElementById("stop-record").disabled = "true"
  userId = getUrlParam('id', 'Empty')
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange
  = function() {
    if(this.readyState == 4) {
      console.log("POST /stop_record");
      console.log(this.responseText);
    }
  }
  xhttp.open("POST","/stop_record?id=" + userId, true);
  xhttp.send(33);
}
// -----------------------
