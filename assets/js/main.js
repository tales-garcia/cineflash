$(function() {
    
    fetch('../assets/data/filmes.json')
        .then(response => response.json())
        .then(movies => {
            populateFeaturedTrailer(movies);
            populateMoviesGrid(movies);
            populateTop5List(movies);
            populateGenresList(movies);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos filmes:', error);
            $('.movies-grid').html('<p class="error-message">Não foi possível carregar os filmes. Tente novamente mais tarde.</p>');
        });

    function populateMoviesGrid(movies) {
        const $moviesGrid = $('.movies-grid');

        $.each(movies, function(index, movie) {
            const movieCardHTML = `
                <div class="movie-card">
                    <img src="${movie.posterUrl}" alt="Pôster do ${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.genres}</p>
                        <a href="detalhes/?id=${movie.id}" class="btn-secondary">Ver Detalhes</a>
                    </div>
                </div>
            `;
            $moviesGrid.append(movieCardHTML);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        $('.movie-card').each(function() {
            observer.observe(this);
        });
    }

    function populateFeaturedTrailer(movies) {
        const featuredMovieId = 6;
        const featuredMovie = movies.find(m => m.id === featuredMovieId);

        if (featuredMovie) {
            $('#featured-title').text(featuredMovie.title);
            $('#featured-synopsis').text(featuredMovie.synopsis);
            $('#featured-details-link').attr('href', `detalhes/?id=${featuredMovie.id}`);
            const trailerUrl = `https://www.youtube.com/embed/${featuredMovie.youtubeId}`;
            $('#featured-iframe').attr('src', trailerUrl);
        }
    }

    function populateTop5List(movies) {
        const topMovies = movies.slice(0, 5);
        const $top5List = $('#top-5-list');
        $.each(topMovies, function(index, movie) {
            $top5List.append(`<li>${movie.title}</li>`);
        });
    }

    function populateGenresList(movies) {
        const genres = {
            'acao': $('#genre-acao'),
            'ficcao': $('#genre-ficcao'),
            'aventura': $('#genre-aventura'),
            'terror': $('#genre-terror'),
            'fantasia': $('#genre-fantasia')
        };

        const genreMapping = {
            'Ação': genres.acao,
            'Ficção Científica': genres.ficcao,
            'Aventura': genres.aventura,
            'Terror': genres.terror,
            'Fantasia': genres.fantasia
        };

        $.each(movies, function(index, movie) {
            const movieGenres = movie.genres.split(', ');
            $.each(movieGenres, function(i, genre) {
                if (genreMapping[genre]) {
                    genreMapping[genre].append(`<li>${movie.title}</li>`);
                }
            });
        });
    }

    const $header = $('.header');
    
    $(window).on('scroll', function() {
        const shouldBeScrolled = $(window).scrollTop() > 50;
        $header.toggleClass('scrolled', shouldBeScrolled);
    });
});
