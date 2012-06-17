
jQuery.event.add(window, "load", initPanels);
jQuery.event.add(window, "load", googleTranslateElementInit);

jQuery.event.add(window, "resize", initPanels);


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
	var hh = 109
	var wh = $(window).height();
	var ww = $(window).width();

  var ch = (wh-hh);
	//$("#content").css('height',ph);


	$("#sidebar").css('height',ch);
	$("#left-sidebar1").css('height',ch);
	$("#left-sidebar2").css('height',ch);

	$("#map").css('height',ch);
	$("#map").css('width',(ww-381-256-2));

	var pch = (ch-90)

	$(".sidebar-container").css('height',pch);
	$(".viewport").css('height',(pch));

  $('#scrollbar1').tinyscrollbar({ size: pch });
  $('#scrollbar2').tinyscrollbar({ size: pch });

  $("#option-selection").hide();

}

//Fadeout the backgrounds on hover


function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
