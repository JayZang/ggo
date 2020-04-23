import { promises as fs } from 'fs'
import crypto from 'crypto'
import moment from 'moment'

export default async (file: Express.Multer.File, destination: string) => {
    await fs.mkdir(destination, {
        recursive: true
    })

    const filename = crypto.createHash('sha256').update(`${file.originalname}${moment.now()}`).digest('hex')
    
    await fs.writeFile(`${destination}${filename}`, file.buffer)

    return filename
}