import MessageModel from '../dao/models/message.js'
import { emit } from '../socket.js'

class MessageController {

  static async create(req, res) {
    const { body } = req
    const message = await MessageModel.create(body)
    emit(message)
    res.status(201).json(message)
  }

  static async get(req, res) {
    const result = await MessageModel.find().populate('user', ['first_name', 'last_name', 'email'] ).exec()
    res.status(200).json(result)
  }

  static async getById(req, res) {
    const { params: { id } } = req
    const result = await MessageModel.findById(id)
    if (!result) {
      return res.status(404).end()
    }
    res.status(200).json(result)
  }

  static async updateById(req, res) {
    const { params: { id }, body } = req
    await MessageModel.updateOne({ _id: id }, { $set: body })
    res.status(204).end()
  }

  static async deleteById(req, res) {
    const { params: { id } } = req
    await MessageModel.deleteOne({ _id: id })
    res.status(204).end()
  }

}

export default MessageController