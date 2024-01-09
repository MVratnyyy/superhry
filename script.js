/* JavaScript pro animaci */

const games = document.querySelectorAll('.game');

games.forEach((game, index) => {
    game.style.animation = `fadeIn 0.5s ease-in-out ${index / 5 + 0.5}s`;
});
