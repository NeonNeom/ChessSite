var HashMap = require('hashmap');
module.exports.controller = function(req,res){

    function Piece(type, color, position){
    this.type = type;
    this.color = color;
    this.position = position;
    }
    var colArr = [97,98,99,100,101,102,103,104];
    var rowArr = [1,2,3,4,5,6,7,8];

    Piece.prototype.validMove = function(){
    var arr = [];
    var pawnReg = new RegExp('^.2');
    var colPos = this.position.charAt(0).charCodeAt(0);
    var rowPos = this.position.charAt(1).charCodeAt(0);
    switch(this.type.toLowerCase()) {
        case "pawn":
            console.log("Finding valid Pawn moves from this position....");

            //tests to see if pawn is at start position
            if(pawnReg.test(this.position)){
            console.log("Regex works!!!");
            arr.push(this.position.charAt(0) + String.fromCharCode(++rowPos));
            arr.push(this.position.charAt(0) + String.fromCharCode(++rowPos));
            }else{
            arr.push(this.position.charAt(0) + String.fromCharCode(++rowPos));
            }
            break;
        case "rook":
            console.log("Finding valid Rook moves from this position....");
            var colHigh = new Number(colPos);
            var colLow = new Number(colPos);
            var rowHigh = new Number(rowPos);
            var rowLow = new Number(rowPos);
            
            console.log(colPos);
            console.log(rowPos);
            for (var i = 0; i < 7; i++) {
            if(++colHigh < 105){
                arr.push(String.fromCharCode(colHigh) + this.position.charAt(1));
            }else if(--colLow > 96){
                arr.push(String.fromCharCode(colLow) + this.position.charAt(1));
            }

            if(++rowHigh < 57){
                arr.push(this.position.charAt(0) + String.fromCharCode(rowHigh));
            }else if(--rowLow > 48){
                arr.push(this.position.charAt(0) + String.fromCharCode(rowLow));
            }

            }
            break;
        case "knight":
            console.log("Finding valid Knight moves from this position....");
            var one = 1;
            var two = 2;
            var rowN1 = true;
            var rowP1 = true;
            for(var n = 0; n < 2; n++){
            if(colPos + one < 105){
                if(colPos + two < 105){
                if(rowPos-1 > 48){
                    arr.push(String.fromCharCode(colPos + two) + String.fromCharCode(rowPos-1));
                }else{
                    rowN1 = false;
                }
                if(rowPos+1 < 57){
                    arr.push(String.fromCharCode(colPos + two) + String.fromCharCode(rowPos+1));
                }else{
                    rowP1 = false;
                }
                }
                if(rowN1 && rowPos-2 > 48){
                arr.push(String.fromCharCode(colPos + one) + String.fromCharCode(rowPos-2));
                }
                if(rowP1 && rowPos+2 < 57){
                arr.push(String.fromCharCode(colPos + one) + String.fromCharCode(rowPos+2));
                }
            }
            one = -1;
            two = -2;
            }
            break;
        case "bishop":
            console.log("Finding valid Bishop moves from this position....");
            var count = 1;
            var foundItem = false;

            for(var n = 0; n < 7; n++){
            if((colPos + count < 105) && (rowPos + count < 57)){
                arr.push(String.fromCharCode(colPos + count) + String.fromCharCode(rowPos + count));
                foundItem = true;
            }
            if((colPos + count < 105) && (rowPos - count > 48)){
                arr.push(String.fromCharCode(colPos + count) + String.fromCharCode(rowPos - count));
                foundItem = true;
            }
            if((colPos - count > 96) && (rowPos + count < 57)){
                arr.push(String.fromCharCode(colPos - count) + String.fromCharCode(rowPos + count));
                foundItem = true;
            }
            if((colPos - count > 96) && (rowPos - count > 48)){
                arr.push(String.fromCharCode(colPos - count) + String.fromCharCode(rowPos - count));
                foundItem = true;
            }

            if(!foundItem){
                break;
            }
            foundItem = false;
            count++;
            }


            break;
        case "queen":
            console.log("Finding valid Queen moves from this position....");
            arr = findKingQueen(colPos, rowPos, 'queen');
            break;
        case "king":
            console.log("Finding valid King moves from this position....");
            arr = findKingQueen(colPos, rowPos, 'king');
            break;
    }
    return arr;
    }

    function findKingQueen(colPosition, rowPosition , kingOrQueen){
    var piece = kingOrQueen;
    var arr = [];
    var colPos = colPosition;
    var rowPos = rowPosition;
    var foundItem = false;
    var count = 1;
    var loopSize = 0;
    if(piece.toLowerCase() == 'queen'){
        loopSize = 7;
    }else{
        loopSize = 1;
    }
    for(var n = 0; n < loopSize; n++){
            if(colPos + count < 105){
                if(rowPos + count < 57){
                arr.push(String.fromCharCode(colPos + count) + String.fromCharCode(rowPos + count));
                }
                if(rowPos - count > 48){
                arr.push(String.fromCharCode(colPos + count) + String.fromCharCode(rowPos - count));
                }
                arr.push(String.fromCharCode(colPos + count) + String.fromCharCode(rowPos));
                foundItem = true;
            }
            if(colPos - count > 96){
                if(rowPos + count < 57){
                arr.push(String.fromCharCode(colPos - count) + String.fromCharCode(rowPos + count));
                }
                if(rowPos - count > 48){
                arr.push(String.fromCharCode(colPos - count) + String.fromCharCode(rowPos - count));
                }
                arr.push(String.fromCharCode(colPos - count) + String.fromCharCode(rowPos));
                foundItem = true;
            }
            if(rowPos + count < 57){
                arr.push(String.fromCharCode(colPos) + String.fromCharCode(rowPos + count));
                foundItem = true;
            }
            if(rowPos - count > 48){
                arr.push(String.fromCharCode(colPos) + String.fromCharCode(rowPos - count));
                foundItem = true;
            }
            if(!foundItem){
                break;
            }
            foundItem = false;
            count++;
    }
    return arr;
    }

    var x = new Piece('Queen', 'white', 'a1');

    x.validMove();
    var map = new HashMap();
    map.set("","");

    res.render('index', { title: 'Chess Online' });
};
