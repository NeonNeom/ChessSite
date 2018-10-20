$(document).ready(function(){
    var x = 8;
    $(".row").each(function(index) {
      //console.log( index + ": " + $( this ).text());
        $(this).attr('id', x);
        
        $(this).hover(function(){
            $("#output").html("Region " + $(this).attr('id'));
        });
        x--;
    });
    
    $("#board").mouseleave(function(){
        $("#output").html("Output");
    });
    
    $(".cell").click(function(){
        $("#cellOutput").html($(this).attr('id'));
    });
    
    var socket = io.connect('http://localhost:3000/position');

    socket.emit('findPosition',{message:"Looking for positions..."});

    socket.on('newPositions', function(data){
        //var n = 1; 
        for(var z = 0; z < data.length; z++){
            var y = $('#'+ data[z][0]).position();
            //console.log(data[z][0] + " " + data[z][1]);
            //$('#'+ data[z][1].position).css("background-color", "yellow");
            //$('#'+ data[z][0]).html(data[z][1].type);
            $(".cellPiece:eq("+ z +")").css({"left": y.left,"top": y.top, "background-image":"url(\"../images/"+ data[z][1].color + data[z][1].type + ".png\")"});
            //n++; 
            //console.log("Position of "+ data[z][0] +" : left = " + y.left + " right = " + y.top);
        }

    });
    
});