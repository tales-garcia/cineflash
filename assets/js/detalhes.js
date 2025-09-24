$(function() {
    const params = new URLSearchParams(window.location.search);
    const movieId = parseInt(params.get('id'));

    if (!movieId) {
        showError();
        return;
    }

    fetch('../assets/data/filmes.json')
        .then(response => response.json())
        .then(movies => {
            const movie = movies.find(m => m.id === movieId);

            if (movie) {
                populateMovieDetails(movie);
            } else {
                showError();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os dados do filme:', error);
            showError();
        });
});

function populateMovieDetails(movie) {
    $('#movie-title').text(movie.title);
    $('#movie-genres').text(movie.genres);
    $('#movie-director').text(movie.director);
    $('#movie-synopsis').text(movie.synopsis);
    $('#movie-poster').attr('src', '../' + movie.posterUrl).attr('alt', 'Pôster do filme ' + movie.title);
    
    const trailerUrl = `https://www.youtube.com/embed/${movie.youtubeId}`;
    $('#movie-trailer').attr('src', trailerUrl);
    
    document.title = `${movie.title} - CINEFLASH`;
}

function showError() {
    $('#movie-content').hide();
    $('#error-message').show();
}