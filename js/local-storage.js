$(document).ready(function(){

  $('#Note').click(function(){
    if($('#Note').attr('data-click-state') == 1){
      $('#Note').attr('data-click-state', 0)
      $("#NoteBox").slideUp();
      getNotes()
      writeNotes()
    } else {
      $('#Note').attr('data-click-state', 1)
      $("#NoteBox").slideDown();
    }
  })

  function writeNotes(){
    var notes = $("#NoteTextArea").val();
    localStorage.setItem("notes", notes)
  }

  function getNotes(){

      var localText = localStorage.getItem("notes")
  }


})
