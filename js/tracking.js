var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-105779418-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//Event handling
function trackButtonClick(e) {
   _gaq.push(['_trackEvent', e.target.id, 'clicked']);
 };

var anchors = document.querySelectorAll('a');
for (var i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', trackButtonClick);
}

var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', trackButtonClick);
}

var fontAwesomeIcons = document.querySelectorAll('i');
for (var i = 0; i < fontAwesomeIcons.length; i++) {
  fontAwesomeIcons[i].addEventListener('click', trackButtonClick);
}

var divs = document.querySelectorAll('div');
for (var i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', trackButtonClick);
}

var spans = document.querySelectorAll('span');
for (var i = 0; i < spans.length; i++) {
  spans[i].addEventListener('click', trackButtonClick);
}

var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('click', trackButtonClick);
}
