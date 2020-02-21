import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan'
import File from '../models/File'


class DeliveryManController {

 
    async validar(value) {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required()
      });
      
      return await schema.isValid(value.body);    

    }
  

  async index(req, res){
    const deliverymans = await DeliveryMan.findAll({
      attributes: ['id','name','email']     
    });

    return res.json(deliverymans);

  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    
    if (this.teste('A')) {   
      return res.status(400).json({ error: 'Falha na validação'})
    }

    const deliverymanExists =  await DeliveryMan.findOne({
      where: { email: req.body.email}
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Entregador já cadastrado!'})
    }

    const {id, name, email} = await DeliveryMan.create(req.body);

    return res.json({
      id,
      name,
      email
    })    
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação'})
    }

    const deliverymanExists =  await DeliveryMan.findOne({
      where: { email: req.body.email}
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Entregador já cadastrado!'})
    }

  }


  teste(value) {
    console.log('teste');
    return value;
  }
  

 
}




export default new DeliveryManController();