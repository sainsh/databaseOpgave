var playerTable = document.getElementById('playerTable')
var characterTable = document.getElementById('characterTable')

var createDatabase = function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/rpg/initDB');
    req.send();
  };

var createTables = function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/rpg/initDB/createTables');
    req.send();
}

var insertDummyData = function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/rpg/initDB/createData');
    req.send();
}

var showData = () =>{
    var req = new XMLHttpRequest();
    req.open('GET', '/rpg/showData');
    req.onload = () =>{
        console.log('responsetext: ' + req.responseText);
        tableContainer.insertAdjacentHTML('beforeend', req.responseText);
    }
    req.send();
}