$(document).ready(function() {

    const api= "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2026-01-01&endtime=2026-12-31&orderby=time&limit=30";

    //Test pour savoir si l'API est bien chargée
    fetch(api)
    .then(response => {
        if(!response.ok){
            throw new Error("Erreur réseau");
        }
        return response.json();
    })
    .then(data=>{
        const premiereInfo= data.results[1];
        console.log(premiereInfo);
    })
    .catch(error=>{
        console.error("Erreur lors du chargement des données : ",error);
    });

});