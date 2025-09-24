$(function() {
    
    fetch('../assets/data/filmes.json')
        .then(response => response.json())
        .then(movies => {
            const featuredMovieId = 6;
            const featuredMovie = movies.find(m => m.id === featuredMovieId);

            if (featuredMovie) {
                $('#featured-title').text(featuredMovie.title);
                $('#featured-synopsis').text(featuredMovie.synopsis);
                $('#featured-details-link').attr('href', `detalhes/?id=${featuredMovie.id}`);
                const trailerUrl = `https://www.youtube.com/embed/${featuredMovie.youtubeId}`;
                $('#featured-iframe').attr('src', trailerUrl);
            }

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
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos filmes:', error);
            $('.movies-grid').html('<p class="error-message">Não foi possível carregar os filmes. Tente novamente mais tarde.</p>');
        });

    const $header = $('.header');
    
    $(window).on('scroll', function() {
        const shouldBeScrolled = $(window).scrollTop() > 50;
        $header.toggleClass('scrolled', shouldBeScrolled);
    });
});
