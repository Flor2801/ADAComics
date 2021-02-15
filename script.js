// FUNCION PARA CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON COMICS //

mostrarComics = (info) => {
  let comic = info.data.results;
  const resultados = document.getElementById("resultados");
  const totalComics = document.getElementById("filtrado");

  totalComics.innerHTML = `${info.data.total}`;

  resultados.innerHTML = "";

  comic.map((info) => {
    resultados.innerHTML += `<article class="card"><div class="imagen"><img src="${info.thumbnail.path}/portrait_incredible.${info.thumbnail.extension}" alt=""></div>
    <div class="info"><div class="nombre"><h2>${info.title}</h2></div></div></article>`;
  });

  const tarjeta = document.querySelectorAll('article')
console.log(tarjeta)

tarjeta.forEach((article) => {
  article.onclick = () => {
    console.log('me hicieron clic') 
  }
})

};

// FUNCION PARA CREAR LAS TARJETAS CUANDO LA OPCION ELEGIDA SON PERSONAJES //

mostrarPersonajes = (info) => {
  let personajes = info.data.results;
  const resultados = document.getElementById("resultados");
  const totalComics = document.getElementById("filtrado");

  totalComics.innerHTML = `${info.data.total}`;

  resultados.innerHTML = "";

  personajes.map((info) => {
    resultados.innerHTML += `<article class="card"><div class="imagen"><img src="${info.thumbnail.path}/portrait_incredible.${info.thumbnail.extension}" alt=""></div>
    <div class="info"> <div class="nombre"><h2>${info.name}</h2></div></div></article>`;
  });
};


// FECTH INCIAL PARA CARGAR LA PAGINA (muestra cómics)

fetch("https://gateway.marvel.com:443/v1/public/comics?apikey=cdf503fce8f2c519f899f64cff25fd79&orderBy=title")

  .then((data) => {
    return data.json();
  })
  .then((info) => {
    mostrarComics(info);
  });


////////////////////////   FILTROS DE BUSQUEDA  ////////////////////////

// Tipo: COMICS 
// Orden: A-Z // Z-A // Mas nuevo // Mas viejo --------> orderBy
// Input: vacio // lleno  --------> titleStartsWith

// Tipo: PERSONAJE (Characters)
// Orden: A-Z // Z-A --------> orderBy
// Input: vacio // lleno   --------> nameStartsWith

// Luego de enviado el form (boton buscar) el sistema comprueba si el usuario selecciono "Comics" o "Personajes",
// IF el input esta vacio, sólo ordena de forma alfabetica o inversa.
// IF el input tiene algo, entonces combina el texto de búsqueda con el el orden alfabético.


// DATOS DE LA URL DEL FETCH DE MARVEL
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = "cdf503fce8f2c519f899f64cff25fd79";
// BOTON BUSCAR DE ENVIO DEL FORM
const botonBuscar = document.getElementById("buscar");
// SELECTORES DE LOS FILTROS
const tipo = document.getElementById("tipo-elegido");
const orden = document.getElementById("orden-elegido");
const input = document.getElementById("busqueda-por-texto");




// SI EL INPUT DE TEXTO ESTA LLENO buscara por TIPO, ORDEN, TEXTO

const filtradoInputLleno = (tipo, orden, texto) => {
  if ((tipo = "comics")) {
    fetch(`${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}&titleStartsWith=${texto}`
    )
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        mostrarComics(info);
      });

  } else if ((tipo = "personajes")) {
    fetch(`${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}&nameStartsWith=${texto}`
    )
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        mostrarPersonajes(info);
      });
  }
};

  // SI EL INPUT DE TEXTO ESTA VACIO buscara por TIPO Y ORDEN
const filtradoInputVacio = (tipo, orden) => {
  fetch(`${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}`)
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      mostrarPersonajes(info);
    });
};





////////////////// CODIGO VIEJO  //////////////////


botonBuscar.onclick = () => {

///////////// INPUT VACIO buscara por TIPO Y ORDEN

  if (input.value === "" && orden.value == "A-Z") {
    let valorOrden = "";
    let valorTipo = "";

    if (tipo.value == "comics") {
      valorTipo = "comics";
      valorOrden = "title"

    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
      valorOrden = "name";
    }

    filtradoInputVacio(valorTipo, valorOrden);
  }

  if (input.value === "" && orden.value == "Z-A") {
    let valorOrden = "";
    let valorTipo = "";

    if (tipo.value == "comics") {
      valorTipo = "comics";
      valorOrden = "-title";

    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
      valorOrden = "-name";
    }

    filtradoInputVacio(valorTipo, valorOrden);
  }


  if (input.value === "" && tipo.value === "comics" && orden.value === "mas viejos") {
    let valorOrden = "-onsaleDate";
    let valorTipo = "comics"

    filtradoInputVacio(valorTipo, valorOrden);
  }

  
  if (input.value === "" && tipo.value === "comics" && orden.value === "mas nuevos") {
    let valorOrden = "onsaleDate";
    let valorTipo = "comics"

    filtradoInputVacio(valorTipo, valorOrden);
  }

 /////////     INPUT LLENO buscara por TIPO, ORDEN Y TEXTO

  if (input.value !== "" && orden.value == "A-Z") {
    let valorOrden = "";
    let valorTipo = "";
    let valorTexto = input.value

    if (tipo.value == "comics") {
      valorTipo = "comics";
      valorOrden = "title"

    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
      valorOrden = "name"
    }

    filtradoInputLleno(valorTipo, valorOrden, valorTexto);
  }

  if (input.value !== "" && orden.value == "Z-A") {
    let valorOrden = "";
    let valorTipo = "";
    let valorTexto = input.value

    if (tipo.value == "comics") {
      valorTipo = "comics";
      valorOrden = "-title"

    } else if (tipo.value == "personajes") {
      valorTipo = "characters";
      valorOrden = "-name"
    }

    filtradoInputLleno(valorTipo, valorOrden, valorTexto);
  }

  if (input.value === "" && tipo.value === "comics" && orden.value !== "") {
    let valorOrden = "";
    let valorTipo = "comics"

    if (orden.value == "mas viejos") {
      valorOrden = "-onsaleDate";
    }
    else if (orden.value == "mas nuevos") {
      valorOrden = "onsaleDate";
    }

    filtradoInputVacio(valorTipo, valorOrden);
  }
};

/////////////////// SELECCIONAR TARJETA PARA VER DETALLE ////////////////////////////



  //   personajes.map((info) => {
  //     resultados.innerHTML += `<article class="card"><div class="imagen"><img src="${info.thumbnail.path}.jpg" alt=""></div>
  // <div class="info">
  // <div class="nombre"><h2>${info.name}</h2></div></div>
  // </article>`;

// Si elige comics y el input esta vacio, entonces filtra por orden alfabetico
// Si elige comics y el input esta lleno, filtra por texto y orden

// Si elije personajes y el input ....



// FUNCION PARA EJECUTAR EL PROCESO DE FILTRADO Y BUSQUEDA

// botonBuscar.onclick = () => {

//   // SI EL USUARIO ELIGE COMICS
//   if (tipo.value == "comics") {
//     let tipo = "comics";
//     let orden = "title";
//     let texto = "";

//     if (input.value === "" && orden.value == "Z-A") {
//       orden = "-title";
//       filtradoInputVacio(tipo, title);
//     }

//     if (input.value === "" && orden.value == "A-Z") {
//       filtradoInputVacio(tipo, title);
//     }

//       if (input.value === "" && orden.value == "Mas nuevo") {
  //       orden = "-title";
  //       filtradoInputVacio(tipo, title);
  //     }
  
  //     if (input.value === "" && orden.value == "A-Z") {
  //       filtradoInputVacio(tipo, title);
  //     }

//     if (input.value !== "" && orden.value == "Z-A") {
//       orden = "-title";
//       texto = input.value;
//       filtradoInputLleno(tipo, title, texto);
//     }

//     if (input.value !== "" && orden.value == "A-Z") {
//       texto = input.value;
//       filtradoInputLleno(tipo, title, texto);
//     }

//   }
    
//     // SI EL USUARIO ELIGE PERSONAJES
//     else if (tipo.value == "personajes") {
//     let tipo = "characters";
//     let title = "name";

//     if (input.value === "" && orden.value == "Z-A") {
//       title = "-name";
//       filtradoInputVacio(tipo, title);
//     }

//     if (input.value === "" && orden.value == "A-Z") {
//       filtradoInputVacio(tipo, title);
//     }

//     if (input.value !== "" && orden.value == "Z-A") {
//       title = "-name";
//       texto = input.value;
//       filtradoInputLleno(tipo, title, texto);
//     }

//     if (input.value !== "" && orden.value == "A-Z") {
//       texto = input.value;
//       filtradoInputLleno(tipo, title, texto);
//     }
//   }
// };



/////////////////// SELECCIONAR TARJETA PARA VER DETALLE ////////////////////////////

//////////////////////////////   PAGINADO  ////////////////////////////

let numeroDePagina = 0



////////////////////////   MOSTRAR DETALLE DE COMIC   ////////////////////////

////////////////////////   MOSTRAR DETALLE DE PERSONAJE   ////////////////////////



