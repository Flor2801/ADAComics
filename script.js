
mostrarComics = (info) => {
let comic = info.data.results;
const resultados = document.getElementById("resultados");
const totalComics = document.getElementById("filtrado");

totalComics.innerHTML = `${info.data.total}`;

resultados.innerHTML = "";

comic.map((info) => {
  resultados.innerHTML += `<article class="card"><div class="imagen"><img src="${info.thumbnail.path}.jpg" alt=""></div>
<div class="info">
<div class="nombre"><h2>${info.title}</h2></div></div>
</article>`;
});
}


fetch(
  "https://gateway.marvel.com:443/v1/public/comics?&apikey=cdf503fce8f2c519f899f64cff25fd79"
)
  .then((data) => {
    return data.json();
  })

  .then((info) => {
  mostrarComics(info)
  });

