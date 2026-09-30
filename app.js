const movieContainer = document.querySelector("#movie-container");
const clearButton = document.querySelector("#clear-favorites");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

fetch("data/favorites-movies.json")
    .then(response => response.json())
    .then(movies => {
        displayMovies(movies);
    })
    .catch(error => {
        console.error("Error loading movies:", error);
    });

function displayMovies(movies) {

    movieContainer.innerHTML = "";

    movies.forEach(movie => {

        const card = document.createElement("article");

        card.classList.add("movie-card");

        
        const isFavorite = favorites.includes(movie.title);

        if (isFavorite) {
            card.classList.add("favorite");
        }

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">

                <h2>${movie.title}</h2>

                <p><strong>Year:</strong> ${movie.year}</p>

                <p><strong>Genre:</strong> ${movie.genre}</p>

                <button class="favorite-btn">
                    ${isFavorite ? "★ Favorited" : "☆ Favorite"}
                </button>

            </div>
        `;

        const button = card.querySelector(".favorite-btn");

        button.addEventListener("click", () => {
            toggleFavorite(movie.title, card, button);
        });

        movieContainer.appendChild(card);
    });
}



function toggleFavorite(title, card, button) {

    if (favorites.includes(title)) {

        
        favorites = favorites.filter(movie => movie !== title);

        card.classList.remove("favorite");

        button.textContent = "☆ Favorite";

    } else {

        
        favorites.push(title);

        card.classList.add("favorite");

        button.textContent = "★ Favorited";
    }

    
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}



clearButton.addEventListener("click", () => {

    favorites = [];

    
    localStorage.removeItem("favorites");

    
    const cards = document.querySelectorAll(".movie-card");

    cards.forEach(card => {

        card.classList.remove("favorite");

        const button = card.querySelector(".favorite-btn");

        button.textContent = "☆ Favorite";
    });
});