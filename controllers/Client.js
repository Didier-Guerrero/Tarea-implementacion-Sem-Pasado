const getClientsDB = async (req, res) => {
  try {
    // Tu lógica para obtener clientes aquí
    res.json({ message: "Clientes obtenidos con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

module.exports = getClientsDB; // Exporta el controlador correctamente
