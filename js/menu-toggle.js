$(document).ready(function(){
  var linkList = [] //Stores all links
  getQuickLinks() //get the links to auto display upon page reload
  //console.log(JSON.stringify(linkList))

  $("#MenuButtonBox").css("display", "none");
  $('#Menu').attr('data-click-state', 1)

  $('#Menu').click(function(){
    if($('#Menu').attr('data-click-state') == 1){
      $('#Menu').attr('data-click-state', 0)
      $("#MenuButtonBox").slideDown();
    } else {
      $('#Menu').attr('data-click-state', 1)
      $("#MenuButtonBox").slideUp();
    }
  })

  $(".google-link").click(function(){
    window.open("https://www.google.com");
    return false;
  })
  $(".youtube-link").click(function(){
    window.open("https://www.youtube.com");
    return false;
  })
  $(".facebook-link").click(function(){
    window.open("https://www.facebook.com");
    return false;
  })
  $(".linkedin-link").click(function(){
    window.open("https://www.linkedin.com");
    return false;
  })

  $(".twitter-link").click(function(){
    window.open("https://www.twitter.com");
    return false;
  })

  //Add custom quick links dynamically
  $('#QuickLink').attr('data-click-state', 1)
  $('#QuickLink').click(function(){
      if($('#QuickLink').attr('data-click-state') == 1){
        $('#QuickLink').attr('data-click-state', 0)
        var newLink = '<div id="WebsiteInput"><input placeholder="Unique Title" id="WebsiteTitle" class="input-link"/><br/>'
        +'<input placeholder="Website(http:// required)" id="WebsiteUrl" class="input-link"/></div>'
        $("#MenuButtonBox").append(newLink);
        $("input.input-link").css({
          "width": "200px",
          "background" : "rgba(0,0,0,0.5)",
          "border": "none",
          "color" : "rgb(255,255,255)",
          "padding": "4px"
        })

        $("#WebsiteUrl").on('keyup', function (e) {
           /* Detecting enter key in input field */
           if(e.keyCode == 13){
             var title = $("#WebsiteTitle").val();
             var websiteUrl = $("#WebsiteUrl").val();
             var newUrl = '<span class="link-wrap" id="LinkWrap"><a href="'+websiteUrl+'" id="ButtonLink" type="button" class="btn btn-primary" target="_blank">'+
               '<img src="https://user-images.githubusercontent.com/16631356/29923175-34913e50-8e61-11e7-9d78-0111d1d26eb1.png" class="pull-left"></img>'+
               '<span class="pull-right innerUrl">' + title + '</a><i class="fa fa-trash-o delete-link" title="Delete '+title+'"></i></span>'
              $("#MenuButtonBox").append(newUrl);
             linkObj = {} //declare empty object to store title and url as key value pair
             $("#WebsiteTitle").val('');  //Reset input
             $("#WebsiteUrl").val(''); //Reset input
             $("#WebsiteInput").remove();

             linkObj[title] = websiteUrl  //assign key value pair

             //console.log(linkObj)
             linkList.push(linkObj)
             var jsonstr = JSON.stringify(linkList);
             localStorage.setItem("quickLink", jsonstr);

             $(".delete-link").click(function(){
                 var contents = $(".innerUrl").html()
                 for(var i in linkList){
                     var key = i;
                     var value = linkList[i];
                     for(var j in value){
                         var sub_key = j;
                         var sub_value = value[j];
                         if(sub_key === contents){
                           linkList.splice(i,1);
                           localStorage.setItem("quickLink", JSON.stringify(linkList))
                         }
                     }
                 }
                 $("#LinkWrap").remove() //Remove the element after deleting in localstorage
             })

             $('#QuickLink').attr('data-click-state', 1)

           }
            $("#ImgCancel").click(function(){
              $('#QuickLink').attr('data-click-state', 1)
              $("#ButtonLink").remove()
            })
         })

      } else {
        $('#QuickLink').attr('data-click-state', 1)
        $("#WebsiteInput").remove();
      }


  })

  function getQuickLinks(){
    var linkArr = localStorage.getItem("quickLink");
    linkList = JSON.parse(linkArr);
    if(linkList){
      linkList.forEach(function(obj){
      var newUrl = '<span class="link-wrap" id="LinkWrapObj"><a href="'+Object.values(obj)+'" id="ButtonLink" type="button" class="btn btn-primary" target="_blank">'+
        '<img src="https://user-images.githubusercontent.com/16631356/29923175-34913e50-8e61-11e7-9d78-0111d1d26eb1.png" class="pull-left"></img>'+
        '<span class="pull-right innerUrlObj">' + Object.keys(obj) + '</a><i class="fa fa-trash-o delete-link-obj" title="Delete '+Object.keys(obj)+'"></i></span>'

       $("#MenuButtonBox").append(newUrl);

      })
      $(".delete-link-obj").click(function(){
          var objContents = $(".innerUrlObj").html()
          for(var i in linkList){
              var key = i;
              var value = linkList[i];
              for(var j in value){
                  var sub_key = j;
                  var sub_value = value[j];
                  if(sub_key === objContents){
                    linkList.splice(i,1);
                    localStorage.setItem("quickLink", JSON.stringify(linkList))
                  }
              }
          }
          $("#LinkWrapObj").remove() //Remove the element after deleting in localstorage
      })

    }else{
      linkList = []
    }

  }


});
