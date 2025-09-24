$(function() {
    const $cinemasList = $('#cinemas-list');

    fetch('../assets/data/cinemas.json')
        .then(response => response.json())
        .then(cinemas => {
            displayCinemas(cinemas);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos cinemas:', error);
            $cinemasList.html('<p class="error-message">Não foi possível carregar as informações dos cinemas.</p>');
        });

    function displayCinemas(cinemaList) {
        $cinemasList.empty();

        $.each(cinemaList, function(index, cinema) {
            const cinemaCardHTML = `
                <div class="cinema-card">
                    <img src="../${cinema.imageUrl}" alt="Foto do ${cinema.name}">
                    <div class="cinema-info">
                        <h3>${cinema.name}</h3>
                        <p><i class="fa-solid fa-location-dot"></i> ${cinema.address}</p>
                        <p><i class="fa-solid fa-phone"></i> ${cinema.phone}</p>
                        <a href="${cinema.mapsLink}" target="_blank" class="btn-secondary">Ver no mapa</a>
                    </div>
                </div>
            `;
            $cinemasList.append(cinemaCardHTML);
        });
    }
});