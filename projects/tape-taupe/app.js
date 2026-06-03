document.addEventListener('DOMContentLoaded', function() {

    const grille = this.querySelector('.grille');

    for(let i = 0; i < 9; i++) {
        const trou = document.createElement('div');
        trou.className = 'trou';

        const taupe = document.createElement('div');
        taupe.className = 'taupe';
        taupe.id = 'taupe' + i;

        const yeux = document.createElement('div');
        yeux.className = 'yeux';

        const oeilGauche = document.createElement('div');
        oeilGauche.className = 'oeil';

        const oeilDroit = document.createElement('div');
        oeilDroit.className = 'oeil';

        const nez = document.createElement('div');
        nez.className = 'nez';

        yeux.appendChild(oeilGauche);
        yeux.appendChild(oeilDroit);

        taupe.appendChild(yeux);
        taupe.appendChild(nez);

        trou.appendChild(taupe);
        grille.appendChild(trou);
    }

    const taupes = document.querySelectorAll('.taupe');
    const scoreElement = document.querySelector('.score');
    const timerElement = document.querySelector('.timer');
    const startButton = document.querySelector('.start-btn');

    let score = 0;
    let tempsrestant = 30;
    jeuEnCours = false;
    let timerInterval;
    let apparitionTimeout;

    function initGame() {
        jeuEnCours = true;
        score = 0;
        tempsrestant = 30;
        scoreElement.textContent = "Score: 0"
        timerElement.textContent = 'Temps: 30s'
        startButton.
        timerInterval = setInterval(() => {
            tempsrestant--;
            timerElement.textContent = 'Temps: ' + tempsrestant + 's';

            if (tempsrestant <= 0) {
                endGame();                
            }
        }, 1000);

        //Démarrer le jeu
        randomTaupe();
    }

    function endGame() {
        jeuEnCours = false;
        clearInterval(timerInterval);
        if (apparitionTimeout) {
            clearTimeout(apparitionTimeout);            
        }

        taupes.forEach((taupe) => {
            taupe.style.bottom = '-100px';
            taupe.classList.remove('active');
        });

        alert('Jeu Terminié! Votre score: ' + score);

        startButton.disable = false;
    }

    function randomTaupe() {
        if(!jeuEnCours) return;

        taupes.forEach((taupe) => {
            taupe.style.bottom = '-100px';
            taupe.classList.remove('active');
        });

        const index = Math.floor(Math.random() * taupes.length);
        // console.log(index);
        const taupe = taupes[index];

        taupe.style.bottom = '0';
        taupe.classList.add('active');
        // Cacher la taupe après un délai aléatoire (1 à 3 secondes)
        const delaiCacher = Math.random() * 2000 + 1000;

        // console.log("delaiCacher : " + delaiCacher);

        setTimeout(() => {
            if(jeuEnCours) {
                taupe.style.bottom = '-100px'
                taupe.classList.remove('active');

                //Délai avant la ,prochaine apparition (0.5 à 2 secondes)
                const delaiProchain = Math.random() * 1500 + 500;
                setTimeout(randomTaupe, delaiProchain);
            }
        }, delaiCacher);
    }
    // ajouter un écouteur d'event
    taupes.forEach((taupe) => {
        taupe.addEventListener('click', function() {

            if(jeuEnCours && taupe.classList.contains('active')) {
                score++;
                scoreElement.textContent = 'Score: ' + score;

                taupe.style.bottom = '-100px';
                taupe.classList.remove('active');
            }

        })
    })

    startButton.addEventListener('click', initGame);

})