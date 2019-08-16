// Joseph Szul 
// Jef Gardner 
// Final Project javascript file
// Uses archeology board from HW#4 but 
// incorporates Drag/Drop feature from jQuery UI
$(function () {
  tryDig = function(targetCell){
    var targetObj = board.dig(targetCell);
	if(board.marked[targetCell] == false)
	{
	board.marked[targetCell] = true
    if (targetObj) {
      $("#message").text('Success finding the ' + targetObj.name);
	  $("#totalAttempts").text(parseInt($("#totalAttempts").text())+1);
	  $("#totalSuccess").text(parseInt($("#totalSuccess").text())+1);
		if(targetObj.name === "dug"){
			console.log("it is a dug name");
		}
      $("#cell"+targetCell).html("<img src=\"assets/"+targetObj.name+".png\">");
      $("#"+targetObj.name+"Remaining").text(targetObj.size-targetObj.successes);
	  if(targetObj.size-targetObj.successes == 0)
	  {
		  $("#message").text('Success finding the entire ' + targetObj.name);
		  $("#totalFound").text(parseInt($("#totalFound").text())+1);
		  if(parseInt($("#totalFound").text()) == board.ruins.length)
		  {
			  alert("You found all the artifacts! Check how you did below the board! Click reset to play again!");
			  var mode = $('input[name=mode]:checked').val();
			  var unsuccess = parseInt($("#totalUnsuccess").text());
			  if(mode == "easy")
			  {
			  	if(unsuccess < 5)
			  	{
			  		$("#foots").append("<label> You did excellent</label>");
			  	}
			  	else if(unsuccess > 5 && unsuccess < 10)
			  	{
			  		$("#foots").append("<label> You did good</label>");
			  	}
			  	else if(unsuccess > 10)
			  	{
			  		$("#foots").append("<label> You did terrible</label>");
			  	}
			  }
			  else
			  {
			  	if(unsuccess < 10)
			  	{
			  		$("#foots").append("<label> You did excellent</label>");
			  	}
			  	else if(unsuccess > 10 && unsuccess < 25)
			  	{
			  		$("#foots").append("<label> You did good</label>");
			  	}
			  	else if(unsuccess > 25)
			  	{
			  		$("#foots").append("<label> You did terrible</label>");
			  	}
			  }
		  }
	  }
    }
    else {
		$("#cell"+targetCell).html("<img src='Shovel.png'>").css('background-color', 'white');
		$("#message").text('Unsuccessful dig');
		$("#totalAttempts").text(parseInt($("#totalAttempts").text())+1);
		$("#totalUnsuccess").text(parseInt($("#totalUnsuccess").text())+1);
    	//$("#cell"+targetCell).html("<img src=\"assets/dug.png\">").css('color', 'green');
    	}
	}
  };
  
	board = new GameBoard(true); 
	board.cellMarker = "<img src='assets/grass.png' id='drop'/>"; 
	board.setBoard(); 
	// $(".square").click(function (){
 //   	//var elem = this.id.substring(4,6);
 //   	var targetObj = board.dig(elem);
 //   	tryDig(elem);
	// })
	
	$("#shovel").draggable({revert: 'valid',
						  helper:'clone'
						  });	
	
	$(".square").droppable({
	   accept: "#shovel",
	   tolerance: "pointer",
	   snap: ".square",
	   drop : function(event, ui){
		  // $(this).append($(ui.helper).clone());
		   //$(this).children('img').attr('src', "Shovel.png");
		   console.log(event, ui);
		   var getGrass = $(this).children();
		   var elem = this.id.substring(4);
		   	console.log(elem);
		   	var targetObj = board.dig(elem);
		  	tryDig(elem);
	   }
    });
	$('.sm').smartmenus({
    showFunction: function($ul, complete) {
      $ul.slideDown(250, complete);
    },
    hideFunction: function($ul, complete) {
     $ul.slideUp(250, complete); 
    }
  });
	buildDataTable(board);
		$('input[type=radio][name=mode]').change(function() {
        reset();
        }
    );
   
});

function buildDataTable(board)
{
	var htmlstring = ''; 
	htmlstring+= "<thead><tr><th>Artifact Name</th><th>Artifact Icon</th><th>Artifact Size</th><th>Artifact Size Left to Uncover</th></tr></thead><tbody>"; 
	$.each(board.ruins, function(index, ruin) {
		htmlstring+="<tr><td class=\"data\">"+ruin.name+"</td><td class=\"data\"><img src=\"assets\\"+ruin.name+".png\"></td><td class=\"data\">"+ruin.size+"</td><td id=\""+ruin.name+"Remaining\" class=\"data\">"+ruin.size+"</td></tr>";
	});
    htmlstring+="</tbody>";
	$('#dataTable').html(htmlstring);
}
function reset()
{
	var mode = $('input[name=mode]:checked').val();
	board = new GameBoard(mode);
	board.cellMarker = "<img src='assets/grass.png' id='drop'/>"; 
	board.setBoard(); 
	$(".square").click(function (){
    	//var elem = this.id.substring(4,6);
    	var targetObj = board.dig(elem);
    	tryDig(elem);
   })
	
   $("#shovel").draggable({revert: 'valid',
						  helper:'clone'
						  });	
	
  $(".square").droppable({
	   accept: "#shovel",
	   tolerance: "pointer",
	   snap: ".square",
	   drop : function(event, ui){
		  // $(this).append($(ui.helper).clone());
		   $(this).children('img').attr('src', "Shovel.png");
		   console.log(event, ui);
		   var getGrass = $(this).children();
		   var elem = this.id.substring(4);
		   	console.log(elem);
		   	var targetObj = board.dig(elem);
		  	tryDig(elem);
	   }
    });
    $("#totalAttempts").text("0");
    $("#totalSuccess").text("0");
    $("#totalUnsuccess").text("0");
    $("#totalFound").text("0");
    $("#message").text("");
    $("#foots").html("<p>Your rating:</p>");
	buildDataTable(board);
}