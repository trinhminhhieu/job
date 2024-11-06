import dbConnect from '../../../dbConnect'
import Order from '../../../models/product'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const orders = await Order.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: orders })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const order = await Order.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: order })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

// export default async function handler(req, res) {
//   await dbConnect();

//   const { title, desc, prices } = req.body;

//   if (req.method === "POST") {
//     const orderExist = await Order.findOne({ title });

//     if (orderExist)
//       return res.status(422).json({ message: "title already in use!" });

//     const order = new order({ title, desc, prices});
//     await Order.save();

   

//     res.status(201).json(order);
//   } else {
//     res.status(424).json({ message: "Invalid method!" });
//   }
// }
