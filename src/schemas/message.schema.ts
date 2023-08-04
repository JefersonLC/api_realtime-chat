import { z } from 'zod'

export const newMessage = z.object({
  sender_id: z.string().nonempty().min(1),
  text: z.string().nonempty().min(1).max(200),
})
