⚽ Football Card Battle

Football Card Battle es un juego web de cartas coleccionables inspirado en los juegos TCG/Card Battler, pero ambientado en el mundo del fútbol.

El jugador construye un mazo de 5 futbolistas y se enfrenta contra un equipo controlado por la CPU mediante combates 1 vs 1.

La clave del juego está en elegir y ordenar correctamente las cartas, aprovechar las ventajas de cada posición y utilizar las habilidades especiales para conseguir la victoria.

⸻

🎮 Características

* ⚔️ Combates de cartas 1 vs 1.
* 🃏 Mazos de 5 cartas.
* ⚽ Futbolistas con diferentes posiciones.
* ❤️ Sistema de vida individual por carta.
* 📊 Estadísticas de ataque, defensa, velocidad, pase y resistencia.
* 🔺 Ventajas y desventajas según la posición.
* 🔥 Habilidades especiales.
* ⭐ Sistema de rarezas.
* 🤖 CPU con comportamiento estratégico.
* 👤 Sistema de perfil de jugador.
* 🖼️ Selección de avatar.
* 💾 Guardado mediante localStorage.
* 🪙 Sistema de monedas.
* 🛒 Tienda de sobres.
* 📚 Colección de cartas.
* 📈 Sistema de experiencia y niveles.
* 🏆 Estadísticas de victorias y derrotas.
* 📱 Diseño responsive para PC, tablet y móvil.

⸻

⚔️ Sistema de combate

Cada jugador selecciona un mazo de 5 cartas.

Ejemplo:

TU MAZO                  CPU
🃏 Carta 1               🃏 Carta 1
🃏 Carta 2               🃏 Carta 2
🃏 Carta 3               🃏 Carta 3
🃏 Carta 4               🃏 Carta 4
🃏 Carta 5               🃏 Carta 5

La batalla comienza enfrentando la primera carta de cada jugador:

🃏 TU CARTA
      VS
🃏 CARTA CPU

🏆 Si gana tu carta

Tu carta permanece en combate y la siguiente carta del CPU entra al campo.

TU CARTA 1
    VS
CPU CARTA 2

💀 Si gana la CPU

La carta del jugador es eliminada y entra la siguiente carta:

TU CARTA 2
    VS
CPU CARTA 1

La carta ganadora permanece en combate hasta que sea derrotada.

La partida termina cuando uno de los dos jugadores pierde sus 5 cartas.

⸻

❤️ Sistema de vida

Cada carta tiene su propia vida.

❤️ 100 / 100

Cuando una carta es eliminada:

❤️ 0 / 100
❌ ELIMINADA

La siguiente carta que entra al combate comienza nuevamente con:

❤️ 100 / 100

La vida de una carta no se transfiere a la siguiente.

Si una carta ganadora conserva vida después de un combate, mantiene esa vida durante los siguientes enfrentamientos.

⸻

📊 Estadísticas

Cada futbolista posee diferentes atributos:

Estadística	Descripción
⚔️ Ataque	Capacidad ofensiva
🛡️ Defensa	Capacidad para detener ataques
⚡ Velocidad	Capacidad para superar rivales
🎯 Pase	Capacidad de crear juego
❤️ Resistencia	Capacidad para mantenerse competitivo

El poder de combate depende de las estadísticas relevantes para cada enfrentamiento.

⸻

⚽ Posiciones

El juego cuenta con cinco posiciones:

* 🧤 POR — Portero
* 🛡️ DEF — Defensa
* 🎯 MED — Mediocampista
* ⚡ EXT — Extremo
* ⚽ DEL — Delantero

Cada posición tiene fortalezas y debilidades diferentes.

Por ejemplo:

DELANTERO
Ataque + Velocidad + Pase
VS
DEFENSA
Defensa + Resistencia + Velocidad

Esto permite crear estrategias diferentes dependiendo de las cartas seleccionadas.

⸻

🎲 Sistema de combate

El ganador no se determina únicamente por una estadística.

El resultado depende de:

Estadísticas
     +
Ventaja de posición
     +
Habilidad especial
     +
Pequeño factor aleatorio

El factor aleatorio es limitado para evitar que el juego dependa completamente de la suerte.

Una carta más débil puede sorprender ocasionalmente a una carta superior, pero las mejores cartas mantienen una ventaja significativa.

⸻

🔥 Habilidades especiales

Las cartas pueden tener habilidades únicas.

Ejemplos:

⚡ Velocista

Aumenta la velocidad durante el combate.

🎯 Francotirador

Obtiene una bonificación de ataque contra porteros.

🧱 Muro

Obtiene una bonificación defensiva contra delanteros.

🎩 Cerebro

Obtiene una bonificación de pase.

❤️ Incansable

Obtiene una bonificación de resistencia.

👑 Capitán

Aumenta sus estadísticas generales.

🧤 Reflejos

El portero tiene una posibilidad adicional de mejorar su defensa.

⸻

⭐ Rarezas

Las cartas se dividen en cuatro niveles:

Rareza	Nivel
🟢 Común	Básico
🔵 Rara	Superior
🟣 Épica	Muy alta
🟡 Legendaria	Máxima

Las cartas de mayor rareza cuentan con mejores estadísticas y efectos visuales especiales.

⸻

👤 Sistema de perfil

Antes de comenzar a jugar, el usuario puede crear su perfil.

Debe elegir:

* Nombre.
* Avatar.

Ejemplo:

👤 JAIDER
⭐ NIVEL 8

El nombre y avatar aparecen en el menú principal y se almacenan mediante localStorage.

El jugador también puede modificar su perfil posteriormente sin perder su progreso.

⸻

🃏 Construcción del mazo

El jugador dispone de una colección de cartas y debe seleccionar exactamente 5 para crear su mazo.

También puede decidir el orden:

1. ⚽ Delantero
2. 🛡️ Defensa
3. 🎯 Mediocampista
4. ⚡ Extremo
5. 🧤 Portero

El orden es importante porque determina qué carta comenzará cada enfrentamiento.

⸻

🛒 Tienda

El jugador puede obtener nuevas cartas mediante sobres.

Sobre básico

🃏 3 cartas
🪙 250 monedas

Probabilidades:

Común        60%
Rara         25%
Épica        12%
Legendaria    3%

Las cartas obtenidas se añaden automáticamente a la colección.

⸻

🪙 Economía

El jugador obtiene monedas después de cada partida.

Victoria

+100 🪙
+100 XP

Derrota

+40 🪙
+40 XP

También existen recompensas adicionales por rachas de victorias.

⸻

💾 Guardado

El progreso se guarda utilizando localStorage.

Se almacenan datos como:

* Perfil.
* Avatar.
* Nombre.
* Colección.
* Mazo.
* Monedas.
* Nivel.
* Experiencia.
* Victorias.
* Derrotas.
* Racha actual.

El progreso permanece disponible después de cerrar y volver a abrir el navegador.

⸻

🛠️ Tecnologías

El proyecto está desarrollado utilizando tecnologías web fundamentales:

* HTML5
* CSS3
* JavaScript Vanilla
* Bootstrap 5
* Font Awesome
* LocalStorage

No requiere:

* React
* Vue
* Angular
* TypeScript
* Node.js
* Backend
* Base de datos

⸻

📁 Estructura del proyecto

football-card-battle/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── data.js
│   ├── app.js
│   ├── game.js
│   ├── cards.js
│   ├── deck.js
│   ├── ai.js
│   ├── shop.js
│   └── storage.js
│
└── assets/
    └── images/
        ├── players/
        └── avatars/

Descripción de los archivos

index.html

Contiene la estructura principal de la aplicación.

styles.css

Contiene los estilos personalizados, animaciones y diseño responsive.

data.js

Contiene los datos de los futbolistas, posiciones, rarezas y habilidades.

app.js

Controla la aplicación y la navegación entre las diferentes pantallas.

game.js

Contiene la lógica principal de los combates.

cards.js

Gestiona la creación y representación visual de las cartas.

deck.js

Gestiona la colección y construcción del mazo.

ai.js

Controla las decisiones de la CPU.

shop.js

Gestiona la tienda, sobres y probabilidades de obtención.

storage.js

Gestiona el almacenamiento y recuperación de datos mediante localStorage.

⸻

🚀 Instalación

No requiere instalación de dependencias.

Clona el repositorio:

git clone <URL_DEL_REPOSITORIO>

Entra en la carpeta:

cd football-card-battle

Abre:

index.html

También puedes utilizar Live Server en Visual Studio Code para ejecutar el proyecto.

⸻

🎯 Objetivo del proyecto

El objetivo de Football Card Battle es crear una experiencia de juego de cartas de fútbol donde la estrategia tenga un papel fundamental.

El jugador debe decidir:

¿Qué cartas llevar?

¿En qué orden colocarlas?

¿Qué posición tiene ventaja?

¿Qué habilidad utilizar?

¿Cuándo arriesgarse con una carta poderosa?

La victoria no depende únicamente de tener las cartas con mejores estadísticas, sino de construir y utilizar correctamente el mazo.

⸻

🔮 Próximas mejoras

Algunas funcionalidades que podrían añadirse posteriormente:

* 🌐 Multijugador online.
* 🏆 Ranking mundial.
* 👥 Partidas contra otros jugadores.
* 🏟️ Diferentes estadios.
* 🌦️ Condiciones climáticas.
* 🎴 Animaciones avanzadas de cartas.
* 🔥 Eventos especiales.
* 🏆 Torneos.
* 🏅 Ligas y divisiones.
* 📅 Temporadas.
* 💰 Mercado de jugadores.
* 🤝 Sistema de intercambio de cartas.
* 🎨 Personalización de cartas.
* 🧩 Química entre jugadores.
* 🏟️ Selecciones y clubes.
* 🎮 Modo campaña.

⸻

📜 Licencia

Proyecto desarrollado con fines educativos y de aprendizaje.

Si se utilizan fotografías, nombres, escudos, logotipos u otros elementos relacionados con futbolistas o clubes reales, deben utilizarse únicamente cuando se cuente con los derechos o permisos correspondientes.

⸻

⚽ Football Card Battle

Construye tu mazo. Elige tu estrategia. Sobrevive al combate.

5 cartas. 1 ganador. 🏆


Deployer for Netlify:
https://cabrita848987.netlify.app/
