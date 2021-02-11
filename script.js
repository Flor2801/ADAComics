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

  
const tarjetas = document.getElementsByClassName("card");
console.log(tarjetas)

tarjetas.forEach(tarjetas => {
  tarjetas.onclick = () => {
    resultados.innerHTML = "";
  }
}
)


};

mostrarPersonajes = (info) => {
  let personajes = info.data.results;
  const resultados = document.getElementById("resultados");
  const totalComics = document.getElementById("filtrado");

  totalComics.innerHTML = `${info.data.total}`;

  resultados.innerHTML = "";

  personajes.map((info) => {
    resultados.innerHTML += `<article class="card"><div class="imagen"><img src="${info.thumbnail.path}.jpg" alt=""></div>
<div class="info">
<div class="nombre"><h2>${info.name}</h2></div></div>
</article>`;
  });
};

fetch(
  "https://gateway.marvel.com:443/v1/public/comics?&apikey=cdf503fce8f2c519f899f64cff25fd79"
)
  .then((data) => {
    return data.json();
  })

  .then((info) => {
    mostrarComics(info);
  });

////////////////////////   PAGINADO  ////////////////////////

////////////////////////   MOSTRAR DETALLE DE COMIC   ////////////////////////

////////////////////////   MOSTRAR DETALLE DE PERSONAJE   ////////////////////////

////////////////////////   FILTROS DE BUSQUEDA  ////////////////////////

// Tipo: COMIC --------->  fetch por comics: comics
// Orden: A-Z // Z-A // Mas nuevo // Mas viejo --------> orderBy
// Input: vacio // lleno  --------> titleStarsWith

// Tipo: PERSONAJE  --------->  fetch por personaje: characters
// Orden: A-Z // Z-A --------> orderBy
// Input: vacio // lleno   --------> titleStarsWith

// Luego de enviado el form (boton buscar) el sistema comprueba si el input esta lleno o vacio,
// IF el input esta vacio, combina tipo + orden para hacer el fetch correspondiente (comic o personaje)
// junto con el parametro orderBy que corresponda (A-Z // Z-A // Mas nuevo // Mas viejo)
// IF el input tiene algo, entonces combina tipo + orden + texto del input

const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = "cdf503fce8f2c519f899f64cff25fd79";
const botonBuscar = document.getElementById("buscar");
const tipo = document.getElementById("tipo-elegido");
const orden = document.getElementById("orden-elegido");
const input = document.getElementById("busqueda-por-texto");

console.log(tipo);

// IF INPUT LLENO buscara por TIPO, ORDEN, TEXTO

const filtradoInputLleno = (tipo, orden, texto) => {
  fetch(
    `${
      urlBase + tipo
    }?apikey=${apiKey}&orderBy=${orden}&titleStartsWith=${texto}`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      if ((tipo = "comics")) {
        mostrarComics(info);
      } else {
        mostrarPersonajes(info);
      }
    });
};

const filtradoInputVacio = (tipo, orden) => {
  fetch(`${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}`)
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      if ((tipo = "comics")) {
        mostrarComics(info);
      } else {
        mostrarPersonajes(info);
      }
    });
};

botonBuscar.onclick = () => {
  // INPUT LLENO buscara por TIPO Y ORDEN

  if (input.value !== "" && orden.value == "A-Z") {
    let title = "title";
    let valorTipo = "";
    let valorInput = input.value;

    if (tipo.value == "comics") {
      valorTipo = "comics";
    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
    }
    filtradoInputLleno(valorTipo, title, valorInput);
  }

  if (input.value !== "" && orden.value == "Z-A") {
    let title = "-title";
    let valorTipo = "";
    let valorInput = input.value;

    if (tipo.value == "comics") {
      valorTipo = "comics";
    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
    }
    filtradoInputLleno(valorTipo, title, valorInput);
  }

  // INPUT VACIO buscara por TIPO Y ORDEN

  if (input.value === "" && orden.value == "A-Z") {
    let title = "title";
    let valorTipo = "";

    if (tipo.value == "comics") {
      valorTipo = "comics";
    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
    }
    filtradoInputVacio(valorTipo, title);
  }

  if (input.value === "" && orden.value == "Z-A") {
    let title = "-title";
    let valorTipo = "";

    console.log(valorTipo);

    if (tipo.value == "comics") {
      valorTipo = "comics";
    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
    }
    filtradoInputVacio(valorTipo, title);
  }
};


/////////////////// SELECCIONAR TARJETA PARA VER DETALLE ////////////////////////////

