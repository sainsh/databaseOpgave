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

var showPlayers = () =>{
    playerTable.innerHTML =""
    var req = new XMLHttpRequest();
    req.open('GET', '/rpg/showPlayers');
    req.onload = () =>{
        console.log('responsetext: ' + req.responseText);
        playerTable.insertAdjacentHTML('beforeend', req.responseText);
    }
    req.send();
}

var showCharacters = () =>{
    characterTable.innerHTML=""
    var req = new XMLHttpRequest();
    req.open('GET', '/rpg/showCharacters');
    req.onload = () =>{
        console.log('responsetext: ' + req.responseText);
        characterTable.insertAdjacentHTML('beforeend', req.responseText);
    }
    req.send();
}