const controller = {};

controller.auth = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    if (!err) {
      conn.query(
        "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?",
        [data],
        (err, usuario) => {
          if (!err) {
            res.status(200).json(usuario);
          } else res.json(false);
        }
      );
    } else res.json("Error en la conexion: ", err);
  });
};

controller.list = async (req, res) => {
  try {
    await req.getConnection((err, conn) => {
      if (!err) {
        conn.query("SELECT * FROM usuarios", (err, usuarios) => {
          if (!err) {
            res.json(usuarios);
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
          "INSERT INTO usuarios set ?",
          [data],
          (err, usuario) => {
            res.status(200).json(usuario);
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
      conn.query("SELECT * FROM usuarios WHERE id = ?", id, (err, usuario) => {
        res.status(200).json(usuario[0]);
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
          "UPDATE usuarios set ? WHERE id = ?",
          [data, data.id],
          (err, usuario) => {
            res.status(200).json(usuario);
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
      conn.query("DELETE FROM usuarios WHERE id = ?", id, (err, rows) => {
        res.status(200).json("Deleted successfully");
      });
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = controller;
