import * as Yup from 'yup';
import Recipient from '../models/Recipient'

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup
        .string()
        .required(),
      rua: Yup.string(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Dados inválidos!'});      
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);

  }
}

export default new RecipientController();
