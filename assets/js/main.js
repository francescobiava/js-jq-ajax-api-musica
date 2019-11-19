$(document).ready(function() {

	showCd();

});

// FUNCTIONS
function showCd () {
	// chiamata ajax
	$.ajax({
		url: 'https://flynn.boolean.careers/exercises/api/array/music',
		method: 'GET',
		success: function(data) {
			// recupero la risposta che è array di oggetti
			var cds = data.response;
			// ciclo su ogni oggetto richiamando la funzione
			cds.forEach(extractData);
		},
		error: function() {
			alert('ERROREEEEEEEE');
		}
	})
}

// funzione per estrarre dati da ogni oggetto
function extractData(item) {
	// estraggo titolo, autore e anno
	var posterCd = item.poster;
	var titleCd = item.title;
	var authorCd = item.author;
	var yearCd = item.year;
	console.log(posterCd, titleCd, authorCd, yearCd);
	// li inserisco nel template e lo appendo in pagina
	var source = $('#cd-template').html();
	var template = Handlebars.compile(source);
	var context = {poster: posterCd, title: titleCd, author: authorCd, year: yearCd};
	var html = template(context);
	$('.cds-container').append(html);
}

/*
https://flynn.boolean.careers/exercises/api/array/music
*/