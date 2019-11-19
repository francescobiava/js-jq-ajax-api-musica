$(document).ready(function() {

	var genreSelected;
	showCd();
	genreFilter();

});

// FUNCTIONS
function showCd () {
	// chiamata ajax
	$.ajax({
		url: 'https://flynn.boolean.careers/exercises/api/array/music',
		method: 'GET',
		success: function(data) {
			// pulisco la lista precedente
			$('.cds-container').html('');
			// recupero il genere selezionato
			genreSelected = $('#genres-choice').find(':selected').val();
			// recupero la risposta che è array di oggetti
			var cds = data.response;
			// ciclo su ogni oggetto richiamando la funzione
			cds.forEach(extractData);
		},
		error: function() {
			alert('ERROREEEEEEEE');
		}
	});
}

// funzione per estrarre dati da ogni oggetto
function extractData(item) {
	// condizione in base al filtro
	if (genreSelected == 'All' || genreSelected == item.genre) {
		// estraggo titolo, autore e anno
		var posterCd = item.poster;
		var titleCd = item.title;
		var authorCd = item.author;
		var yearCd = item.year;
		var genreCd = item.genre;
		// li inserisco nel template e lo appendo in pagina
		var source = $('#cd-template').html();
		var template = Handlebars.compile(source);
		var context = {poster: posterCd, title: titleCd, author: authorCd, year: yearCd, genre: genreCd};
		var html = template(context);
		$('.cds-container').append(html);
	};
}

// funzione che al click sul filtro fa ripartire la chiamata ajax con il filtro
function genreFilter() {
	$('#genres-choice option').click(showCd);
}

/*
https://flynn.boolean.careers/exercises/api/array/music
*/