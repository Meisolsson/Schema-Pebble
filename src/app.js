var i = 0;
var info;
var days = [1,2,4,8,16];
var d = new Date();
var j = d.getDay()-1;
if(j===0-1||j===5){
  j=0;
}

getData(days[j]);
function getData(day){
  i=0;
  simply.title("Laddar",true);
  ajax({ url: 'http://hemserver.dmz.se/info?day='+day }, function(data){
    info = JSON.parse(data);
    updateBody(i,info);
  });
}

function updateBody(i,data){
  simply.subtitle("");
  var lektioner = data.lektioner;
  var body = lektioner[i].typ + "\n" + lektioner[i].room + "\n" + lektioner[i].teacher + "\n" + lektioner[i].start+ " - " + lektioner[i].end;
  simply.title(data.day);
  simply.body(body);
}

simply.on('singleClick', function(e) {
  if(e.button === "up"){
    --i;
    if(i<0){
      i=0;
    }else{
      updateBody(i,info);
    }
  }else if(e.button === "down"){
    ++i;
    if(i===info.length){
      i=info.length-1;
    }else{
      updateBody(i,info);
    }
  }
});

simply.on('longClick', function(e) {
  if(e.button === "up"){
    --j;
    if(j<0){
      j=0;
    }else{
      getData(days[j]);
    }
  }else if(e.button === "down"){
    ++j;
    if(j===days.length){
      j=days.length-1;
    }else{
      getData(days[j]);
    }
  }
});