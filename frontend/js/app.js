let app = {
    init: function () {
        console.log('app.init()');

        // On appelle la méthode s'occupant d'ajouter les EventListener sur les éléments déjà dans le DOM
        app.addAllEventListeners();

        // On appelle la méthode s'occupant de charger tous les jeux vidéo
        app.loadVideoGames();
    },
    addAllEventListeners: function () {
        // On récupère l'élément <select> des jeux vidéo

        // On ajoute l'écouteur pour l'event "change", et on l'attache à la méthode app.handleVideogameSelected

        // On récupère le bouton pour ajouter un jeu vidéo
        let addVideogameButtonElement = document.getElementById('btnAddVideogame');
        // On ajoute l'écouteur pour l'event "click"
        addVideogameButtonElement.addEventListener('click', app.handleClickToAddVideogame);

        // TODO
        // On récupère le <select> 
        let selectVideogameButtonElement = document.querySelector('.form-control');
        // On ajoute un évènement pour l'event 
        selectVideogameButtonElement.addEventListener('change', app.handleVideogameSelected);
    },
    handleVideogameSelected: function (evt) {

        evt.preventDefault();

        // Récupérer la valeur du <select> (id du videogame)
        let selectedVideogameElement = evt.currentTarget;
        let selectedVideogameElementValue = selectedVideogameElement.value;
        console.log(selectedVideogameElement);

        // On récupère l'option choisie et sa valeur ensuite
        const videogameOptions = selectedVideogameElement.options;
        const selectedIndex = selectedVideogameElement.selectedIndex;
        const videoGameId = videogameOptions[selectedIndex].value;
        console.log(videoGameId);

        // Vider le contenu de div#review
        // déjà vide ?!

        // charger les données pour ce videogame
        /**
         * Options de la requête HTTP
         */
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        /**
         * La fonction native fetch() permet de lancer une requête HTTP depuis JS.
         */
        request = fetch('http://localhost:8080/videogames/' + videoGameId + '/reviews', fetchOptions);

        request.then(

                function (response) {

                    return response.json();
                }
            )


            .then(

                function (data) {
                    console.log(data);


                    // TO DO : afficher les données sur notre page
                    for (const videoData of data) {

                        const templateElement = document.querySelector("#reviewTemplate").content.cloneNode(true);

                        // mise à jour du titre de la review 
                        templateElement.querySelector('.reviewTitle').textContent = videoData.title; 

                        // mise à jour du nom de l'auteur 
                        templateElement.querySelector('.reviewAuthor').textContent = videoData.author; 

                        // mise à jour de la date de publication
                        templateElement.querySelector('.reviewPublication').textContent = videoData.publication_date; 

                        // mise à jour du texte
                        templateElement.querySelector('.reviewText').textContent = videoData.text; 

                        // mise à jour des notes 
                        templateElement.querySelector('.reviewDisplay').textContent += videoData.display_note; 
                        templateElement.querySelector('.reviewGameplay').textContent += videoData.gameplay_note; 
                        templateElement.querySelector('.reviewScenario').textContent += videoData.scenario_note; 
                        templateElement.querySelector('.reviewLifetime').textContent += videoData.lifetime_note; 
    

                        // mtn que le template est mis à jour avec les info, on va pouvoir l'intégrer au reste du html
                        let reviewElement = document.querySelector('#review'); 
                        reviewElement.append(templateElement); 

                    }
                }

            );


        // Dupliquer la template #reviewTemplate et personnaliser son contenu avec les données

        // Ajouter dans le DOM
    },





    handleClickToAddVideogame: function (evt) {
        // https://getbootstrap.com/docs/4.4/components/modal/#modalshow
        // jQuery obligatoire ici
        $('#addVideogameModal').modal('show');
    },
    loadVideoGames: function () {
        // Charger toutes les données des videogames
        // Ajouter une balise <option> par videogame
    }
};

document.addEventListener('DOMContentLoaded', app.init);