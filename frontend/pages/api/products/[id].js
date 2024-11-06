import dbConnect from '../../../dbConnect'
import Order from '../../../models/product'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const order = await Order.findById(id)
        if (!order) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: order })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!order) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: order })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedorder = await Order.deleteOne({ _id: id })
        if (!deletedorder) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
