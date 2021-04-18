Querida Flor, 

Quiero en primer lugar felicitarte por haber hecho un hermoso trabajo. En general todo funciona mas que bien, navegamos por la web de manera fluida y comoda, esta pagina esta lista para ser publicada y usada. Qué orgullo verlo funcionando: no pareciera haber sido hecha por una alumna que hasta hace unos meses no sabía lo que era HTML. 

El nivel de detalle puesto en cada comportamiento, en cada animacion, en cada aspecto del maquetado, habla de muuucho tiempo invertido acá, de varios intentos probando todas y cada una de las posibilidades de tu página, de muchos errores y bugs analizados y corregidos. 

Con respecto al comportamiento de tu web, hay dos cositas que quiero comentar. La primera es que dentro de la sección de detalle tanto de comics como de personajes, las tarjetas no son links. Fijate que en el modelo, al hacer click nos llevan al detalle de ese comic/personaje. Es una de las funcionalidades mas ambiciosas de la web, ya que tiene mucho potencial para enredarnos. No se bien por qué no la encaraste: si fue un descuido, si fue falta de tiempo o si intentaste hacerlo y no pudiste. En el ultimo caso, escribime!. De todos modos, si eso fue lo que ocurrió, celebro que lo hayas dejado como está en lugar de entregarme una funcionalidad a medias: me parece bien que tomen estos trabajos como entregas de productos, ya que eso es lo que se espera de ustedes en el mundo laboral de sistemas, y salvo que uno sepa lo que deben hacer esas tarjetas, no se siente su falta. Lo unico que corregiria ahi es sacar el cursor:pointer de esas tarjetas, ya que siempre que vemos eso tenemos la idea de que nos llevarán a algun lado. 

El segundo comentario es que en la seccion de detalles de un comic estas siempre asumiendo que te vendrá la información que necesitas. Eso es un error, en las APIs en general, y en la de Marvel en particular. Notá que si falta la descripción terminamos viendo "descripción: null" en tu web. Si falta el guionista, el resultado es aun peor: como la funcion de JS lanza un error, toda la seccion se ve en blanco. 

En tu codigo vos construis tus tarjetas asi:
```js
  <h2>${comicSeleccionado.title}</h2>
  <h3>PUBLICADO:</h3><p>${fechaCortada}</p>
  <h3>GUIONISTAS:</h3><p>${comicSeleccionado.creators.items[0].name}</p>
  <h3>DESCRIPCIÓN:</h3><p>${comicSeleccionado.description}</p>
  ```

Cuando trabajamos con APIs, o con información que haya escrito un usuario, *siempre* debemos programar a la defensiva: asumiendo que todo lo que puede salir mal, saldrá mal. Que no vendrá la información que esperamos, que vendrá vacía, o mal formateada. 

En este caso, como minimo, tendriamos que asumir que algunos de los datos van a faltar. Que comicSeleccionado.creators no tendrá un array `items` y que `descripcion` puede venir `null`. Entonces podriamos escribir: 

```js

const guionistasFormateados = (comicSeleccionado.creators.items.length && comicSeleccionado.creators.items[0].name) || "No disponible"
  <h2>${comicSeleccionado.title}</h2>
  <h3>PUBLICADO:</h3><p>${fechaCortada}</p>
  <h3>GUIONISTAS:</h3><p>${guionistasFormateados}</p>
  <h3>DESCRIPCIÓN:</h3><p>${comicSeleccionado.description || "No disponible" }</p>
  ```

Con respecto al aspecto visual de tu web, la unica cosa que mencionaría es que el footer no se ve bien en mobile. Que esto sea el unico comentario para hacerte me llena de orgullo!. 

Con respecto a tu codigo, 
Tu HTML esta muy bien. Usas bien las etiquetas semanticas y dominas el maquetado. Te deje algunas observaciones salteadas: la que mas me preocupa es el uso de los h1, que se espera que domines a esta altura, y cierto uso excesivo de divs en lugares que no son necesarios. 

Con respecto a tus estilos, tu Sass esta algo desaprovechado: si bien me demuestra que entendiste los conceptos generales vistos, creo que valdria la pena que le dediques mas tiempo y lo apliques con mas seriedad en un proyecto futuro. No declaras ninguna variable, a pesar de que hay mil cosas que podrian estar en variables (colores, tamaños, margenes, tipografias, todo lo que se repite mas de una vez deberia estar en una variable igual que en JS). Usas un mixin para el font-family cuando deberia ser una variable. No hay ningun intento de aplicar arquitectura, asi que terminamos con un archivo de estilos muy largo y muy dificil de mantener. Al menos, separar los mixins y variables por un lado, y hacer distintos archivos para cada componente, habria sido bueno y te aseguro que te habria ahorrado un montoooooon de tiempo estilando. Dale una oportunidad mas en serio a Sass apenas puedas: te juro que te va a gustar! 

Por otro lado, hay un archivo de sass "syles.scss" que no se usa en ningun lado. Por que esta ahi? Si no se usa, deberia borrarse. 

Con respecto a tu JS, esta mas desprolijo de lo que me gustaria. La logica esta impecable, pero desearia que le hubieras puesto la misma atencion al detalle y cuidado al codigo de lo que hiciste con tu web. Tenes muchisimo codigo que se deberia extraer en funciones mas pequeñas, muchisimo codigo que se repite y que deberia estar en funciones reutilizables, mucho desaprovechamiento de las posibilidades de JS. Todo funciona, sin dudas, pero podria ser mejor, mas claro, mas amable con el lector. Te mencioné varias a lo largo de tu codigo, pero hay mas: si en algun momento tenes ganas, creo que vale muchiiiisimo la pena que inviertas tiempo en mejorar este codigo, hacerlo mas funcional, mas abstracto. Va a ser un buen ejercicio para mejorar la calidad de este codigo y de cualquiera que escribas en el futuro. 

Con respecto al proyecto en github, celebro que hayas sido prolija yendo commit a commit, que hayas usado branches y la calidad de tu readme. 

Estoy algo conflictuada poniendole nota a tu trabajo. El codigo puede mejorar, y no te refleja: se que sos capaz de muchisimo mas. Pero la calidad del producto final es muy alta. A la larga, yo como desarrolladora pienso que la calidad del producto final es mas importante que la calidad del codigo, pero no todo el mundo piensa como yo - y muchas de las personas que tienen ojo muy critico con el codigo van a mirar este factor a la hora de decidir contratarte. Se nota tu interes y ganas en hacer que quede lo mejor posible: invertí esas ganas tambien en tu codigo, en aplicar las lecciones aprendidas de Sass, en aprovechar la maximo las funcionalidades que JS nos da. Y, por supuesto, consultame todo lo que quieras si algo de esto te genera dudas. Para eso estoy. 

Siempre digo que cualquiera puede aprender a programar, pero no cualquiera puede entregar un producto de esta calidad, porque depende de algo adentro de una que no se puede enseñar: las ganas de hacer, de hacer bien. En el mundo del código, Flor, a la larga no triunfan ni los mas soberbios, ni los que se venden mejor, ni siquiera los mas inteligentes o los que mas saben. Porque ninguna de esas cosas sirve de nada si no viene acompañada de **ganas**, de hambre, de deseo de ir un poquito mas allá. Esas ganas son tu mejor aliada. Si me permitis un consejo: cultivalas, cuidalas. Encará proyectos que te entusiasmen, rodeate de personas que te incentiven, y cuando te frustres, tomate un descanso. Separate del codigo por un momento, de las ganas de terminar sea como sea, para volver fresca y con tus ganas renovadas. No pierdas de vista nunca todos los momentos en que seguiste adelante con el código a pura fuerza de voluntad y terminaste festejando como si fuera un gol.


  ✅ Respeta la consigna
  ✅ Respeta el diseño dado
  ✔️ Respeta el funcionamiento
  ✅ Responsive funciona correctamente

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ❌  Uso de variables (SASS)

  ❌ Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ✅ Nombres de branchs adecuados

  ❌ Componentización de estilos (SASS)
  ❌ Funciones pequeñas
  ✔️ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ✔️ Reutilización de lógica / funciones
  ✅ Commits con mensajes adecuados

Nota final: **8**
