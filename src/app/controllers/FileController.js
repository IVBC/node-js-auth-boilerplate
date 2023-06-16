import File from '../models/File';
import User from '../models/User';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { id } = req.params;

    if (id) {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({ error: 'User not user.' });
      }
    }

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
