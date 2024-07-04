/*$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});

$(function () {
	$('a[href="#search"]').on('click', function(event) {
		event.preventDefault();
		$('#search').addClass('open');
		$('#search > form > input[type="search"]').focus();
	});
	
	$('#search, #search button.close').on('click keyup', function(event) {
		if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
			$(this).removeClass('open');
		}
	});
	
	
	$('form').submit(function(event) {
		event.preventDefault();
		return false;
	})
	$('[data-toggle="tooltip"]').tooltip();
});*/

//slider

/*$('#myCarousel').carousel({
	interval: false
});*/

//scroll slides on swipe for touch enabled devices

/*$("#myCarousel").on("touchstart", function(event){

	var yClick = event.originalEvent.touches[0].pageY;
	$(this).one("touchmove", function(event){

		var yMove = event.originalEvent.touches[0].pageY;
		if( Math.floor(yClick - yMove) > 1 ){
			$(".carousel").carousel('next');
		}
		else if( Math.floor(yClick - yMove) < -1 ){
			$(".carousel").carousel('prev');
		}
	});
	$(".carousel").on("touchend", function(){
		$(this).off("touchmove");
	});
});*/



/*$(function () {
	var count = 0;
	$('.owl-carousel').each(function () {
		$(this).attr('id', 'owl-demo' + count);
		$('#owl-demo' + count).owlCarousel({
			navigation: true,
			slideSpeed: 300,
			pagination: true,
			singleItem: true,
			autoPlay: 2000,
			autoHeight: true
		});
		count++;
	});
});*/




//Galeria

/*function getRandomSize(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

var allImages = "";

for (var i = 0; i < 25; i++) {
	var width = getRandomSize(200, 400);
	var height =  getRandomSize(200, 400);
	allImages += '<img src="https://placekitten.com/'+width+'/'+height+'" alt="pretty kitty">';
}

$('#photos').append(allImages);


$(function(){
	$("#addClass").click(function () {
		$('#qnimate').addClass('popup-box-on');
	});

	$("#removeClass").click(function () {
		$('#qnimate').removeClass('popup-box-on');
	});
})

$(function(){
	$("#addClass").click(function () {
		$('#chat').addClass('mostrar-chat');
	});
	
	$("#removeClass").click(function () {
		$('#chat').removeClass('mostrar-chat');
	});
})*/



$(document).ready(function () {
	$("#sidebar").mCustomScrollbar({
		theme: "minimal",
	});

	/*$('#dismiss, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').removeClass('active');
	});*/
	
	$('.link').on('click', function () {
		$('#sidebar').removeClass('active');
	});

	$('#sidebarCollapse').on('click', function () {

		if ( $('#sidebar').hasClass("active") === false ){
			$('#sidebar').addClass('active');
		} else {
			$('#sidebar').removeClass('active');
		}
		//$('.overlay').addClass('active');
		//$('.collapse.in').toggleClass('in');
		//$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});

	$('#router').on('click', function() {
		$('#sidebar').removeClass('active');
	});
});