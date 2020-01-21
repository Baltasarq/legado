// El legado (c) 2020 MIT License Baltasar <baltasarq@gmail.com>
/*
	generado por FI.JS@txtMap, v0.1/ v0.6 20140612
	Mon Jan 13 11:02:38 2020

*/

ctrl.setTitle( "El legado" );
ctrl.setIntro( "<p>Madrid, 1880\
 <br/>Tu tío ha muerto.\
 <br/>El dolor te embarga... estabais tan unidos...\
 </p>\
 <p>\
 Tu tío siempre te dijo que tú heredarías su fortuna... y su responsabilidad.\
 </p>\
 <p>\
 Nunca supiste a qué se refería exactamente con aquella frase, \
 que te decía cuando eras un niño y jugabas en sus brazos.\
 </p><p>\
 Los años pasaron, y tu tío acaba de morir dejándote como herencia su fortuna. \
 Eso sí, para obtenerla, para ser merecedor de la misma, \
 tendrías que pasar la noche en la biblioteca de su gran casa, \
 y descubrir por tí mismo hasta dónde llegaba, \
 y qué implicaba aquella herencia... sea lo que sea...</p>" );

ctrl.setPic( "res/legado-title.jpg" );
ctrl.setAuthor( "Baltasar (baltasarq@gmail.com)" );
ctrl.setVersion( "3.0 20200117" );

// ***************************************************** Biblioteca --
const locBiblioteca = ctrl.places.creaLoc(
	"Biblioteca",
	[ "biblioteca" ],
	"Esta biblioteca es la más grande que jamás has visto. \
	Decorada con austeridad, miles y miles de ${libros, ex libros} de tamaño y \
	colores variados se agolpan en la vieja estantería, \
	sobrecargada por el peso de los volúmenes y la edad. \
	En la pared norte, la única no cubierta por completo por estanterías, \
	hay un ${tapiz, ex tapiz} y una ${ventana, ex ventana}. \
	En la pared contraria se abre un ${pasillo, s} que conecta \
	la biblioteca con el resto de la casa."
);
locBiblioteca.pic= "res/library.jpg";

locBiblioteca.postGo = function() {
    if ( ctrl.places.getCurrentLoc() == locCuartoOscuro ) {        
        ctrl.print( "Acostumbras los ojos a la oscuridad circundante." );
    }
};

const objVentanaBiblioteca = ctrl.creaObj(
    "ventana",
    [ "ventanal" ],
    "A través de la ventana, observas los edificios en la otra acera, \
     gemelos a los de esta.",
    locBiblioteca,
    Ent.Scenery );

objVentanaBiblioteca.alturaDescubierta = false;
objVentanaBiblioteca.preExamine = function() {
    var toret = this.desc;
    
    if ( !this.alturaDescubierta ) {
        this.alturaDescubierta = true;
        toret += " Te llama la atención una buhardilla encima del \
                  edificio de enfrente... curioso, \
                  puesto que esta casa nunca ha tenido una, hasta donde sabes."
    } else {
        toret += " Esa buhardilla... es importante, lo presientes.";
    }
    
    return toret;
};

const objCandelabro = ctrl.creaObj(
	"candelabro",
	[ "candelabro" ],
	"Es un candelabro de latón dorado.",
	locBiblioteca,
	Ent.Portable
);
objCandelabro.encendido = false;
objCandelabro.preExamine = function() {
    var toret = this.desc;
    
    if ( this.encendido ) {
        toret += " Está encendido.";
    } else {
        toret += " Está ${apagado, enciende candelabro}.";
    }
    
    return toret;
};

objCandelabro.estaAlumbrando = function() {
    return ctrl.isPresent( this ) && this.encendido;
}

objCandelabro.preStart = function() {
    var toret = "No tienes con qué encenderlo.";
    
    if ( ctrl.isPresent( objCerillas ) ) {
        if ( this.encendido ) {
            toret = "¡Ya está encendido!";
        } else {
            toret = "Enciendes el candelabro con una de las cerillas.";
            this.encendido = true;
        }
    }
    
    return toret;
};

const objEstanterias = ctrl.creaObj(
	"estanterias",
	[ "estanterias", "libros", "volumenes" ],
	"Es un antiguo mueble de madera de castaño gallego. \
	Los estantes, pese a su dureza, están combados \
	por el esfuerzo continuado de tantas décadas. \
	Hay volúmenes de todos los tamaños y peso, y también de varios colores. \
	Eso sí, están ordenados alfabéticamente. Puedes ver además \
	un ${libro de tapas azules que te llama la atención, ex libro}.",
	locBiblioteca,
	Ent.Scenery
);

objEstanterias.preExamine = function() {
    var toret = this.desc;
    
    if ( objLibroAzul.getTimesExamined() > 3 ) {
        toret += " Localizas rapidamente ${<i>La Regenta</i>, ex regenta}.";
    }
    
    return toret;
};

const objLibroAzul = ctrl.creaObj(
	"libro azul",
	[ "libro" ],
	"Es un ejemplar magnífico, encuadernado con gran lujo, de El Quijote.\
	<p>‘En un lugar de la mancha, de cuyo nombre no quiero acordarme, \
	no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, \
	adarga antigua, rocín flaco y galgo corredor. \
	Una olla de algo más vaca que carnero, salpicón las más noches, \
	duelos y quebrantos los sábados, lantejas los viernes, \
	algún palomino de añadidura los domingos, \
	consumían las tres partes de su hacienda. (...)’</p>\
	El resto ya lo conoces. Hay algo extraño en ciertos rabos \
	y ciertas partes de las letras del texto. \
	Quizás, si lo estudiaras más a fondo...",
	locBiblioteca,
	Ent.Scenery
);

objLibroAzul.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() > 3 ) {
        toret = "¡Por fin reconoces un mensaje escondido! \
        <p>‘En un Lugar de la manchA, de cuyo nombre no quiero aCordarme, \
        no ha mucho tiempo que vivía un hidaLgo de los de lanza en astillero, \
        Adarga antigua, rocín flaco y galgo corredor. \
        Una olla de algo más Vaca quE carnEro, \
        Salpicón las más noches, duelos y quebRantos los sábados, \
        lantEjas los viernes, alGún palomino dE añadidura los domiNgos, \
        consumían las Tres pArtes de su hacienda. (...)’</p>";
    }
    
    return toret;
};

const objLibroRegenta = ctrl.creaObj(
    "La Regenta",
    [ "regenta" ],
    "Hojeas un excelente tomo, ‘La Regenta’, de Clarín. \
    Te recreas en la minuciosa descripción que el autor hace de \
    la torre de la iglesia, para después maravillarte \
    con la soberbia mención del paisaje. \
    Vuelves a colocar el tomo en su estante.",
    locBiblioteca,
    Ent.Scenery );

objLibroRegenta.preExamine = function() {
    var toret = this.desc;
    
    if ( ctrl.places.limbo.has( objLlave ) ) {
        toret += " ¡De entre las páginas del libro cae una pequeña llave!";
        objLlave.moveTo( locBiblioteca );
        ctrl.places.doDesc();
    }
    
    return toret;
};

const objLlave = ctrl.creaObj(
	"llave",
	[ "llave" ],
	"Pues sí, es una pequeña llave.",
	ctrl.places.limbo,
	Ent.Portable
);

const objPuerta = ctrl.creaObj(
	"puerta",
	[ "puerta" ],
	"Una puerta estaba oculta detrás del tapiz. \
	Es una tosca pero efectiva tabla de fuerte madera chapada en acero, \
	en un marco también muy fuerte.",
	locBiblioteca,
	Ent.Scenery
);

objPuerta.setCloseable();
objPuerta.open = false;

objPuerta.preExamine = function() {
    var toret = this.desc;
    
    if ( this.open ) {
        toret += " Está ${abierta, n}.";
    } else {
        toret += " Está ${cerrada, abre puerta}.";
    }
    
    return toret;
};

objPuerta.preOpen = function() {
    var toret = "¡Ya está abierta!";
    
    if ( !this.open ) {
        if ( ctrl.isPresent( objLlave ) ) {
            this.open = true;
            toret = "Abres la puerta, \
                    dejando ver un ${cuarto sumido en la oscuridad, n}.";
        } else {
            toret = "La puerta tiene una cerradura... ¡es necesaria una llave!";
        }
    }
    
    return toret;
};

const objTapiz = ctrl.creaObj(
	"tapiz",
	[ "tapiz" ],
	"Es un tapiz del almirante Gravina. Comandó la escuadra española \
	en las fuerzas combinadas franco-hispanas, que se enfrentó \
	a la armada inglesa en el cabo de Trafalgar.",
	locBiblioteca,
	Ent.Scenery
);

objTapiz.extended = true;
objTapiz.preExamine = function() {
    var toret = this.desc;
    
    if ( objVentanaBiblioteca.alturaDescubierta ) {
        toret += " El tapiz, ";
        
        if ( this.extended ) {
            toret += "totalmente ${desplegado, empuja tapiz}, ";
        } else {
            toret += "totalmente ${plegado, tira de tapiz}, \
                      deja ver ${una puerta, ex puerta} y";
        }
        
        toret += " cuelga de unas arandelas de madera \
                   en una barra fijada al techo, también de madera.";
    }
    
    return toret;
};

objTapiz.prePush = function() {
    var toret = "";
    
    if ( this.extended ) {
        toret = "Pliegas el tapiz, dejando al descubierto \
                  ${una puerta, ex puerta}.";
        this.extended = false;
    } else {
        toret = "Ya está plegado.";
    }
    
    return toret;
};

objTapiz.prePull = function() {
    var toret = "";
    
    if ( !this.extended ) {
        toret = "Despliegas el tapiz, tapando la puerta.";
        this.extended = true;
    } else {
        toret = "Ya está desplegado.";
    }
    
    return toret;
};


// *********************************************************** Bajo cubierta --
const locBajoCubierta = ctrl.places.creaLoc(
	"Bajo cubierta",
	[ "bajo cubierta" ],
	"Encima del cuarto oscuro se abre un abandonado desván, \
	 lleno de ${trastos viejos, ex trastos} de todo tipo. \
	 Todo está lleno de ${polvo, ex polvo}. \
	 Nunca te habías dado cuenta de que faltaba \
	 el abuhardillado de la casa, aunque la altura es realmente reducida. \
	 Sólo puedes mantenerte de totalmente de pié en el centro, debiendo \
	 agacharte para poder ${bajar por la abertura, abajo} \
	 que conduce al cuarto oscuro. Estás justo encima de la biblioteca."
);
locBajoCubierta.pic = "res/roof.jpg";

const objTrastos = ctrl.creaObj(
    "trastos",
    [],
    "Trastos de todo tipo, como una silla, sábanas tapando más trastos, \
     nada interesante, me temo.",
    locBajoCubierta,
    Ent.Scenery );

const objBonos = ctrl.creaObj(
	"bonos",
	[ "bonos" ],
	"Son una colección exclusiva de 10 bonos del estado, \
	por valor de 10 000 pesetas cada uno. Son cien mil pesetas... \
	toda una fortuna.",
	ctrl.places.limbo,
	Ent.Portable
);

objBonos.postTake = function() {
    ctrl.achievements.achieved( "treasure_hunter" );
};

const objPolvo = ctrl.creaObj(
    "polvo",
    [ "suciedad" ],
    "La suciedad reviste todo el lugar, especialmente el ${suelo, ex suelo}.",
    locBajoCubierta,
    Ent.Scenery );

objPolvo.preExamine = function() {
    var toret = this.desc;
    
    if ( ctrl.places.limbo.has( objSuelo ) ) {
        objSuelo.moveTo( locBajoCubierta );
        locBajoCubierta.desc += "<p>Hay mucho polvo en el ${suelo, ex suelo}.</p>";
        ctrl.places.doDesc();
    }
    
    return toret;
};

const objSuelo = ctrl.creaObj(
    "suelo",
    [],
    "El suelo tiene muchas irregularidades, en lugar de estar \
     formado por tablas perfectamente cortadas.",
    ctrl.places.limbo,
    Ent.Scenery );

objSuelo.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() > 3 ) {
        if ( ctrl.places.limbo.has( objTablas ) ) {
            toret += "<p>¡Encuentras unas ${tablas sueltas, ex tablas}!</p>";
            locBajoCubierta.desc += "<p>¡Hay unas ${tablas flojas, ex tablas}!</p>";
            objTablas.moveTo( locBajoCubierta );
            ctrl.places.doDesc();
        }
    } else {
        toret += "<p>Vas palpando... este suelo es extraño.</p>";
    }
    
    return toret;
};

const objTablas = ctrl.creaObj(
	"tablas",
	[],
	"Palpando el suelo has encontrado unas cuantas \
	 ${tablas sueltas, abre tablas}.",
	ctrl.places.limbo,
	Ent.Scenery
);

objTablas.preOpen = function() {
    var toret = "¡Ya has sacado los bonos!";
    
    if ( ctrl.places.limbo.has( objBonos ) ) {
        toret = "Levantadas las tablas con cuidado, \
                 has ido posando su contenido sobre el suelo a medida que \
                 lo ibas sacando... ¡son ${bonos del estado, ex bonos}!";
        objBonos.moveTo( locBajoCubierta );
        ctrl.places.doDesc();
    }
    
    return toret;
};


// *********************************************************** Cuarto oscuro --
const locCuartoOscuro = ctrl.places.creaLoc(
	"Cuarto oscuro",
	[ "cuarto oscuro" ],
	"El pequeño cuarto oscuro es tan estrecho que \
	prácticamente no cabes en él. La tenue  luz que se filtra \
	${desde la biblioteca, s}, parece no poder vencer la casi tenebrosa \
	atmósfera alrededor. Todo está lleno de polvo, que flota en el ambiente. \
	Hay unos ${salientes moldeados, ex escalera} \
	en la totalidad de una de las paredes, \
	que parecen ${conducir hacia arriba, arriba}, \
	donde la oscuridad, aparentemente, es todavía más densa."
);

locCuartoOscuro.pic = "res/hidden_room.jpg";
locCuartoOscuro.setExitBi( "arriba", locBajoCubierta );
locCuartoOscuro.setExitBi( "sur", locBiblioteca );

locCuartoOscuro.postGo = function() {
    const loc = ctrl.places.getCurrentLoc();
    
    if ( loc == locBiblioteca ) {
        ctrl.print( "Acostumbras los ojos a la luminosa habitación." );
    }
    else
    if ( loc == locBajoCubierta
      || loc == locPasilloBajoTierra )
    {
        if ( !objCandelabro.estaAlumbrando() ) {
            ctrl.goto( locCuartoOscuro );
            ctrl.print( "Has retrocedido, acobardado por la penumbra." );
        }
    }
    
    return;
};

const objEscaleras = ctrl.creaObj(
    "escaleras",
    [ "escalera", "salientes", "saliente" ],
    "Las escaleras ocupan todo el lateral de la pared, acabando en un hueco \
     en la parte superior.",
    locCuartoOscuro,
    Ent.Scenery );

objEscaleras.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() > 1 ) {
        toret += "  Es muy curioso que los escalones comiencen al nivel \
                  del ${suelo, ex suelo}, sin embargo.";
    }
    
    return toret;
};
    
const objSueloCuartoOscuro = ctrl.creaObj(
    "suelo",
    [],
    "En el suelo hay mucho polvo, pero utilizando tus pies lo apartas, \
     fijándote en cómo se delinean vagamente las tablas de madera.",
    locCuartoOscuro,
    Ent.Scenery );

objSueloCuartoOscuro.preExamine = function() {
    var toret = this.desc;
    
    if ( this.getTimesExamined() > 1
      && ctrl.places.limbo.has( objTrampilla ) )
    {
        toret += " Insistiendo, has conseguido ir poco a poco delimitando los \
                  bordes de... sí, en el suelo \
                  ves ahora ${una trampilla, ex trampilla}.";
        locCuartoOscuro.desc += "<p>En el suelo puedes ver \
                      ${una trampilla, ex trampilla}.</p>";
        objTrampilla.moveTo( locCuartoOscuro );
        ctrl.places.doDesc();
    }
    
    return toret;
};

const objTrampilla = ctrl.creaObj(
	"trampilla",
	[ "trampilla" ],
	"En el suelo hay una trampilla. \
	Aparece disimulada por la apariencia gastada de su madera, \
	que se confunde con la humedad dispersa por todo el recinto.",
	ctrl.places.limbo,
	Ent.Scenery
);

objTrampilla.open = false;
objTrampilla.setCloseable();

objTrampilla.preExamine = function() {
    var toret = "La trampilla está ahora abierta, \
                 permitiendo el ${descenso, abajo}.";
    
    if ( !this.open ) {
        toret = "La trampilla está ${cerrada, abre trampilla}.";
    }
    
    return toret;
};

objTrampilla.preOpen = function() {
    var toret = "¡Ya está abierta!";
    
    if ( !this.open ) {
        this.open = true;
        toret = "Has abierto la trampilla. Ahora podrías ${descender, abajo}.";
        this.desc += " La trampilla ahora abierta te permite ${descender, abajo}.";
    }
    
    return toret;
};


// ***************************************************************** Pasillo --
const locPasillo = ctrl.places.creaLoc(
	"Pasillo",
	[ "pasillo" ],
	"El pasillo que conecta la ${biblioteca, n} y ${el salón, s} \
	es estrecho y huele a humedad. Está simplemente encalado en blanco."
);
locPasillo.pic = "res/passage.jpg";
locPasillo.setExitBi( "norte", locBiblioteca );


// *********************************************************** Sala de estar --
const locSalaDeEstar = ctrl.places.creaLoc(
	"Salón",
	[ "salon" ],
	"Un amplio salón se abre en esta luminosa estancia. \
	Los sobrecargados adornos  contrastan con la sobriedad de la biblioteca \
	y del pasillo que acabas de abandonar."
);
locSalaDeEstar.pic = "res/living_room.jpg";
locSalaDeEstar.setExitBi( "norte", locPasillo );

locSalaDeEstar.preLook = function() {
    var toret = this.desc;
    const player = ctrl.personas.getPlayer();
    var won = true;
    
    if ( !player.has( objBonos ) ) {
        toret += " Está claro que el secreto del legado es demasiado para ti.\
        De todas formas, nunca necesitaste ayuda económica de nadie \
        para seguir adelante. El albacea de tu tío encontrará con seguridad \
        alguien que quiera superar la prueba y hacerse rico.... sin duda.";
    }
    
    if ( !ctrl.achievements.get( "sensible" ).complet ) {
        toret += " Te preguntas, de todas formas, ¿a qué se referiría tu tío \
                   con lo de aquellas responsabilidades?";
    }
    
    if ( !player.has( objBonos )
      && !ctrl.achievements.get( "sensible" ).complet )   
    {
        ctrl.achievements.achieved( "fleed" );
        won = false;
    }
    
    endGame( won, this.pic, toret );
}

// ******************************************************* Pasillo soterrado --
const locPasilloBajoTierra = ctrl.places.creaLoc(
	"Pasillo bajo tierra",
	[ "pasillo bajo tierra" ],
	"Has accedido a un estrecho pasillo en el sótano, \
	a través de unas ${escaleras, arriba} pegadas a la pared.  \
	Todo es oscuridad aquí dentro, tenebrosamente oscuro y cerrado. \
	Las sombras se alargan a la luz de tu candelabro. \
	El techo, jalonado de telas de araña y otros bichos \
	que ni siquiera te atreves a examinar de cerca, \
	es el soporte de la vieja biblioteca. \
	La soledad y la tristeza se adivinan por doquier. \
	De lado contrario a las escaleras ${(calculas que al este), este}, \
	el pasillo se extiende a través de la oscuridad."
);
locPasilloBajoTierra.pic = "res/underground_passage.jpg";
locPasilloBajoTierra.setExitBi( "arriba", locCuartoOscuro );

const locContinuaElPasillo = ctrl.places.creaLoc(
	"Continua el pasillo",
	[ "continua el pasillo" ],
	"Continúa el estrecho pasillo. La oscuridad te rodea \
	y parece envolverte, cada vez que pretendes dar un paso. \
	La tristeza y abandono del lugar son más patentes aquí. \
	A duras penas te orientas en el pasillo. \
	Pareciera que el tiempo se ha detenido. \
	Sin embargo, sabes que hacia el ${oeste, oeste} \
	se encuentra la biblioteca (y la luz), mientras al ${este, este}..."
);
locContinuaElPasillo.pic = "res/underground_passage.jpg";
locContinuaElPasillo.setExitBi( "oeste", locPasilloBajoTierra );

locContinuaElPasillo.postGo = function() {
    if ( ctrl.getTurns() % 2 == 0 ) {
        ctrl.print( "Has tropezado con algún saliente en el suelo \
                caes de forma vergonzosa, pero solo puedes pensar \
                en la oscuridad a tu alrededor. Te incorporas \
                tratando de arreglar tu aspecto a la luz del \
                candelabro." );
    }
};

const locFinalDelPasillo = ctrl.places.creaLoc(
	"Final del pasillo",
	[ "final del pasillo" ],
	"El estrecho pasillo huele en este punto a humedad. \
	Debes estar debajo de las cocinas  de la gran casa, deduces. \
	Nunca te ha gustado la oscuridad, pero en este pasillo \
	no puedes escapar de ella. \
	Saber que la biblioteca está al ${oeste, oeste} te da un poco \
	de tranquilidad, aunque desde este punto no puedes ver las escaleras. \
	La inquietud te invade lentamente. Al ${este, este}..."
);
locFinalDelPasillo.pic = "res/underground_passage.jpg";
locFinalDelPasillo.setExitBi( "oeste", locContinuaElPasillo );
locFinalDelPasillo.postGo = function() {
    const loc = ctrl.places.getCurrentLoc();
        
    if ( ( loc == locSalaOculta
        || loc == locSalaOcultaDescubierta
        || loc == locSalaOcultaHorrible ) 
      && objLampara.encendida )
    {
        ctrl.goto( this );
        ctrl.print( "No, no puedo... no quiero volver allí..." );
    }
};


// ************************************************************* Sala oculta --
const locSalaOculta = ctrl.places.creaLoc(
	"Sala oculta",
	[ "sala oculta" ],
	"De repente, la estrechez del pasillo se abre a una baja \
	pero ancha estancia. No puedes ver más que lo que hay delante de tí: \
	${un altar, ex altar}, y sobre él, ${una vieja lámpara, ex lampara}. \
	La oscuridad es casi impenetrable. \
	Te quedas paralizado, con temor a moverte demasiado. \
	Sientes contínuamente unas ganas terribles de volver al ${oeste, oeste}, \
	por donde has venido. Pero estás aquí..."
);
locSalaOculta.pic = "res/underground_room.jpg";
locSalaOculta.setExitBi( "oeste", locFinalDelPasillo );

const objAltar = ctrl.creaObj(
	"altar",
	[ "altar" ],
	"Parece surgir del suelo, como si estuviera excavado en la roca, \
	 habiendo sido moldeado para ser un soporte plano del tamaño \
	 aproximado de una persona. Sobre él, hay ${una lámpara, ex lampara}.",
	locSalaOculta,
	Ent.Scenery
);

const objLampara = ctrl.creaObj(
	"lámpara",
	[ "lampara" ],
	"Es una vieja lámpara, cubierta de telarañas \
	 pero que todavía ${podría funcionar, enciende lampara}.",
	locSalaOculta,
	Ent.Scenery
);
objLampara.encendida = false;
objLampara.preStart = function() {
    var toret = "No tienes con qué encenderlo.";
    
    if ( ctrl.isPresent( objCerillas ) ) {
        this.encendida = true;
        ctrl.achievements.achieved( "daredevil" );
        toret = "Levantaste con cuidado la pantalla y \
                 encendiste la lámpara con una de las cerillas. \
                 el espectáculo ante ti te deja perplejo y asustado.";
        locSalaOcultaDescubierta.setExitBi( "oeste", locFinalDelPasillo );
        ctrl.goto( locSalaOcultaDescubierta );
    }
    
    return toret;
};


// ************************************************* Sala oculta descubierta --
const locSalaOcultaDescubierta = ctrl.places.creaLoc(
	"Sala oculta",
	[ "sala oculta" ],
	"La estrechez del pasillo se ha abierto a una baja \
	pero ancha estancia. No puedes ver más que lo que hay delante de tí: \
	un altar, y sobre él, una vieja lámpara encendida. \
	Percibes varios ${bultos, ex bultos} en el límite de tu campo de visión, \
	pero sientes tanto miedo y horror por lo que pudieran ser que no te \
	atreves a mover la cabeza. Sabes que a tu espalda está el ${pasillo, o} \
	que conduce hacia la tranquilidad de la sobria biblioteca."
);
locSalaOcultaDescubierta.pic = "res/underground_room.jpg";

const objBultos = ctrl.creaObj(
    "bultos",
    [],
    "Al fijarte en esos bultos, en ese preciso instante, \
    por fin tuviste la espeluznante visión de \
    la cripta que habías estado evitando. La visión es tan escalofriante, \
    tan estremecedora, que golpeaste sin querer la lámpara, \
    comenzando ésta a apagarse. \
    No das crédito a tus ojos. Intentas salir corriendo... pero no puedes. \
    El miedo te atenaza. La llama de la lámpara, al consumirse poco a poco, \
    traza macabros bailes sobre la más aún macabra escena \
    en el suelo de la cripta. La lámpara, finalmente, se consume del todo, \
    mientras, a la vez, tus ojos se abren más y más por el pánico.  \
    Un sudor frío empapa tu cuerpo... no puedes creer lo que has visto. \
    Dudas de ti mismo y de lo que han visto tus ojos. \
    ¿Sería real tan descabellada, macabra... horrible... \
    oh, Dios mío... Cientos de ideas cruzan por tu mente \
    en décimas de segundo... no puede ser... no puede suceder... \
    en un país civilizado como éste... es horrible, horrible...",
    locSalaOcultaDescubierta,
    Ent.Scenery );

objBultos.postExamine = function() {
    ctrl.achievements.achieved( "sensible" );
    ctrl.goto( locSalaOcultaHorrible );
};

// ************************************************* Sala oculta horrible --
const locSalaOcultaHorrible = ctrl.places.creaLoc(
	"Sala oculta",
	[ "sala oculta" ],
	"Apenas puedes ver siquiera lo que hay delante de tí: \
	un altar, y sobre él, una vieja lámpara encendida. \
	Sientes tanto miedo y horror por lo que ves que te quedas helado, \
	${completamente inmóvil, sal}."
);
locSalaOcultaHorrible.pic = "res/underground_room.jpg";

locSalaOcultaHorrible.preExit = function() {
    ctrl.print( "Repentinamente, venciste tu parálisis mental \
                y sales por fin corriendo, teniendo miedo ahora \
                de cada sitio donde pones los pies... temiendo tocar... \
                pisar... eso... Te arrojas en los brazos de la oscuridad, \
                hacia donde sabes que, al final de ese túnel, está la luz \
                reconfortante de la biblioteca... Trastabillas por el pasillo, \
                golpeándote y quemándote en ocasiones \
                con la cera del candelabro... \
                Has retrocedido al final del pasillo..." );
    
    locSalaOcultaDescubierta.setExitBi( "oeste", locFinalDelPasillo );
    ctrl.goto( locFinalDelPasillo );
};


// ************************************************************ Achievements --
ctrl.achievements.add( "fleed",
                       "Huiste (no recuperaste la herencia)." );
ctrl.achievements.add( "treasure_hunter",
                       "Cazatesoros (¡encontraste un verdadero tesoro!)." );
ctrl.achievements.add( "daredevil",
                       "Atrevido (te atreviste a encender la luz)." );
ctrl.achievements.add( "sensible",
                       "Responsable (encontraste la carga de la herencia)." );

// ******************************************************************* Boot ---
const player = ctrl.personas.creaPersona( "Fernando", [],
    "Aquí estás, dispuesto a descubrir el misterio la herencia de tu tío.",
    locBiblioteca
);

const objCerillas = ctrl.creaObj(
    "cerillas",
    [ "cerilla", "fosforos", "fosforo" ],
    "Sí, son cerillas.",
    player,
    Ent.Portable );

// **************************************************************** End game --
function amusing() {
    return "<i><b>El legado</b> es una aventura conversacional que escribí hace \
            ya muchos años (en 2002), especialmente para probar Superglús. \
            Tuvo una gran acogida, y de hecho, escribí una segunda revisión \
            después de haber incorporado muchos comentarios \
            de distintos jugadores. En este caso (la tercera revisión), \
            supone un reto mayor todavía, pues ha pasado a convertirse en \
            un relato interactivo.</i>";
}

const htmlRestartAmusingEnding = "<p align='right'>\
                         <a href='javascript: location.reload();'>\
                         <i>Comenzar de nuevo</i></a>.<br/>\
                         <i><a href='#' onClick=\"javascript: \
                         document.getElementById('pAmenity').\
                         style.display='block'; return false\">\
                         Ver curiosidades</a>.</i></p>\
                         <p id='pAmenity' align='right' style='display: none'>"
                         + amusing() + "</p>";
                         
const htmlRestartEnding = "<p align='right'>\
                         <a href='javascript: location.reload();'>\
                         <i>Comenzar de nuevo</i></a>.";
                         
function endGame(won, pic, msg)
{
    const dvCmds = document.getElementById( "dvCmds" );
    
    if ( dvCmds != null ) {
        dvCmds.style.display = "none";
    }
    
    msg += "<p>Logros:<br/>" + ctrl.logros.completadosComoTexto() + "</p>";
    
    if ( won ) {
        msg += "<br/>" + htmlRestartAmusingEnding;
    } else {
        msg += "<br/>" + htmlRestartEnding;
    }
    
    ctrl.endGame( msg, pic );
}

const ambientationMsgList = new MsgList(
    [ "<i>...te sacudes una tela de araña en algún sitio por delante de ti, \
       que parece pegarse a tu pelo... \
       limpias las manos a los pantalones...</i>",
       "<i>...escuchas un crujido por encima de tu cabeza.</i>",
       "<i>...una gélida corriente de aire surge de alguna parte.</i>",
       "<i>...en alguna parte, se escuchan los chillidos de una rata.</i>"],
    true );

ctrl.addDaemon( "ambientation",
                function() {
                    if ( ctrl.getTurns() % 3 == 0) {
                        const loc = ctrl.places.getCurrentLoc();
                        
                        if ( loc == locCuartoOscuro
                          || loc == locBajoCubierta
                          || loc == locPasilloBajoTierra
                          || loc == locContinuaElPasillo
                          || loc == locFinalDelPasillo
                          || loc == locSalaOculta )
                        {
                            ctrl.print( ambientationMsgList.nextMsg() );
                        }
                    }
                });

ctrl.personas.changePlayer( player );
ctrl.places.setStart( locBiblioteca );
