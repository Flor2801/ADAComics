// FECTH INCIAL PARA CARGAR LA PAGINA (muestra cómics)
fetch(
  "https://gateway.marvel.com:443/v1/public/comics?apikey=cdf503fce8f2c519f899f64cff25fd79&orderBy=title&offset=0"
)
  .then((data) => {
    return data.json();
  })
  .then((info) => {
    mostrarComics(info);
  });

////////////////////////   FILTROS DE BUSQUEDA  ////////////////////////

// Luego de enviado el form (boton buscar) el sistema comprueba si el usuario selecciono "Comics" o "Personajes",
// Si el input esta vacio, sólo ordena de forma alfabetica o inversa.
// Si el input tiene algo, entonces combina el texto de búsqueda con el el orden alfabético.

/// SELECCIONAR FILTROS
const tipo = document.getElementById("tipo-elegido");
const orden = document.getElementById("orden-elegido");
const input = document.getElementById("busqueda-por-texto");

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

// boton primera pagina: pagina 1, offset 0 (pagina = total / 20) (offset numeros de pagina * 20)
// boton anterior pagina: suma 1 pagina, multiplica pags por 20 (offset)
// boton proxima pagina: suma 1 pagina, multiplica pags por 20 (offset)
// boton ultima pagina: al total de resultados, le resta 20, hace offset con ese valor
let resultadosTotales = 0;
let paginaActual = 0;
let resultadosPorPagina = 20;
let cantidadDePaginas = 0;
const botonPrimeraPagina = document.getElementById("first");
const botonPaginaAnterior = document.getElementById("previous");
const botonProximaPagina = document.getElementById("next");
const botonUltimaPagina = document.getElementById("last");
const paginador = document.getElementById("paginador");
const masResultados = document.getElementById("masresultados");

// DATOS DE LA URL DEL FETCH DE MARVEL
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = "cdf503fce8f2c519f899f64cff25fd79";
const botonBuscar = document.getElementById("buscar");

// SI EL INPUT DE TEXTO ESTA VACIO buscara por TIPO Y ORDEN
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

// SI EL INPUT DE TEXTO ESTA LLENO buscara por TIPO, ORDEN, TEXTO
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

////////////////////////  PAGINADO  //////////////////////////

let mostrarPagina = document.getElementById("pagina-actual");
let paginasTotales = document.getElementById("paginas-totales");
const resultados = document.getElementById("resultados");
let totalComics = document.getElementById("filtrado");

botonPrimeraPagina.onclick = () => {
  paginaActual = 0;
  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
  // botonPrimeraPagina.disabled = true;
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

///////////////// EJECUCION DE COMBINACIONES DE FILTROS DE BUSQUEDA  /////////////////

botonBuscar.onclick = () => {
  paginaActual = 0;
  totalResultados.classList.remove("oculto");
  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
};

///////////////// FUNCION PARA CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON COMICS /////////////////
let totalResultados = document.getElementById("total-resultado");

mostrarComics = (info) => {
  let comic = info.data.results;

  totalComics.innerHTML = `${info.data.total}`;
  mostrarPagina.innerHTML = paginaActual;
  paginasTotales.innerHTML = Math.floor(info.data.total / 20);
  resultados.innerHTML = "";

  comic.map((info) => {
    resultados.innerHTML += `<article class="card" data-id=${info.id}><div class="imagen"><img src="${info.thumbnail.path}/portrait_uncanny.${info.thumbnail.extension}" alt=""></div>
    <div class="info"><div class="nombre"><p>${info.title}</p></div></div></article>`;
  });

  const tarjeta = document.querySelectorAll(".card");

  /// VER DETALLE DE COMICS ///

  tarjeta.forEach((tarjeta) => {
    tarjeta.onclick = () => {
      resultados.innerHTML = "";
      totalComics.innerHTML = "";
      totalResultados.classList.add("oculto");

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

// FUNCION PARA CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON PERSONAJES //

mostrarPersonajes = (info) => {
  let personajes = info.data.results;

  totalComics.innerHTML = `${info.data.total}`;
  mostrarPagina.innerHTML = paginaActual;
  paginasTotales.innerHTML = Math.floor(info.data.total / 20);
  resultados.innerHTML = "";

  personajes.map((info) => {
    resultados.innerHTML += `<article class="card-tarjeta-personaje" data-id=${info.id}><div class="imagen"><img src="${info.thumbnail.path}/portrait_incredible.${info.thumbnail.extension}" alt=""></div>
    <div class="info"> <div class="nombre"><h2>${info.name}</h2></div></div></article>`;
  });

  /// VER DETALLE DE PERSONAJE ///

  const personaje = document.querySelectorAll("article");

  personaje.forEach((personaje) => {
    personaje.onclick = () => {
      resultados.innerHTML = "";
      totalComics.innerHTML = 0;
      totalResultados.classList.add("oculto");

      fetch(
        `https://gateway.marvel.com/v1/public/characters/${personaje.dataset.id}?apikey=${apiKey}`
      )
        .then((res) => {
          return res.json();
        })
        .then((info) => {
          let personajeSeleccionado = info.data.results;

          paginador.classList.add("oculto");
          masResultados.classList.remove("oculto");

          resultados.innerHTML = `<div class="contenedor-detalle">
          <div id="info-detalle-primaria">
          <div id="info-detalle-primaria-imagen"><img src="${personajeSeleccionado[0].thumbnail.path}/standard_fantastic.${personajeSeleccionado[0].thumbnail.extension}" alt=""></div>
            <div id="info-detalle-primaria-data">
            <h2>${personajeSeleccionado[0].name}</h2>
            <p>${personajeSeleccionado[0].description}</p></div>
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
