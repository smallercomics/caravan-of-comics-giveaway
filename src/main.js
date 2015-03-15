// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var resizebanner = debounce(function() {
	$('#banner').css("height", $('html').height()+"px");
}, 250);

window.addEventListener('resize', resizebanner);
resizebanner();

$(document).ready(function(){
	$('a.to-download').click(function(e){
		e.preventDefault();
		$('html, body').animate({
			'scrollTop':   $('#download').offset().top
		}, 500);
	});

	// track downloads on each of the formats.
	$('a.format').click(function(e){
		var link = $(e.target).closest('a');
		ga('send', 'event', 'Comics', 'Download', link.data().type, {
			'dimension1': artist,
			'dimension2': title
		});
	});

	// choose a sponsor image if there isn't one already.
	if (!$('#sponsorship a').length){
		var images = [
			['all_star_queen_53.jpg', 'All Star Comics Melbourne', 'http://allstarcomics.com.au/'],
			['ledger.jpg', 'The Ledger Awards For Excellence In Australian Comics', 'http://ledgerawards.org'],
		],
		image = images[Math.floor(Math.random()*images.length)];
		$('<a/>')
			.attr('href', image[2])
			.attr('title', image[1])
			.append( $('<img/>').attr('src', '/giveaway/img/' + image[0]) )
			.appendTo($('#sponsorship'));
	}
});



// general google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-2174335-8', 'auto');

ga('set', 'dimension1', artist);
ga('set', 'dimension2', title);

ga('send', 'pageview');

