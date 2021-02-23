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


// let pagina = 
// const botonPrimeraPagina = document.getElementById("first")
// const botonPaginaAnterior = document.getElementById("previous")
// const botonProximaPagina = document.getElementById("next")
// const botonUltimaPagina = document.getElementById("last")


// DATOS DE LA URL DEL FETCH DE MARVEL
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = "cdf503fce8f2c519f899f64cff25fd79";
const botonBuscar = document.getElementById("buscar");

// SI EL INPUT DE TEXTO ESTA VACIO buscara por TIPO Y ORDEN
const filtradoInputVacio = (tipo, orden) => {
  fetch(`${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}&offset=0`)
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      if (tipo == "comics") {
        mostrarComics(info);
      } else if (tipo == "characters") {
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
      }?apikey=${apiKey}&orderBy=${orden}&titleStartsWith=${texto}`
    )
      .then((res) => {
        return res.json();
      })
      .then((info) => {
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
        mostrarPersonajes(info);
      });
  }
};

///////////////// EJECUCION DE COMBINACIONES DE FILTROS DE BUSQUEDA  /////////////////

botonBuscar.onclick = () => {
  ///////////// INPUT VACIO buscara por TIPO Y ORDEN
  ///////////// INPUT LLENO buscara por TIPO, ORDEN Y TEXTO
  if (input.value === "") {
    filtradoInputVacio(tipo.value, orden.value);
  } else if (input.value !== "") {
    filtradoInputLleno(tipo.value, orden.value, input.value);
  }
};

///////////////// FUNCION PARA CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON COMICS /////////////////

mostrarComics = (info) => {
  let comic = info.data.results;
  const resultados = document.getElementById("resultados");
  const totalComics = document.getElementById("filtrado");

  totalComics.innerHTML = `${info.data.total}`;

  resultados.innerHTML = "";

  comic.map((info) => {
    resultados.innerHTML += `<article class="card" data-id=${info.id}><div class="imagen"><img src="${info.thumbnail.path}/portrait_incredible.${info.thumbnail.extension}" alt=""></div>
    <div class="info"><div class="nombre"><h2>${info.title}</h2></div></div></article>`;
  });

  const tarjeta = document.querySelectorAll(".card");

  /// SELECCIONAR TARJETA PARA VER DETALLE ///

  tarjeta.forEach((tarjeta) => {
    tarjeta.onclick = () => {
      resultados.innerHTML = "";
      totalComics.innerHTML = "";

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
          console.log(fecha);
          console.log(info);

          resultados.innerHTML = `<div class="contenedor-detalle">
          <div id="info-detalle-primaria"><div id="info-detalle-primaria-imagen"><img src="${comicSeleccionado.thumbnail.path}/portrait_incredible.${comicSeleccionado.thumbnail.extension}" alt=""></div>
            <div id="info-detalle-primaria-data"><h2>${comicSeleccionado.title}</h2>
            <h3>PUBLICADO:</h3><p>${fechaCortada}</p><h3>GUIONISTAS:${comicSeleccionado.creators.items[0].name}</h3>
            <h3>DESCRIPCIÓN:</h3><p>${comicSeleccionado.description}</p></div>
           </div> <div id="info-detalle-secundaria"></div></div>
          `;

          fetch(
            `https://gateway.marvel.com/v1/public/comics/${tarjeta.dataset.id}/characters?apikey=${apiKey}`
          )
            .then((res) => {
              return res.json();
            })
            .then((info) => {
              console.log(info);
              let personaje = info.data.results;
              let resultadosPersonajes = document.getElementById(
                "info-detalle-secundaria"
              );

              personaje.map((tarjetas) => {
                return (resultadosPersonajes.innerHTML += `           
                <div id="info-tarjeta-personaje" data-id=${tarjeta.id}> <div><img src="${tarjetas.thumbnail.path}/portrait_large.${tarjetas.thumbnail.extension}" alt=""></div>
                <div id="info-tarjeta-personaje-name"><p>${tarjetas.name}<p></div></div>`);
              });

              // const tarjetas = document.querySelectorAll(
              //   "#info-tarjeta-personaje"
              // );

              // tarjetas.forEach((tarjeta) => {
              //   tarjeta.onclick = () => {
              //     let id = tarjeta.dataset.id;
              //     console.log("hice clic");
              //     fetchearPersonaje(id);
              //   };
              // });
            });
        });
    };
  });
};

// FUNCION PARA CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON PERSONAJES //

mostrarPersonajes = (info) => {
  let personajes = info.data.results;
  const resultados = document.getElementById("resultados");
  const totalComics = document.getElementById("filtrado");

  totalComics.innerHTML = `${info.data.total}`;
  resultados.innerHTML = "";

  personajes.map((info) => {
    resultados.innerHTML += `<article class="card" data-id=${info.id}><div class="imagen"><img src="${info.thumbnail.path}/portrait_incredible.${info.thumbnail.extension}" alt=""></div>
    <div class="info"> <div class="nombre"><h2>${info.name}</h2></div></div></article>`;
  });

  /// SELECCIONAR PERSONAJE PARA VER DETALLE ///

  const personaje = document.querySelectorAll("article");

  personaje.forEach((personaje) => {
    personaje.onclick = () => {
      console.log("me hicieron clic");
      resultados.innerHTML = "";
      totalComics.innerHTML = 0;
    

        fetch(
          `https://gateway.marvel.com/v1/public/characters/${personaje.dataset.id}?apikey=${apiKey}`
        )
          .then((res) => {
            return res.json();
          })
          .then((info) => {
            console.log(info);
            let personajeSeleccionado = info.data.results;
            console.log(personajeSeleccionado);

            resultados.innerHTML = `<div class="imagen"><img src="${personajeSeleccionado[0].thumbnail.path}/portrait_incredible.${personajeSeleccionado[0].thumbnail.extension}" alt=""></div>
    <div class="nombre"><h2>${personajeSeleccionado[0].name}</h2></div>
    <div><h3>${personajeSeleccionado[0].description}</h3></div>
    </div> <div id="info-detalle-secundaria"></div></div>`;
          });

        fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}/comics?apikey=${apiKey}`
        )
          .then((res) => {
            return res.json();
          })
          .then((info) => {
            console.log(info);
            let participacionPersonaje = info.data.results;
            console.log(participacionPersonaje);

            let resultadosComics = document.getElementById(
              "info-detalle-secundaria"
            );

            participacionPersonaje.map((tarjetas) => {
              return (resultadosComics.innerHTML += `           
          <div id="info-tarjeta-comic" data-id=${tarjetas.title}> <div><img src="${tarjetas.thumbnail.path}/portrait_large.${tarjetas.thumbnail.extension}" alt=""></div>
          <div id="info-tarjeta-comic-title"><p>${tarjetas.title}<p></div></div>`);
            });
          });
    };
  });
};
