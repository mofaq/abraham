
jQuery.event.add(window, "load", initPanels);
jQuery.event.add(window, "load", googleTranslateElementInit);

jQuery.event.add(window, "resize", initPanels);


$(document).ready(function() {
  $('li.primary-option').hover(

function(){$(this).stop().animate({ backgroundColor: "#b0b9e6", opacity: "0.75" }, 1)},
function(){$(this).stop().animate({ backgroundColor: "white", opacity: "0.5" }, 800)}
)});


function initPanels()
{
	var hh = 103
	var wh = $(window).height();

  var ch = (wh-hh);
	//$("#content").css('height',ph);


	$("#sidebar").css('height',ch);
	$("#panel_1").css('height',ch);
	$("#panel_2").css('height',ch);

	var pch = (ch-92)

	$(".panel-container").css('height',pch);
	$(".viewport").css('height',(pch));

  $('#scrollbar1').tinyscrollbar({ size: pch });
  $('#scrollbar2').tinyscrollbar({ size: pch });
  //alert(pch);
}

//Fadeout the backgrounds on hover


function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
