$(function() {
    const $searchInput = $('#search-input');
    const $searchResults = $('#search-results');
    let movies = [];

    fetch('../assets/data/filmes.json')
        .then(response => response.json())
        .then(data => {
            movies = data;
            displayResults(movies);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos filmes:', error);
            $searchResults.html('<p class="error-message">Não foi possível carregar os dados.</p>');
        });

    $searchInput.on('input', function() {
        const query = $(this).val().toLowerCase();
        const filteredMovies = movies.filter(movie => {
            return movie.title.toLowerCase().includes(query);
        });
        displayResults(filteredMovies, query);
    });

    function displayResults(movieList, query) {
        $searchResults.empty();

        if (movieList.length === 0 && query) {
            $searchResults.html('<p class="error-message">Nenhum filme encontrado para sua busca.</p>');
            return;
        }

        $.each(movieList, function(index, movie) {
            const movieCardHTML = `
                <div class="movie-card visible">
                    <img src="../${movie.posterUrl}" alt="Pôster do ${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.genres}</p>
                        <a href="../detalhes/?id=${movie.id}" class="btn-secondary">Ver Detalhes</a>
                    </div>
                </div>
            `;
            $searchResults.append(movieCardHTML);
        });
    }
});