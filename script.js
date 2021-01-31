fetch('https://rickandmortyapi.com/api/character')

.then((data) => {
    return data.json();
})

.then((personajes) => {
    const resultados = document.getElementById('resultados');

    resultados.innerHTML = ""

    personajes.results.map ((info) => {
        
    resultados.innerHTML += 
    ` <article><div class="imagen"><img src="${info.image}" alt=""></div>
      <div class="info">
      <div class="nombre"><h2>${info.name}</h2></div>
      <div class="estado"><p>${info.status}</p>-<p>${info.species}</p></div>
      <div class="ubicacion"><p>Location:</p><p>${info.location.name}</p></div>
      <div class="episodio"><p>First seen in:</p><p>${info.episode[0]}</p></div>
      </article>`

    })

})