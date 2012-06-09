var LAT_MIN = 46.797983;
var LAT_MAX = 46.821731;
var LNG_MIN = -71.221414;
var LNG_MAX = -71.298861;

var mapElements = {};
var map = null;
var activeMarker = null;
var address = [
  "Abraham",
  "Rue Garneau",
  "Quebec City",
  "Quebec"
];
var overlayContent = "<div class='result-item' style='padding:0'>" +
                        "<div class='right'>" +
                          "<a href='#'>The name of the school</a><br>" +
                          "This is a meaningful sentence to help the translator tool somewhat.." +
                        "</div>" +
                        "<div class='right'>" +
                          "<b>Something: " + address[0] + "</b>" +
                        "</div>" +
                     "</div>";

/*Some simple sizing stuff*/




jQuery.event.add(window, "load", resizeFrame1);
jQuery.event.add(window, "load", setDefaultsLtr);
jQuery.event.add(window, "load", panelHeight);

jQuery.event.add(window, "resize", resizeFrame1);
jQuery.easing.def = "easeOutBounce";

$(document).ready(function() {
  $('ol.inner-results li').hover(
function(){$(this).addClass('hover')},
function(){$(this).removeClass('hover')}
)
});





function choose(lang){
  $(".primary-option").siblings().removeClass("selected");
  var language = $("#"+lang).attr("alias");
  var lantext = $("#"+lang).html();
  $("#"+lang).addClass("selected");
  $(".language_filter").html(lantext);
  $(".language_filter .flag").addClass('flag-panel').removeClass('flag');
  $(".language_filter").css('color','#2D3A8B');
  $("#destination-list").hide();
  $("#country-list").hide();
  //$("#language-list").fadeOut(800);
  //$(".language-out").removeClass("selected");
  //resizeFrame1();

}

function chooseCountry(lang){
  $("#"+lang).siblings().removeClass("selected");
  var language = $("#"+lang).attr("alias");
  var lantext = $("#"+lang).html();
  $("#"+lang).addClass("selected");
  $(".country_filter").html(lantext);
  $(".country_filter .flag").addClass('flag-panel').removeClass('flag');
  $(".country_filter").css('color','#2D3A8B');
  $("#destination-list").hide();
  $("#language-list").hide();
  //$("#country-list").fadeOut(800);
  //$(".country-out").removeClass("selected");
  //resizeFrame1();

}


function setDefaultsLtr()
{
  $("input:hidden[name=text-direction]").val('ltr');
	// $('html').attr('dir','ltr'); //
	$('[dir|="null"]').attr('dir','ltr'); //
	$(".text-direction").text('ltr');
	$(".text-direction").text('ltr');
    $("input:hidden[name=language-filter]").val('Language');
  //choose('lang_1');
  //chooseCountry('country_1');
	//$(".language_filter").text('english');
	$("#map_canvas").css('float','right');
	$("#panel").css('float','left');
	$("#language-list").css('float','left').css('display','none');
	$("#country-list").css('float','left').css('display','none');
	$("#destination-list").css('float','left').css('display','none');
	$(".logo").css('float','left');
	$(".search").css('float','left');
	$(".choose").css('float','left');
  $(".language_filter").text('Language')
  $(".country_filter").text('Country')
  $(".language_filter").tooltip();


}

function setDefaultsRtl()
{
  $("input:hidden[name=text-direction]").val('rtl');
	// $('html').attr('dir','ltr'); //
	$('[dir|="null"]').attr('dir','rtl'); //
	$(".text-direction").text('rtl');
	$(".text-direction").text('rtl');
    $("input:hidden[name=language-filter]").val('Language');
  //choose('lang_1');
  //chooseCountry('country_1');
	//$(".language_filter").text('english');
	$("#map_canvas").css('float','left');
	$("#panel").css('float','right');
	$("#language-list").css('float','right').css('display','none');
	$("#country-list").css('float','right').css('display','none');
	$("#destination-list").css('float','right').css('display','none');
	$(".logo").css('float','right');
	$(".search").css('float','right');
	$(".choose").css('float','right');
  $(".language_filter").tooltip();
}


function panelHeight()
{
	var hmod = 256
	var wh = $(window).height();
  var ph = (wh-hmod);
	$(".panel-container").css('min-height',ph);
	$(".viewport").css('height',(ph));
	$("#language-selector").css('height',(ph));
	$("#country_selector").css('height',(ph));

	var pch = $(".panel-container").height();


  $(".panel-container-height").text(pch);

  $('#scrollbar1').tinyscrollbar({ size: pch });
  $('#scrollbar2').tinyscrollbar({ size: pch });


  if (ph >= pch){
  $(".psb").text('false');
  



  }else{
  $(".psb").text('true');


  }
}

//Converts degree style map coordinates to decimal form
function decimalCoord(coord_min,coord_max){
  var coord = coord_min + Math.random() * (coord_max - coord_min);
  return Math.round(coord * Math.pow(10,6))/Math.pow(10,6);
}

//Generates a UUID
function uuidGen(){
  return Math.round(Math.random() * 1000000000).toString();
}

//
function markerSwap(uuid){
  if(activeMarker != null){
    mapElements[activeMarker]['marker']['icon'] = './images/marker.png';
    mapElements[activeMarker]['marker'].setMap(map);
    mapElements[activeMarker]['overlay'].setMap(null);
  }
  mapElements[uuid]['marker']['icon'] = './images/marker40.png';
  mapElements[uuid]['marker'].setMap(map);
  mapElements[uuid]['overlay'].setMap(map);
  activeMarker = uuid;
}

$(document).ready(function() {
  $('a.add').on().click(function(ev){
      ev.preventDefault();
      var uuid = uuidGen();
      var lat = decimalCoord(LAT_MIN,LAT_MAX);
      var lng = decimalCoord(LNG_MIN,LNG_MAX);
      var geo = new google.maps.LatLng(lat,lng);
      var marker = new google.maps.Marker({
        position: geo,
        map: map,
        icon: 'images/marker.png',
        title: uuid
      });
      var overlay = new google.maps.InfoWindow({
        position: geo,
        content: overlayContent
      });
      mapElements[uuid] = {'marker':marker,'overlay':overlay};
      var clone = $('.inner-results').children(':first').clone().removeClass('selected').appendTo('.inner-results');
      clone.attr('id',uuid);
      clone.mouseenter(function(){markerSwap(this.id)});
      panelHeight();
  });

  $('a.remove').click(function(ev){
      if($('li.result-item').length > 1){
        ev.preventDefault();
        var child = $('.inner-results').children(':last');
        var uuid = child.attr('id');
        mapElements[uuid]['marker'].setMap(null);
        mapElements[uuid]['overlay'].setMap(null);
        if(uuid == activeMarker) activeMarker = null;
        delete mapElements[uuid];
        child.remove();
        panelHeight();
      }
  });
});


function resizeFrame() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
  var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#panel").css('height',(h - hmod));
  $("#panel").css('width',(wmod));
  $("#map_canvas").css('height',(h - hmod));
	$("#map_canvas").css('width', (w));

	$(".language_filter").text(h);

	$(".wheight").text(h);
	$(".wwidth").text(w);

  panelHeight();
  //initMap();

}


function resizeFrame1() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
  var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#panel").css('height',(h - hmod));
  $("#panel").css('width',(wmod));
  $("#language-list").css('width',(wselector));
  $("#language-list").css('height',(h - hmod));
  $("#language-list").css('margin-left',(wmod));
  $("#country-list").css('width',(wselector));
  $("#country-list").css('margin-left',(wmod));
  $("#country-list").css('height',(h - hmod));
  $("#destination-list").css('width',(wselector));
  $("#destination-list").css('margin-left',(wmod));
  $("#destination-list").css('height',(h - hmod));
  $("#map_canvas").css('height',(h - hmod));
	$("#map_canvas").css('width', (w - wmod));

	$(".wheight").text(h);
	$(".wwidth").text(w);

  panelHeight();
  //initMap();

}

function resizeFrame2() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
    var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#panel").css('height',(h - hmod));
  $("#panel").css('width',(wmod));
  $("#language-list").css('width',(wselector));
  $("#language-list").css('height',(h - hmod));
  $("#country-list").css('width',(wselector));
  //$("#country-list").css('margin-right',(w + wselector));
  //$("#language-list").css('margin-right',(w + wselector));
  $("#country-list").css('height',(h - hmod));
  //$("#map_canvas").css('height',(h - hmod));
	//$("#map_canvas").css('width', (w - (wmod - wselector)));


	$(".wheight").text(h);
	$(".wwidth").text(w);

}

function resizeFrame3() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
    var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#map_canvas").css('height',(h - hmod));
	$("#map_canvas").css('width', (w));


	$(".wheight").text(h);
	$(".wwidth").text(w);

}

$(document).ready(function() {
  $('button#results').click(function() {
  $(".searches").hide();
  $(".shortlist").hide();
  $(".results").show();

  panelHeight();

    });
});



$(document).ready(function() {
  $('button#searches').click(function() {
  $(".results").hide();
  $(".shortlist").hide();
  $(".searches").show();
  $(".searches").load("./my-searches.html");

  panelHeight();
  panelHeight();

    });
});

$(document).ready(function() {
  $('button#shortlist').click(function() {
  $(".results").hide();
  $(".searches").hide();
  $(".shortlist").show();
  $(".shortlist").load("./my-shortlist.html");

  panelHeight();
  panelHeight();

    });
});

$(document).ready(function() {
  $('.result-item').click(function() {
  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');


    });
});


$(document).ready(function() {
  $('button.ltr').click(function() {
    $("input:hidden[name=text-direction]").val('ltr');
	$(".text-direction").text('ltr');
	$('[dir]').attr('dir','ltr'); // 
  $('.left').toggleClass('left').toggleClass('right');
	$("#map_canvas").css('float','right');
	$("#panel").css('float','left');
	$(".logo").css('float','left');
	$(".search").css('float','left');
  //$(".results").load("./results.html");
  setDefaultsLtr();
	resizeFrame1();
    });
});

$(document).ready(function() {
  $('button.rtl').click(function() {
    $("input:hidden[name=text-direction]").val('rtl');
	$(".text-direction").text('rtl');
	$('[dir]').attr('dir','rtl'); //
  $('.right').toggleClass('right').toggleClass('left');
	$("#map_canvas").css('float','left');
	$("#panel").css('float','right');
	$(".logo").css('float','right');
	$(".search").css('float','right');
  //$(".results").load("./results-arabic.html");
  setDefaultsRtl();
	resizeFrame1();
    });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('.language-out').click(function() {

  $("#country-list").hide();
  $("#language-list").animate().show();
	$("#destination-list").hide();

  $(".inner-header").children().removeClass('selected');
  $("h3.language-out").addClass('selected');

	$("#panel").css({display:'inline'});
	$("#panel").css({width:381});
	$("#map_canvas").animate({width:w-(381+256)},700);
	$("#map_canvas").css({width:w-(381+256)});

  //$("#language-list div.panel-container").load("./_language_list.html");
	//resizeFrame2();
  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('.destination-out').click(function() {

  $("#country-list").hide();
  $("#language-list").hide();
	$("#destination-list").animate().show();
	$("#destination-list").css({width:256});
  $(".inner-header").children().removeClass('selected');
  $("h3.destination-out").addClass('selected');
  $("#map_canvas").animate({width:w-(381+256)},700);
  $("#map_canvas").css({width:w-(381+256)});


	//initMap();
/*$("#panel").animate({"marginLeft": "-=340px"}, "fast");*/
  });
});


$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('.country-out').click(function() {

    $("#country-list").animate().show();
    $("#language-list").hide();
	  $("#destination-list").hide();
	  $("#destination-list").css({width:256});
    $(".inner-header").children().removeClass('selected');
    $("h3.country-out").addClass('selected');
	  $("#map_canvas").animate({width:w-(381+256)},700);
	  $("#map_canvas").css({width:w-(381+256)});

    $("#country-list div.panel-container").load("./_country_list.html");

	  //resizeFrame2();
	  //initMap();
  /*$("#panel").animate({"marginLeft": "-=340px"}, "fast");*/
  });
});




$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
    $('.language-in').click(function() {
	  $("#language-list").animate().fadeOut();
    $("#country-list").hide();
	  $("#destination-list").hide();
    $(".inner-header").children().removeClass('selected');
    $("h3.language-out").removeClass('selected');
	  $("#map_canvas").animate({width:w-(381)},700);
	  $("#map_canvas").css({width:w-(381)});
	  //initMap();
  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('button.country-in').click(function() {
	  $("#language-list").hide();
    $("#country-list").animate().fadeOut();

	  $("#destination-list").hide();
    $(".inner-header").children().removeClass('selected');
	  $("#map_canvas").animate({width:w-(381)},700);
	  $("#map_canvas").css({width:w-(381)});

	  //initMap();

  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('.destination-in').click(function() {

	  $("#language-list").hide();
    $("#country-list").hide();

	  $("#destination-list").animate().fadeOut();

    $(".inner-header").children().removeClass('selected');
    $("h3.destination-out").removeClass('selected');

	  $("#map_canvas").animate({width:w-(381)},700);
	  $("#map_canvas").css({width:w-(381)});

	  //initMap();


  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('button.panel-out').click(function() {
    var $panel = $('#panel');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          +$panel.outerWidth(+40) : 0
      });

    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });

    }
	$("#panel").css({display:'inline'});
	$("#panel").css({width:381});
	$("#map_canvas").animate({width:w-381},700);
	$("#map_canvas").css({width:w-381});
	resizeFrame1();
	//initMap();
/*$("#panel").animate({"marginLeft": "-=340px"}, "fast");*/
  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('button.panel-in').click(function() {
    var $panel = $('#panel');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });
    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          +$panel.outerWidth(+40) : 0
      });
    }
	$("#panel").css({display:'none'});
	$("#language-list").css({display:'none'});
	$("#country-list").css({display:'none'});
	$("#map_canvas").animate({width:w},700);
	$("#map_canvas").css({width:w});
	resizeFrame();
	//initMap();
/*$("#panel").animate({"marginLeft": "+=340px"}, "fast");*/
  });
});


/*just for the mockup*/

function createMap(geo,address,uuid) {
  var options = {
    center: geo,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    panControl: true,
    streetViewControl: true,
    mapTypeControl: false
  };
  var canvas = document.getElementById('map_canvas');
  var map =  new google.maps.Map(canvas,options);
  map.panBy(0,0);

  var marker = new google.maps.Marker({
    position: geo,
    map: map,
    icon: 'images/marker.png',
    title: "Stuff marker"
  });

  var overlay = new google.maps.InfoWindow({
    position: geo,
    content: overlayContent
  });

  mapElements[uuid] = {'marker':marker,'overlay':overlay};

  overlay.open(map,marker);
  return map;
}

function initMap() {
	var geo = new google.maps.LatLng(46.800358,-71.219401)
  var uuid = uuidGen();
  var result = $('li.result-item');
  result.attr('id',uuid);
  result.mouseenter(function(){markerSwap(this.id)});
  map = createMap(geo,address,uuid);
}

$(document).ready(function(){initMap()});
