require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/huellitas`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  CasaDeAdopcion,
  Comentario,
  TipoDeUsuario,
  Usuario,
  Mascota,
  EstadoAdopcion,
  Donacion,
  Adopcion,
  Especie,
} = sequelize.models;

Usuario.belongsTo(TipoDeUsuario, {
  foreignKey: 'tipoDeUsuarioId', 
});

TipoDeUsuario.hasMany(Usuario, {
  foreignKey: 'especieId', 
});

Donacion.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
});

Usuario.hasMany(Donacion, {
  foreignKey: 'usuarioId',
});

Comentario.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
});

Usuario.hasMany(Comentario, {
  foreignKey: 'usuarioId',
});

Adopcion.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
});

Usuario.hasMany(Adopcion, {
  foreignKey: 'usuarioId',
});

CasaDeAdopcion.belongsTo(Comentario, {
  foreignKey: 'comentarioId',
});

Comentario.hasMany(CasaDeAdopcion, {
  foreignKey: 'comentarioId',
});


CasaDeAdopcion.hasMany(Mascota, {
  foreignKey: 'casaDeApocionId',
});


Mascota.belongsTo(CasaDeAdopcion, {
  foreignKey: 'casaDeAdopcionId', 
});

Mascota.belongsTo(Especie, {
  foreignKey: 'especieId', 
});

Especie.hasMany(Mascota, {
  foreignKey: 'especieId', 
});

Donacion.belongsTo(CasaDeAdopcion, {
  foreignKey: 'casaDeApocionId',
});

CasaDeAdopcion.hasMany(Donacion, {
  foreignKey: 'casaDeAdpocionId',
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
