const tipo = document.getElementById("tipo-elegido");
const orden = document.getElementById("orden-elegido");
const input = document.getElementById("busqueda-por-texto");

const cambiaOpcion = () => {
 let opciones = orden.lenght

  if (tipo.value == "comics") {
    while (i < opciones) {
      orden.remove(i);
    }
 

    option0 = document.createElement("option");
    option1 = document.createElement("option");
    option2 = document.createElement("option");
    option3 = document.createElement("option");
    option0.value = "title";
    option1.value = "-title";
    option2.value = "-focDate";
    option3.value = "focDacte";
    option0.text = "A-Z";
    option1.text = "Z-A";
    option2.text = "Mas nuevos";
    option3.text = "Mas viejos";
    orden.add(option0);
    orden.add(option1);
    orden.add(option2);
    orden.add(option3);
  }

  if (tipo.value == "characters") {
    orden.remove("option");
    orden.remove("option");
    orden.remove("option");
    orden.remove("option");

    option1 = document.createElement("option");
    option2 = document.createElement("option");
    option1.value = "name";
    option2.value = "-name";
    option1.text = "A-Z";
    option2.text = "Z-A";
    orden.add(option1);
    orden.add(option2);
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
// SELECTORES DE LOS FILTROS

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

//   personajes.map((info) => {
//     resultados.innerHTML += `<article class="card"><div class="imagen"><img src="${info.thumbnail.path}.jpg" alt=""></div>
// <div class="info">
// <div class="nombre"><h2>${info.name}</h2></div></div>
// </article>`;

// Si elige comics y el input esta vacio, entonces filtra por orden alfabetico
// Si elige comics y el input esta lleno, filtra por texto y orden

// Si elije personajes y el input ....

//     if (input.value ===

/////////////////// SELECCIONAR TARJETA PARA VER DETALLE ////////////////////////////

//////////////////////////////   PAGINADO  ////////////////////////////

////////////////////////   MOSTRAR DETALLE DE COMIC   ////////////////////////

////////////////////////   MOSTRAR DETALLE DE PERSONAJE   ////////////////////////
