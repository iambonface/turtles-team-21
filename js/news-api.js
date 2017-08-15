$(document).ready(function(){
    $("#apiHeaderElement").css({"display": "none"})
    $("#sideBar").css({"display": "none"})

    var newsApiUrl = 'al-jazeera-english';
    var root = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=701dbe611d8a49a8abef3d2efa661f49';

    $.ajax({
      headers:{
        "X-APi-Key": "https://newsapi.org/v1/sources?language=en",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      url: root,
      dataType: 'json',
      method: 'GET',
      success: function(news){
        $(news).each(function(index, value){
          var articles = value.articles;
          for(var i in articles ){
            //Loop through all articles and display random news item
            var random = (Math.random() * value.length | Math.random() * articles.length)
            var news = articles[random].title;
            var author = articles[random].author;
            var url = articles[random].url;
          }
          $("#news").html(news);
          $("#news").click(function(){
            var newTabUrl = window.open(url);
            newTabUrl.focus();
          });
          if(author == null){
            $("#site").css({"display": "none"});
            $(".slash").css({"display": "none"})
          }
          $("#site").html("Author");

          $("#authorApi").html(author);
          $("#via").css({"display": "inline"})
          $("#apiHeaderElement").css({"display": "inline"})
        });
      }
    })

    function timeDisplay(){
     //Use moment.js to display 12 hour time
      $("#timeDisplay").html(moment().format('hh:mm A'));
    }
    //makes live update without reloading/refreshing browser
    setInterval(timeDisplay, 1000);

});
