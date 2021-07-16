const controller = {};

controller.list = async (req, res) => {
  try {
    await req.getConnection((err, conn) => {
      if (!err) {
        conn.query("SELECT * FROM productos", (err, productos) => {
          if (!err) {
            res.json(productos);
          } else res.json("Error en el query: ", err);
        });
      } else res.json("Error en la conexion: ", err);
    });
  } catch (e) {
    console.error(e);
  }
};

controller.insert = async (req, res) => {
  const data = req.body;
  try {
    await req.getConnection((err, conn) => {
      if (!err) {
        conn.query(
          "INSERT INTO productos set ?",
          [data],
          (err, producto) => {
            res.status(200).json(producto);
          }
        );
      } else console.error("Error guardando: ", err);
    });
  } catch (e) {
    console.error(e);
  }
};

controller.edit = async (req, res) => {
  const { id } = req.params;
  try {
    await req.getConnection((err, conn) => {
      conn.query("SELECT * FROM productos WHERE id = ?", id, (err, producto) => {
        res.status(200).json(producto[0]);
      });
    });
  } catch (e) {
    console.error(e);
  }
};

controller.save = async (req, res) => {
  const data = req.body;
  try {
    await req.getConnection((err, conn) => {
      if (!err) {
        conn.query(
          "UPDATE productos set ? WHERE id = ?",
          [data, data.id],
          (err, producto) => {
            res.status(200).json(producto);
          }
        );
      } else console.error("Error guardando: ", err);
    });
  } catch (e) {
    console.error(e);
  }
};

controller.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await req.getConnection((err, conn) => {
      conn.query("DELETE FROM productos WHERE id = ?", id, (err, rows) => {
        res.status(200).json("Deleted successfully");
      });
    });
  } catch (e) {
    console.error(e);
  }
};

controller.search = async (req, res) => {
  let buscar = "%" + req.params.field + "%";
  try {
    await req.getConnection((err, conn) => {
      conn.query("SELECT * FROM productos WHERE nombre LIKE ? OR descripcion LIKE ?", [buscar, buscar], (err, usuarios) => {
        res.status(200).json(usuarios);
      });
    });
  } catch (e) {
    console.error(e);
  }
};


module.exports = controller;