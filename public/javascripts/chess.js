$(document).ready(function(){
    var x = 8;
    $(".row").each(function(index) {
      console.log( index + ": " + $( this ).text());
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
    
    
    var piece = {
        type:"pawn",
        color:"white",
        position:"d1"
    };
    
    
    
});