$(document).ready(function(){

	$("#Switch").click(function(){
		if($("#Switch").attr("data-click-state") == 1){
			$("#Switch").attr("data-click-state", 0)
			animationBackground()

		}else{
			$("#Switch").attr("data-click-state", 1)

			 videoBackground() //Show some background just incase video goes awful
			//
			$("body").append('<video id="BackgroundVideo" autoplay loop poster="https://trello-attachments.s3.amazonaws.com/5963489ba4e9576a5c7a84da/59634b220e614f9aca825e05/8ed588af6b186a8a87027d8e7ef3c924/bird.jpg">'
			 	+'<source src="http://mazwai.com/system/posts/videos/000/000/182/original/gone_Fishin.mp4?1442362157" "type="video/mp4">'
			 	+'Sorry your browser does not support HTML5 video tag!</video>')
    		$("#BackgroundVideo").css({
    			"position":"absolute", //Will make video play in full screen
				"top": "0px", 
				"left": "0px",
				"min-width": "100%", 
				"min-height": "100%",
				"z-index": "-1" //Video to go in background  and everything in front
    		})

     	}
	})

	function videoBackground(){
		$('body').css({
			"background-color": "#374d7c",
			"animation": "none"
		})
	}

	function animationBackground(){
		$("video").remove()
		$('body').css({
			"background-color":"#fff",
			"-webkit-animation": "random-kit 25s ease-out infinite",
			"animation": "random-kit 25s ease-out infinite",
		})
	}

});
