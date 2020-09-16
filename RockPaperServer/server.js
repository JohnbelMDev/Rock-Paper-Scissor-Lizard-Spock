const http = require('http');
const fs = require('fs')
const url = require('url');
const figlet = require('figlet')
const querystring = require('querystring');
// const express = require("expess")


const server = http.createServer(function(req, res) {
  const params = querystring.parse(url.parse(req.url).query);

  const page = url.parse(req.url).pathname;
  // const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if ('choices' in params) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      // let chosenButton = params['choices'];
      // console.log(chosenButton)
      let winner;
      let object = {
        randomiser: Math.floor(Math.random() * 5),
        tempProperties:["paper", "lizard", "rock", "spock", "scissor"],
        chosenButton: params['choices'],
      }
      let pick = object.tempProperties[object.randomiser];
      console.log(pick)
      function win (winner){
        winner ="";
        if (pick === object.chosenButton) {
          return winner = "its a Tie"
        } else if ((pick === "rock") && (object.chosenButton === "lizard" || object.chosenButton === "scissor")) {
          return winner = "Bot wins"
        } else if ((pick === "scissor") && (object.chosenButton === "lizard" || object.chosenButton === "paper")) {
          return winner = "Bot wins"
        } else if ((pick === "spock") && (object.chosenButton === "scissor" || object.chosenButton === "rock")) {
          return winner = "Bot wins"
        } else if ((pick === "paper") && (object.chosenButton === "spock" || object.chosenButton === "rock")) {
          return  winner = "Bot wins"
        } else if ((pick === "lizard") && (object.chosenButton === "spock" || object.chosenButton === "paper")) {
          return winner = "Bot wins"


        } else if ((object.chosenButton === "rock") && (pick === "lizard" || pick === "scissor")) {
          return winner = "You win"
        } else if ((object.chosenButton === "scissor") && (pick === "lizard" || pick === "paper")) {
          return winner = "You win"
        } else if ((object.chosenButton === "spock") && (pick === "scissor" || pick === "rock")) {
          return winner = "You win"
        } else if ((object.chosenButton === "paper") && (pick === "spock" || pick === "rock")) {
          return winner = "You win"
        } else if ((object.chosenButton === "lizard") && (pick === "spock" || pick === "paper")) {
          return winner = "You win"

        } else {
          return winner = "sorry :( byebye "
        }


      }
      win(winner)
      console.log(win(winner));
      const obj = {
        answer: win(winner)
      };


      //rock beats lizard
      //rock beats scissor

      //lizard beats paper
      //lizard beats spock

      //spock beats scissor
      //spock beats rock

      //scissor beats lizard
      //scissor beats paper

      //paper beats rock
      //paper beats spock

      res.end(JSON.stringify(obj));
    }
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
