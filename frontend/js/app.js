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

        // On récupère le bouton pour valider le formulaire
        let validateVideogameButtonElement = document.querySelector('#submitValidateButton'); 
        // on ajoute un évent
        validateVideogameButtonElement.addEventListener('click', app.handleValidateVideogame); 

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

                        // BONUS
                        // mise à jour du titre du jeux
                        templateElement.querySelector('.reviewVideogame').textContent = videoData.videogame['name']; 
                        // mise à jour de l'éditeur
                        templateElement.querySelector('.reviewEditor').textContent = videoData.videogame['editor']; 
                        // mise à jour de la plateforme
                        templateElement.querySelector('.reviewPlatform').textContent = videoData.platform['name']; 

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

    handleValidateVideogame: function(evt){
        evt.preventDefault();

        // on récupère la valeur des inputs pour les transférer en BDD
        const videogameElementInput = evt.currentTarget;
        console.log(videogameElementInput);
        // valeur du name
        const newVideogameName = document.querySelector('#inputName');
        newVideogameNameValue = newVideogameName.value;

        // valeur de l'éditeur
        const newVideogameEditor = document.querySelector('#inputEditor');
        newVideogameEditorValue = newVideogameEditor.value;

        // on stocke les données qu'on veut envoyer en BDD
        const data = {
            'name': newVideogameNameValue,
            'editor': newVideogameEditorValue,
        }

        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        const fetchOptions = {

            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

            // Exécuter la requête HTTP avec FETCH
            fetch('http://localhost:8080/videogames', fetchOptions)
            .then(
                function (response) {
                    // console.log(response);
                    // Si HTTP status code à 201 => OK
                    if (response.status == 201) {
                        alert('ajout effectué');

                        // BONUS 2 : rajouter une option dans le menu avec données de l'input 
                        // enlever la modale
                    } else {
                        alert('ajout KO');
                    }
                }
            )

    }, 

    /**
     * Méthode permettant de lister les videogames dans le menu déroulant
     */
    loadVideoGames: function () {
        // Charger toutes les données des videogames
        let fetchOptions = {

            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };


        /**
         * La fonction native fetch() permet de lancer une requête HTTP depuis JS.
         *
         */
        request = fetch('http://localhost:8080/videogames', fetchOptions);

        request.then(

                function (response) {

                    return response.json();
                }
            )


            .then(

                function (data) {
                    // console.log(data);

                    for (videogame of data) {

                        // on récupère le select 
                        let selectVideogameButtonElement = document.querySelector('.form-control');

                        // on crée une option
                        const optionChild = document.createElement('option');
                        optionChild.textContent = videogame.name;
                        optionChild.value = videogame.id;

                        // Ajouter une balise <option> par videogame
                        selectVideogameButtonElement.append(optionChild);

                    }

                }

            );


    }

};

document.addEventListener('DOMContentLoaded', app.init);