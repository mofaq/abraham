
jQuery.event.add(window, "load", initPanels);
//jQuery.event.add(window, "load", googleTranslateElementInit);

jQuery.event.add(window, "resize", initPanels);

$(function () {
	var tabContainers = $('div.tab-container > div');
	tabContainers.hide().filter(':first').show();
	
	$('div.tab-container ul.tabs a').click(function () {
		tabContainers.hide();
		tabContainers.filter(this.hash).show();
		$('div.tab-container ul.tabs a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	}).filter(':first').click();
});


$(document).ready(function() {
  $('.primary-options li').hover(

      function(){
        $(this).stop().animate({ color:"#ffffff", backgroundColor: "#b0b9e6", opacity: "0.75" }, 1);
        //$(this).$('.tiny').stop().animate({ color:"#ffffff" }, 1)
      },
      function(){
        $(this).stop().animate({ color:"#000000",backgroundColor: "white", opacity: "0.65" }, 800);
                //$(this).$('.tiny').stop().animate({ color:"#808080" }, 1)
      }
      
)});



$(document).ready(function() {
  $('.selected').css('opacity','1.00');
});

$(document).ready(function() {
  $('.switch').click(function() {
  $("#language-selection").hide();
  $("#option-selection").show();
  });
});



function initPanels()
{
	var hh = 109 //height of header
  var chh = (276) //height of content header with padding
	var wh = $(window).height();
	var ww = $(window).width();

  var ch = (wh-hh);
	//$("#content").css('height',ph);


	$("#content").css('height',ch);

	$("#left-sidebar1").css('height',ch);
	$("#left-sidebar2").css('height',ch);

  //$("#profile").css('height',(ch-chh))
  $("#sidebar .content").css('height',(ch-chh))

	$("#map").css('height',ch);
	$("#map").css('width',(ww-381-256-2));

	var pch = (ch-84)
  var profileBoxHeight = 200

	$("#content-container").css('height',pch);

	$(".sidebar-container").css('height',pch);
	$(".viewport").css('height',(pch));

	$("#scrollbar0.viewport").css('height',(pch-144));

  $('#scrollbar0').tinyscrollbar({ size: (pch+8) });

  $('#scrollbar1').tinyscrollbar({ size: pch });
  $('#scrollbar2').tinyscrollbar({ size: pch });

  $('#profile-scrollbar').tinyscrollbar({ size: pch });


  $("#option-selection").hide();

}

//Fadeout the backgrounds on hover

/*
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

*/



