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
    orden.innerHTML += `<option value="title">"A-Z"</option>`;
    orden.innerHTML += `<option value="-title">"Z-A"</option>`;
    orden.innerHTML += `<option value="-focDate">"Mas nuevos"</option>`;
    orden.innerHTML += `<option value="focDate">"Mas viejos"</option>`;
  }

  if (tipo.value == "characters") {
    let opciones = orden.length;
    let i = 0;
    while (i < opciones) {
      orden.remove("option");
      i++;
    }
    orden.innerHTML += `<option value="name">"A-Z"</option>`;
    orden.innerHTML += `<option value="-name">"Z-A"</option>`;
  }
};

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

  const tarjeta = document.querySelectorAll("article");
  console.log(tarjeta);

  tarjeta.forEach((article) => {
    article.onclick = () => {
      console.log("me hicieron clic");
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
    resultados.innerHTML += `<article class="card"><div class="imagen"><img src="${info.thumbnail.path}/portrait_incredible.${info.thumbnail.extension}" alt=""></div>
    <div class="info"> <div class="nombre"><h2>${info.name}</h2></div></div></article>`;
  });
};

// FECTH INCIAL PARA CARGAR LA PAGINA (muestra cómics)

fetch(
  "https://gateway.marvel.com:443/v1/public/comics?apikey=cdf503fce8f2c519f899f64cff25fd79&orderBy=title"
)
  .then((data) => {
    return data.json();
  })
  .then((info) => {
    mostrarComics(info);
  });

////////////////////////   FILTROS DE BUSQUEDA  ////////////////////////

// Luego de enviado el form (boton buscar) el sistema comprueba si el usuario selecciono "Comics" o "Personajes",
// IF el input esta vacio, sólo ordena de forma alfabetica o inversa.
// IF el input tiene algo, entonces combina el texto de búsqueda con el el orden alfabético.

// DATOS DE LA URL DEL FETCH DE MARVEL
const urlBase = "https://gateway.marvel.com/v1/public/";
const apiKey = "cdf503fce8f2c519f899f64cff25fd79";
// BOTON BUSCAR DE ENVIO DEL FORM
const botonBuscar = document.getElementById("buscar");


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

// SI EL INPUT DE TEXTO ESTA VACIO buscara por TIPO Y ORDEN
const filtradoInputVacio = (tipo, orden) => {
  if (tipo == "comics") {
    fetch(`${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}&offset=0`)
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        mostrarComics(info);
      });
  } else if (tipo == "characters") {
    fetch(`${urlBase + tipo}?apikey=${apiKey}&orderBy=${orden}&offset=0`)
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

  if (tipo.value === "comics") {
    if (input.value === "") {
      filtradoInputVacio(tipo.value, orden.value);
    } else if (input.value !== "") {
      filtradoInputLleno(tipo.value, orden.value, input.value);
    }
  } else if (tipo.value === "characters") {
    if (input.value === "") {
      filtradoInputVacio(tipo.value, orden.value);
    } else if (input.value !== "") {
      filtradoInputLleno(tipo.value, orden.value, input.value);
    }
  }
};

/////////////////// SELECCIONAR TARJETA PARA VER DETALLE ////////////////////////////

// Seleccionar una tarjeta, hace clic en cualquier de ellas. Se borra todo el contenido del html.
// Se crean 3 div con la imegen, info del comic o
// Se ecran 2 divs, info del personajes.

/////////////////// SELECCIONAR TARJETA PARA VER DETALLE ////////////////////////////

//////////////////////////////   PAGINADO  ////////////////////////////

////////////////////////   MOSTRAR DETALLE DE COMIC   ////////////////////////

////////////////////////   MOSTRAR DETALLE DE PERSONAJE   ////////////////////////
