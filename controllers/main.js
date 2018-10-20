var HashMap = require('hashmap');
const vaildMove = require("../controllers/validMove");
var socket = require('socket.io');
var board;
var boardArr = [];
module.exports.controller = function(req,res){
    //var x = new vaildMove.piece('Queen', 'white', 'a1');
    //x.vaildMoves = x.validMove();
    //console.log(x.vaildMoves);
    var map = new HashMap();
    board = new HashMap();
    var wPawn = ['a2','b2','c2','d2','e2','f2','g2','h2'];
    var bPawn = ['a7','b7','c7','d7','e7','f7','g7','h7'];
    var wKnight = ['b1','g1'];
    var bKnight = ['b8','g8'];
    var wBishop = ['c1','f1'];
    var bBishop = ['c8','f8'];
    var wRook = ['a1','h1'];
    var bRook = ['a8','h8'];
    var wKing = ['e1'];
    var bKing = ['e8'];
    var wQueen = ['d1'];
    var bQueen= ['d8'];

    map.set("pawn", 8);
    map.set("knight", 2);
    map.set("bishop", 2);
    map.set("rook", 2);
    map.set("king", 1);
    map.set("queen", 1);

    map.forEach(function(value, key) {
        //console.log(key + " : " + value);
        var whitePos = [];
        var blackPos = [];
        if(key == "pawn"){
            whitePos = wPawn;
            blackPos = bPawn;
        }else if(key == "knight"){
            whitePos = wKnight;
            blackPos = bKnight;
        }else if(key == "bishop"){
            whitePos = wBishop;
            blackPos = bBishop;
        }else if(key == "rook"){
            whitePos = wRook;
            blackPos = bRook;
        }else if(key == "king"){
            whitePos = wKing;
            blackPos = bKing;
        }else if(key == "queen"){
            whitePos = wQueen;
            blackPos = bQueen;
        }

        for(var x = 0; x < value; x++){
            var whitePieceCreate = new vaildMove.piece(key, 'white', whitePos[x]);
            var blackPieceCreate = new vaildMove.piece(key, 'black', blackPos[x]);
            //board.set(whitePieceCreate.position, whitePieceCreate);
            //board.set(blackPieceCreate.position, blackPieceCreate);
            var whiteP = [whitePieceCreate.position, whitePieceCreate];
            var blackP = [blackPieceCreate.position, blackPieceCreate];
            boardArr.push(whiteP);
            boardArr.push(blackP);
        }
    });

    
    /*
    board.forEach(function(value, key) {
        console.log(key + " : " + value.type);
    });

    console.log(board.size);
    */

    res.render('index', { title: 'Chess Online' });
};

// Controller agrees to implement the function called "respond"
module.exports.respond = function(endpoint,socket){
    // this function now expects an endpoint as argument

    socket.on('findPosition',function(data){
        // as is proper, protocol logic like
        // this belongs in a controller:
        console.log(data.message);
        //console.log(boardArr);
        endpoint.emit('newPositions',boardArr); // broadcast news to everyone subscribing
                                     // to our endpoint/namespace
    });
}