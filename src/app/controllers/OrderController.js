import * as Yup from 'yup';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      attributes: ['product', 'canceled_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.integer().required(),
      deliveryman_id: Yup.integer().required(),
    });

    if (!schema.isValid(req.boby)) {
      return res.status(400).json({ error: 'Falha na validação!' });
    }

    const order = await Order.create(req.boby);

    return res.json(order);
  }
}

export default new OrderController();
