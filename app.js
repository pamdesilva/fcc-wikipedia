$(document).ready(function() {

	//Pull data from Wikipedia based on user's search input
	function runSearch(string) {
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php',
			data: {
				action: 'query',
				list: 'search',
				srsearch: string,
				format: 'json'
			},
			dataType: 'jsonp',
			success: function(items) {
				// Clear existing search results
				$('#search-results').empty();

				var articles = items.query.search;
				/// Display search results on page
				if (articles.length > 0) {
					for (var i = 0; i < articles.length; i++) {
					$(`<div><a href="http://en.wikipedia.org/?curid=${articles[i].pageid}" target="_blank"><div><h2> ${articles[i].title}</h2><p>${articles[i].snippet}...</p></div></a></div>`).appendTo('#search-results').addClass('articles');
					}
				} else {
					$(`<div>Whoops, no results found for <strong>"${string}"</strong>. Try searching again.</div>`).appendTo('#search-results').addClass('noresults');
				}

			},
			error: function() {
				$(`<div>Sorry, Wikipedia isn't accessible at the moment</div>`).appendTo('#search-results').addClass('noresults');
			}
		});
	}

	// Open random Wikipedia article in a new tab
	$('#btn-random').click(function() {
		window.open('https://en.wikipedia.org/wiki/Special:Random');
	});

	$('#search').submit(function(event) {
		var searchTerm = $('#search-box').val();
		runSearch(searchTerm);
		event.preventDefault(); // Prevent the browser form handling from submitting the form and refreshing the page
	});

});
