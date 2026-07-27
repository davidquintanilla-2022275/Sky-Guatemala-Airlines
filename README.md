# Sky-Guatemala-Airlines
# Sky Guatemala Airlines

**La mejor Aerolínea**

Sistema web para la gestión y reserva de vuelos de Sky Guatemala Airlines. Este proyecto busca ofrecer una experiencia digital simple y confiable para que los pasajeros consulten vuelos, realicen reservas y gestionen su información, mientras el equipo administrativo controla rutas, horarios y disponibilidad.

📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Scripts disponibles](#-scripts-disponibles)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

📖 Descripción

Sky Guatemala Airlines es una aplicación web construida con **Node.js** y una base de datos relacional/no relacional (a definir), pensada para digitalizar los procesos básicos de una aerolínea: búsqueda de vuelos, reservas, gestión de pasajeros y administración interna.

> Este proyecto se encuentra en una etapa temprana de desarrollo. Esta sección se irá actualizando conforme se agreguen funcionalidades.

✨ Características

- [ ] Registro e inicio de sesión de usuarios
- [ ] Búsqueda y consulta de vuelos disponibles
- [ ] Reserva y gestión de boletos
- [ ] Panel administrativo para gestión de vuelos y rutas
- [ ] Historial de reservas por usuario

🛠️ Tecnologías

- **Backend:** Node.js
- **Base de datos:** *(pendiente de definir — ej. MySQL, PostgreSQL o MongoDB)*
- **Control de versiones:** Git / GitHub
- **Licencia:** MIT

✅ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- npm (incluido con Node.js) o yarn
- Un motor de base de datos compatible (según se defina)
- Git

🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/davidquintanilla-2022275/Sky-Guatemala-Airlines.git
   cd Sky-Guatemala-Airlines
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno (ver sección [Configuración](#-configuración)).

4. Inicia el servidor:

   ```bash
   npm start
   ```

⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias, por ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=sky_guatemala_airlines
```

> Ajusta estas variables según el motor de base de datos y el entorno que finalmente se utilice.

💻 Uso

Una vez levantado el servidor, la aplicación estará disponible en:

```
http://localhost:3000
```

Desde ahí podrás acceder a las funcionalidades disponibles (búsqueda de vuelos, reservas, panel de administración, etc.).

📁 Estructura del proyecto

```
Sky-Guatemala-Airlines/
├── src/                # Código fuente del servidor
│   ├── controllers/    # Lógica de negocio
│   ├── routes/         # Definición de rutas/endpoints
│   ├── models/         # Modelos de la base de datos
│   └── config/         # Configuración (BD, entorno, etc.)
├── public/             # Archivos estáticos (si aplica)
├── .env                # Variables de entorno (no versionado)
├── package.json
├── LICENSE
└── README.md
```

> Estructura sugerida; ajústala conforme el proyecto crezca.

📜 Scripts disponibles
```bash
npm start       # Inicia el servidor en modo producción
npm run dev     # Inicia el servidor en modo desarrollo (con recarga automática)
npm test        # Ejecuta las pruebas (si están configuradas)
```
Contribuir
Las contribuciones son bienvenidas:
1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

📄 Licencia
Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

👤 Autor
**davidquintanilla-2022275**

