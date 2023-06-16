import { Op } from 'sequelize';
import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const { page = 1, q = '', quantity = 10 } = req.query;

    const { rows: users, count } = await User.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `${q}%`,
        },
      },
      order: [['id', 'DESC']],
      limit: quantity,
      offset: (page - 1) * quantity,
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json({
      users,
      count,
      totalPages: Math.ceil(count / quantity),
    });
  }

  async show(req, res) {
    const { id } = req.params;

    console.log(id);

    const user = await User.findOne({
      where: {
        id,
      },
      paranoid: false,
      attributes: ['id', 'name', 'email', 'createdAt', 'deletedAt'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(400).json({ error: 'User not exists.' });
    }
    if (user.deletedAt) {
      return res.status(401).json({ error: 'User fired' });
    }

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fails.' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res
        .status(401)
        .json({ error: 'User already exists with this email.' });
    }

    if (req.body.avatar_id) {
      const avatar = await File.findByPk(req.body.avatar_id);

      if (!avatar) {
        return res.status(401).json({ error: 'File not exists.' });
      }
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fails.' });
    }

    const { id } = req.params;
    const { avatar_id } = req.body;

    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(400).json({ error: 'User not exists.' });
    }

    const avatar = await File.findByPk(avatar_id);

    if (!avatar) {
      return res.status(400).json({ error: 'File not exists.' });
    }

    await user.update(req.body);

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ error: 'User not exists.' });
    }

    await user.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new UserController();
