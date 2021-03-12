// FECTH INCIAL PARA CARGAR LA PAGINA (muestra cómics)
fetch(
  "https://gateway.marvel.com:443/v1/public/comics?apikey=cdf503fce8f2c519f899f64cff25fd79&orderBy=title&offset=0"
)
  .then((data) => {
    return data.json();
  })
  .then((info) => {
    mostrarComics(info);
    chequearBotonesIniciales();
  });

////////////////////////   FILTROS DE BUSQUEDA  ////////////////////////

/// Menú de filtros: input de texto, comic/personaje, tipo de orden (alfabético o temporal)
const tipo = document.getElementById("tipo-elegido");
const orden = document.getElementById("orden-elegido");
const input = document.getElementById("busqueda-por-texto");

/// Cambio en opciones del menú según se seleccione cómics/peesonajes
const cambiaOpcion = () => {
  if (tipo.value == "comics") {
    let opciones = orden.length;
    let i = 0;
    while (i < opciones) {
      orden.remove("option");
      i++;
    }
    orden.innerHTML += `<option value="title">A-Z</option>`;
    orden.innerHTML += `<option value="-title">Z-A</option>`;
    orden.innerHTML += `<option value="-focDate">Mas nuevos</option>`;
    orden.innerHTML += `<option value="focDate">Mas viejos</option>`;
  }

  if (tipo.value == "characters") {
    let opciones = orden.length;
    let i = 0;
    while (i < opciones) {
      orden.remove("option");
      i++;
    }
    orden.innerHTML += `<option value="name">A-Z</option>`;
    orden.innerHTML += `<option value="-name">Z-A</option>`;
  }
};

///////////////////// SECCION PRINCIPAL RESULTADOS /////////////////////

let resultadosTotales = 0;
let paginaActual = 0;
let resultadosPorPagina = 20;
let cantidadDePaginas = 0;

// Datos base de la URL para fetch a Marvel
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = "cdf503fce8f2c519f899f64cff25fd79";
const botonBuscar = document.getElementById("buscar");

/// Función para filtrar resultados sin texto en el input
const filtradoInputVacio = (tipo, orden) => {
  fetch(
    `${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}&offset=${
      paginaActual * 20
    }`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      if (tipo == "comics") {
        resultadosTotales = info.data.total;

        mostrarComics(info);
      } else if (tipo == "characters") {
        resultadosTotales = info.data.total;
        mostrarPersonajes(info);
      }
    });
};


/// Función para filtrar resultados con texto en el input
const filtradoInputLleno = (tipo, orden, texto) => {
  if (tipo == "comics") {
    fetch(
      `${
        urlBase + tipo
      }?apikey=${apiKey}&orderBy=${orden}&titleStartsWith=${texto}&offset=${
        paginaActual * 20
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        resultadosTotales = info.data.total;
        mostrarComics(info);
      });
  } else if (tipo == "characters") {
    fetch(
      `${
        urlBase + tipo
      }?apikey=${apiKey}&orderBy=${orden}&nameStartsWith=${texto}`
    )
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        resultadosTotales = info.data.total;
        mostrarPersonajes(info);
      });
  }
};


///////////////// EJECUCIÓN DE FILTROS DE BUSQUEDA  /////////////////

botonBuscar.onclick = () => {
  paginaActual = 0;
  totalResultados.classList.remove("oculto");

  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
};


///////////////////// CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON COMICS //////////////////

let totalResultados = document.getElementById("total-resultado");

mostrarComics = (info) => {
  let comic = info.data.results;
  const resultados = document.getElementById("resultados");
  let totalComics = document.getElementById("filtrado");

  verPaginaActual.innerHTML = paginaActual;
  paginasTotales.innerHTML = Math.floor(info.data.total / 20);
  totalComics.innerHTML = `${info.data.total}`;
  let offset = info.data.offset;
  let cantidadTotal = info.data.total;

  chequearBotonesIniciales();
  chequearBotonesFinales(offset, cantidadTotal);

  resultados.innerHTML = "";

  comic.map((info) => {
    resultados.innerHTML += `<article class="card" data-id=${info.id}><div class="imagen"><img src="${info.thumbnail.path}/portrait_uncanny.${info.thumbnail.extension}" alt=""></div>
    <div class="info"><div class="nombre"><p>${info.title}</p></div></div></article>`;
  });

  
 /// Función para mostrar el detalle al seleccionar un cómic

  const tarjeta = document.querySelectorAll(".card");

  tarjeta.forEach((tarjeta) => {
    tarjeta.onclick = () => {
      resultados.innerHTML = "";
      totalComics.innerHTML = "";
      totalResultados.classList.add("oculto");

      piePaginador.classList.add("oculto");
      paginador.classList.add("oculto");

      fetch(
        `https://gateway.marvel.com/v1/public/comics/${tarjeta.dataset.id}?apikey=${apiKey}`
      )
        .then((res) => {
          return res.json();
        })
        .then((info) => {
          let comicSeleccionado = info.data.results[0];
          let fecha = comicSeleccionado.dates[0].date;
          let fechaCortada = fecha.slice(0, 10);

          resultados.innerHTML = `<div class="contenedor-detalle">
          <div id="info-detalle-primaria">
          <div id="info-detalle-primaria-imagen"><img src="${comicSeleccionado.thumbnail.path}/portrait_uncanny.${comicSeleccionado.thumbnail.extension}" alt=""></div>
            <div id="info-detalle-primaria-data">
            <h2>${comicSeleccionado.title}</h2>
            <h3>PUBLICADO:</h3><p>${fechaCortada}</p>
            <h3>GUIONISTAS:</h3><p>${comicSeleccionado.creators.items[0].name}</p>
            <h3>DESCRIPCIÓN:</h3><p>${comicSeleccionado.description}</p></div>
           </div> 
        
           <div id="info-detalle-secundaria-resultados">
           <h2>Personajes</h2>
           <span id="cantidadPersonajes">0</span><span>RESULTADOS</span>
           </div>

           <div id="info-detalle-secundaria">
          </div>
           </div>

           </div>
          `;

          fetch(
            `https://gateway.marvel.com/v1/public/comics/${tarjeta.dataset.id}/characters?apikey=${apiKey}`
          )
            .then((res) => {
              return res.json();
            })
            .then((info) => {
              let personaje = info.data.results;
              let resultadosPersonajes = document.getElementById(
                "info-detalle-secundaria"
              );
              let cantidadPersonajes = document.getElementById(
                "cantidadPersonajes"
              );
              cantidadPersonajes.innerHTML = `${info.data.total}`;

              personaje.map((tarjetas) => {
                return (resultadosPersonajes.innerHTML += `<div class="card-tarjeta-personaje" data-id=${tarjeta.id}><div class="imagen"><img src="${tarjetas.thumbnail.path}/portrait_incredible.${tarjetas.thumbnail.extension}" alt=""></div>
              <div class="info"> <div class="nombre"><h2>${tarjetas.name}</h2></div></div></div>`);
              });
            });
        });
    };
  });
};

///////////////////// CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON PERSONAJES //////////////////

mostrarPersonajes = (info) => {
  let personajes = info.data.results;
  const resultados = document.getElementById("resultados");
  const totalComics = document.getElementById("filtrado");

  verPaginaActual.innerHTML = paginaActual;
  paginasTotales.innerHTML = Math.floor(info.data.total / 20);
  totalComics.innerHTML = `${info.data.total}`;
  resultados.innerHTML = "";

  let offset = info.data.offset;
  let cantidadTotal = info.data.total;

  chequearBotonesIniciales();
  chequearBotonesFinales(offset, cantidadTotal);

  personajes.map((info) => {
    resultados.innerHTML += `<article class="card-tarjeta-personaje" data-id=${info.id}><div class="imagen"><img src="${info.thumbnail.path}/portrait_incredible.${info.thumbnail.extension}" alt=""></div>
    <div class="info"> <div class="nombre"><h2>${info.name}</h2></div></div></article>`;
  });


  /// Función para mostrar el detalle al seleccionar un personaje

  const personaje = document.querySelectorAll("article");

  personaje.forEach((personaje) => {
    personaje.onclick = () => {
      resultados.innerHTML = "";
      totalComics.innerHTML = 0;
      totalResultados.classList.add("oculto");
      piePaginador.classList.add("oculto");
      paginador.classList.add("oculto");

      fetch(
        `https://gateway.marvel.com/v1/public/characters/${personaje.dataset.id}?apikey=${apiKey}`
      )
        .then((res) => {
          return res.json();
        })
        .then((info) => {
          let personajeSeleccionado = info.data.results;

          resultados.innerHTML = `<div class="contenedor-detalle">
          <div id="info-detalle-primaria">
          <div id="info-detalle-primaria-imagen"><img src="${personajeSeleccionado[0].thumbnail.path}/standard_fantastic.${personajeSeleccionado[0].thumbnail.extension}" alt=""></div>
            <div id="info-detalle-primaria-data"><h2>${personajeSeleccionado[0].name}</h2><p>${personajeSeleccionado[0].description}</p></div>
          </div> 
           <div id="info-detalle-secundaria-resultados"><h2>Comics</h2>
           <p><span id="cantidadComics">0</span><span>RESULTADOS</span></p></div>

           <div id="info-detalle-secundaria">
          </div>
           </div>

           </div>
          `;

          fetch(
            `https://gateway.marvel.com/v1/public/characters/${personaje.dataset.id}/comics?apikey=${apiKey}`
          )
            .then((res) => {
              return res.json();
            })
            .then((info) => {
              let participacionPersonaje = info.data.results;

              let resultadosComics = document.getElementById(
                "info-detalle-secundaria"
              );

              let cantidadComics = document.getElementById("cantidadComics");
              cantidadComics.innerHTML = `${info.data.total}`;

              participacionPersonaje.map((tarjetas) => {
                return (resultadosComics.innerHTML += `<article class="card" data-id=${tarjetas.id}><div class="imagen"><img src="${tarjetas.thumbnail.path}/portrait_uncanny.${tarjetas.thumbnail.extension}" alt=""></div>
            <div class="info"><div class="nombre"><p>${tarjetas.title}</p></div></div></article>`);
              });
            });
        });
    };
  });
};


////////////////////////  PAGINADO  //////////////////////////

const botonPrimeraPagina = document.getElementById("first");
const botonPaginaAnterior = document.getElementById("previous");
const botonProximaPagina = document.getElementById("next");
const botonUltimaPagina = document.getElementById("last");
const paginador = document.getElementById("paginador");
let piePaginador = document.getElementById("ver-pagina-actual");
let verPaginaActual = document.getElementById("pagina-actual");
let paginasTotales = document.getElementById("paginas-totales");

console.log(verPaginaActual)


botonPrimeraPagina.onclick = () => {
  paginaActual = 0;
  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
};

botonPaginaAnterior.onclick = () => {
  paginaActual--;
  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
};

botonProximaPagina.onclick = () => {
  paginaActual++;
  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
};

botonUltimaPagina.onclick = () => {
  cantidadDePaginas = resultadosTotales / resultadosPorPagina;
  let resto = resultadosTotales % resultadosPorPagina;
  if (resto > 0) {
    paginaActual = Math.floor(cantidadDePaginas);
  } else {
    paginaActual = (resultadosTotales - resto) / resultadosPorPagina;
  }
  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
};


///////////////////// DESHABILITAR PAGINADO SI CORRESPONDE ////////////////////////

const chequearBotonesIniciales = () => {
  if (paginaActual === 0) {
    botonPrimeraPagina.disabled = true;
    botonPaginaAnterior.disabled = true;
    botonPrimeraPagina.classList.add("disabled");
    botonPaginaAnterior.classList.add("disabled");
  } else {
    botonPrimeraPagina.disabled = false;
    botonPaginaAnterior.disabled = false;
    botonPrimeraPagina.classList.add("disabled");
    botonPaginaAnterior.classList.add("disabled");
  }
};

const chequearBotonesFinales = (offset, total) => {
  if (offset + 20 > total) {
    botonUltimaPagina.disabled = true;
    botonProximaPagina.disabled = true;
    botonUltimaPagina.classList.add("disabled");
    botonProximaPagina.classList.add("disabled");
  } else {
    botonUltimaPagina.disabled = false;
    botonProximaPagina.disabled = false;
    botonUltimaPagina.classList.add("disabled");
    botonProximaPagina.classList.add("disabled");
  }
};
