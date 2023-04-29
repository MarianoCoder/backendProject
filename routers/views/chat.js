import { Router } from 'express'

import MessageModel from '../../models/message.js'

const router = Router()

router.get('/', async (req, res) => {
  const message = await MessageModel.find()
  res.render('chat', { message })
})

export default router