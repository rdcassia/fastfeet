import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Falha na validação!' });
    }

    const dliveryManExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (dliveryManExist) {
      return res.status(400).json({ error: 'Entregador já cadastrado!' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

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
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Falha na validação!' });
    }

    const deliveryMan = await Deliveryman.findByPk(req.params.id);

    if (!deliveryMan) {
      return res.status(400).json({ error: 'Entregador não existe!' });
    }

    if (req.body.email && req.body.email != deliveryMan.email) {
      const dliveryManExists = await Deliveryman.findOne({
        where: { email: req.body.email },
      });

      if (dliveryManExists) {
        return res.status(400).json({ error: 'Entregadar já cadastrado.' });
      }
    }

    const { id, name, avatar, email } = await deliveryMan
      .update(req.body)
      .then(async () => {
        return await Deliveryman.findByPk(req.params.id, {
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        });
      })
      .catch(err => {
        res.status(400).json('Falha na edição do entregador');
      });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }

  async delete(req, res) {
    const deliveryMan = await Deliveryman.findByPk(req.params.id);

    if (!deliveryMan) {
      return res.status(400).json('Entregador não existe!');
    }

    deliveryMan.destroy();
    return res.json('Entregador excluído!');
  }
}

export default new DeliveryManController();
