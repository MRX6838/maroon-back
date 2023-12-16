import fs from "fs";
import path from "path";

class FileController {
  addFile(req, res) {
    res.json({
      path: `/uploads/${req.file.filename}`,
    });
  }
  deleteFile(req, res) {
    try {
      const { file } = req.body;
      fs.rmSync(path.resolve("uploads", file));
      res.json({
        message: "File deleted",
      });
    } catch (error) {
      res.status(400).json({ message: "File not found" });
    }
  }
}

export default new FileController();
