$(document).ready(function () {
	$("#form-recherche").on("submit", function (event) {
		//quand on lance la recherche

		event.preventDefault();
		let limite = getLimite(); //on récupère la limite sélectionnée, au cas ou elle a changé.

		const api =
			"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2026-01-01&endtime=2026-12-31&orderby=time&limit=" +
			limite;
		//Test pour savoir si l'API est bien chargée
		fetch(api)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Erreur réseau");
				}
				return response.json();
			})
			.then((data) => {
				const seismes = data.features;
				afficherSeismes(seismes);
			})
			.catch((error) => {
				console.error("Erreur lors du chargement des données : ", error);
			});
	});

	function afficherSeismes(seismes) {
		const $conteneur = $("#resultats");
		$conteneur.empty(); // on vide les anciens resultats

		if (!seismes || seismes.length === 0) {
			$("#nombre-resultats").text("Aucun séisme trouvé.");
			return;
		}

		$("#nombre-resultats").text(seismes.length + " séismes trouvés");

		seismes.forEach(function (seisme) {
			console.log(seisme);
		});
	}

	function getLimite() {
		const limite = $("#limite").val();
		console.log("Limite sélectionnée : " + limite);
		return limite;
	}
});
