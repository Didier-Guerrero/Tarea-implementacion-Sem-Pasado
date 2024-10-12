const express = require("express");
const router = express.Router();
const Cliente = require("../models/clientModel"); // Modelo de clientes
const Contrato = require("../models/contractModel"); // Modelo de contratos
const { Op } = require("sequelize");

// Ruta para la página principal (index)
router.get("/", (req, res) => {
  res.render("index"); // Renderiza la vista 'index.ejs'
});

// Ruta para mostrar los clientes y contratos
router.get("/clients_contracts", async (req, res) => {
  try {
    const clientes = await Cliente.findAll(); // Obtener todos los clientes
    res.render("clients_contracts", { clientes }); // Renderiza la vista clients_contracts.ejs
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

// Ruta para obtener todos los clientes
router.get("/clients", async (req, res) => {
  try {
    // Obtener los clientes ordenados por nombre (o por cualquier otro campo)
    const clientes = await Cliente.findAll({
      order: [["nombre_cli", "ASC"]], // Ordenar alfabéticamente por nombre
    });

    // Renderizar la vista 'clients.ejs' con los clientes ordenados
    res.render("clients", { clientes });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

// Ruta para filtrar los contratos por rango de fechas
router.post("/filter/:data", async (req, res) => {
  try {
    const fechas = req.params.data.split(",");
    const desde = new Date(fechas[0]);
    const hasta = new Date(fechas[1]);

    // Filtrar los contratos por fecha usando Sequelize
    const contratos = await Contrato.findAll({
      where: {
        fecha_con: {
          [Op.between]: [desde, hasta],
        },
      },
    });

    // Agrupar contratos por cliente y calcular el monto total
    const contratosAgrupados = {};
    contratos.forEach((contrato) => {
      if (!contratosAgrupados[contrato.id_cli]) {
        contratosAgrupados[contrato.id_cli] = {
          id: contrato.id_cli,
          monto: 0,
        };
      }
      contratosAgrupados[contrato.id_cli].monto += contrato.monto_con;
    });

    // Obtener los nombres de los clientes y formatear la respuesta
    const clientes = await Cliente.findAll();
    const contratosConClientes = Object.values(contratosAgrupados).map(
      (contrato) => {
        const cliente = clientes.find((c) => c.id_cli === contrato.id);
        return {
          id: contrato.id,
          cliente: cliente ? cliente.nombre_cli : "Cliente desconocido",
          monto: contrato.monto,
        };
      }
    );

    res.json(contratosConClientes); // Enviar los contratos filtrados al frontend
  } catch (error) {
    console.error("Error al filtrar contratos:", error);
    res.status(500).json({ error: "Error al filtrar contratos" });
  }
});

module.exports = router;
