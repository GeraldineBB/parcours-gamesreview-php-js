let app = {
    init: function() {
        console.log('app.init()');

        // On appelle la méthode s'occupant d'ajouter les EventListener sur les éléments déjà dans le DOM
        app.addAllEventListeners();

        // On appelle la méthode s'occupant de charger tous les jeux vidéo
        app.loadVideoGames();
    },
    addAllEventListeners: function() {
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
        selectVideogameButtonElement.addEventListener('click', app.handleVideogameSelected); 
    },
    handleVideogameSelected: function(evt) {

        evt.preventDefault(); 

        // Récupérer la valeur du <select> (id du videogame)
        let selectedVideogameElement = evt.currentTarget; 
        let selectedVideogameElementValue = selectedVideogameElement.value; 
        console.log (selectedVideogameElement); 

        // On récupère l'option choisie et sa valeur ensuite
        const videogameOptions = selectedVideogameElement.options; 
        const selectedIndex = selectedVideogameElement.selectedIndex; 
        const videoGameId = videogameOptions[selectedIndex].value; 
        console.log (videoGameId); 

        // Vider le contenu de div#review

        // charger les données pour ce videogame
            // Dupliquer la template #reviewTemplate et personnaliser son contenu avec les données

            // Ajouter dans le DOM
    },
    handleClickToAddVideogame: function(evt) {
        // https://getbootstrap.com/docs/4.4/components/modal/#modalshow
        // jQuery obligatoire ici
        $('#addVideogameModal').modal('show');
    },
    loadVideoGames: function() {
        // Charger toutes les données des videogames
            // Ajouter une balise <option> par videogame
    }
};

document.addEventListener('DOMContentLoaded', app.init);