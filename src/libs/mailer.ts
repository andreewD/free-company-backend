import nodemailer from 'nodemailer'

require('dotenv').config()

// TODO : Mailing stuff

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILTOKEN,
  },
})

transporter.verify().then(() => {
  console.log('Ready for send emails.')
})
