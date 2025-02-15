const { Usuario } = require("../db");

// Controlador para actualizar el perfil de usuario
const actualizarPerfil = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Datos actualizados enviados por el cliente

  try {
    const usuario = await Usuario.findOne({ where: { id } }); // Busca el usuario por su ID

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualiza los campos del usuario
    usuario.nombre = updatedData.nombre;
    usuario.apellido = updatedData.apellido;
    usuario.email = updatedData.email;
    usuario.password = updatedData.password;
    usuario.nacionalidad = updatedData.nacionalidad;
    usuario.ubicacion = updatedData.ubicacion;
    usuario.direccion = updatedData.direccion;
    usuario.telefono = updatedData.telefono;
    usuario.acerca = updatedData.acerca;

    // await usuario.save(); // Guarda los cambios en la base de datos
    await Usuario.update(
      {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        password: usuario.password,
        nacionalidad: usuario.nacionalidad,
        ubicacion: usuario.ubicacion,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        acerca: usuario.acerca,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Perfil actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};

module.exports = {
  actualizarPerfil,
};
