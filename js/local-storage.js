$(document).ready(function(){
  getNotes() //gets all items of NoteTaker in localStorage

  //Making textarea to slide up or down on click states
  $('#Note').click(function(){
    if($('#Note').attr('data-click-state') == 1){
      $('#Note').attr('data-click-state', 0)
      $("#NoteBox").slideUp();
    } else {
      $('#Note').attr('data-click-state', 1)
      $("#NoteBox").slideDown();
    }
  })

  //Save data automatically to localStorage while user is typing. Set delay is 1 second
  var timeout;
  $("#NoteBox").on("input propertychange change", function(){
    console.log("changing");
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      writeNotes();
    }, 1000);
  });

//Save to localStorage
  function writeNotes(){
    var notes = $("#NoteTextArea").val();
    localStorage.setItem("notes", notes)
  }

//Retrieve from localStorage
  function getNotes(){
    var localText = localStorage.getItem("notes")
    $("#NoteTextArea").html(localText)
  }

}) //End of document.ready()
