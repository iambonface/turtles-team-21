$(document).ready(function(){
  getNotes() //gets all items of NoteTaker in localStorage
  var todoList = [] //Stores all todos
  getTodo();
  TodoDisplay();
  $("#Option").css("display","none") //Disable Option for future refactoring

  //Making textarea to slide up or down on click states
  $('#Note').click(function(){
    if($('#Note').attr('data-click-state') == 1){
      $('#Note').attr('data-click-state', 0)
      $("#NoteBox").slideUp();
    } else {
      $('#Note').attr('data-click-state', 1)
      $("#NoteBox").slideDown();
    }
  });


  //Save data automatically to localStorage while user is typing. Set delay is 1 second
  var timeout;
  $("#NoteBox").on("input propertychange change", function(){
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

//Retrieve Notes from localStorage
  function getNotes(){
    var localText = localStorage.getItem("notes")
    $("#NoteTextArea").html(localText)
  }

  //Making todo to slide up or down on click states
  $('#Todo').click(function(){
    if($('#Todo').attr('data-click-state') == 1){
      $('#Todo').attr('data-click-state', 0)
      $("#TodoBox").slideUp();
    } else {
      $('#Todo').attr('data-click-state', 1)
      $("#TodoBox").slideDown();
    }
  })

  $("#TodoInput").on('keyup', function (e) {
     /* Detecting enter key in input field */
     if(e.keyCode == 13){
       saveTodo()
      }
   })

  //save Todos
  function saveTodo(){
    $("#TodoStatus").css({
      "display": "none"
    })
    var inputValue = $("#TodoInput").val()

    if(todoList.includes(inputValue)){
      $("#TodoStatus").html("My Fear is Repetition (Max Frisch)")
      $("#TodoStatus").css({
        "display": "block",
        "background-color": "rgba(0,0,0,0.9)",
        "color": "#ff5978",
        "letter-spacing": "1px"
      })
    } else {
      $("#TodoStatus").css("display", "none")
      todoList.push(inputValue)
      var jsonStr = JSON.stringify(todoList);
      localStorage.setItem("task", jsonStr);

      $("#TodoInput").val('') //Clear inputfield

      var newTodo = '<div class="todo-panel" title="Click to delete if completed"><div class="todo-input"><span id="TodoSpan" data="key">'
                    + inputValue +
                  '</span></div></div>'

        $("#TodoDisplay").append(newTodo);

        $('#TodoDisplay').on('click', '.todo-input', function(e) {
          /*Target child, check if element content is in localstorage and delete both el and content */
          var _this = this;
        // e.preventDefault();
          swal({
                title: "Are you sure this is done?",
                text: "You will not be able to recover this task once deleted!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, I am sure!',
                cancelButtonText: "No, please wait!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    swal({
                        title: 'Deleted!',
                        text: 'This task is successfully deleted!',
                        type: 'success'
                    }, function() {
                      var childContents = $(_this).children().html()
                        todoList.forEach(function(localStorageItem){
                          if(localStorageItem === childContents){
                            todoList.splice(todoList.indexOf(localStorageItem), 1) //Find the exact index position of the contents
                            localStorage.setItem("task", JSON.stringify(todoList))
                          }
                        })
                        $(_this).parent().remove() //Remove the element after deleting in localstorage
                        TodoDisplay();
                    });

                } else {
                    swal("Cancelled", "Your task is still pending! Work harder! :)", "error");
                    $(".todo-panel").css("background","none")
                }
            });

          }); //end of onclick event
    }

   }

  //Retrieve Todos from localStorage
    function getTodo(){
      var str = localStorage.getItem("task");
      todoList = JSON.parse(str);
      if(todoList){ /* Check if todo in storage, Iterate and display each */
        todoList.forEach(function(item){
        var newTodo = '<div class="todo-panel" title="Click to delete if completed"><div class="todo-input"><span id="TodoSpan" data="key">'
                      + item +
                    '</span></div></div>'

        $("#TodoDisplay").append(newTodo);
        })
      }else{
        todoList = []
      }

      TodoDisplay()

      $('#TodoDisplay').on('click', '.todo-input', function(e) {
        /*Target child, check if element content is in localstorage and delete both el and content */
        var _this = this;
        //e.preventDefault();
        swal({
              title: "Are you sure this is done?",
              text: "You will not be able to recover this task once deleted!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Yes, I am sure!',
              cancelButtonText: "No, please wait!",
              closeOnConfirm: false,
              closeOnCancel: false
          },
          function(isConfirm) {
              if (isConfirm) {
                  swal({
                      title: 'Deleted!',
                      text: 'This task is successfully deleted!',
                      type: 'success'
                  }, function() {
                    var childContents = $(_this).children().html()
                      todoList.forEach(function(localStorageItem){
                        if(localStorageItem === childContents){
                          todoList.splice(todoList.indexOf(localStorageItem), 1) //Find the exact index position of the contents
                          localStorage.setItem("task", JSON.stringify(todoList))
                        }
                      })
                      $(_this).parent().remove() //Remove the element after deleting in localstorage
                      TodoDisplay();
                  });

              } else {
                  swal("Cancelled", "Your task is still pending! Work harder! :)", "error");
                  $(".todo-panel").css("background","none")
              }
          });

        }); //end of onclick event

   }

      function TodoDisplay(){
        if(todoList.length === 0 ){
          $("#TodoStatus").html("Nothing Todo Today!")
          $("#TodoStatus").css({
            "display": "block"
          })
        }
      }

    $(".todo-panel").click(function(){
      $(this).css("background","#5978ff")
    })


}) //End of document.ready()
