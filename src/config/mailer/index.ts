import * as mailgun from 'mailgun-js'
import { logger } from '../logger'
import settings from '../settings'

const mg = mailgun({
  apiKey: settings.mailgunApiKey,
  domain: settings.mailgunDomain,
})

/**
 * Sends an email.
 * @function
 * @param {object} data - data about the email being sent
 * @param {string} data.to - the email address of the recipient
 * @param {string} data.[from] - the email address of the sender; defaults to settings.fromEmail
 * @param {string} data.subject - the subject of the email
 * @param {string} data.text - the body of the email
 * @param {CallableFunction} done - callback
 */
const send = (
  {to, from = settings.fromEmail, subject, text}: {to: string, from?: string, subject: string, text: string},
  done: CallableFunction,
) => {
  const data = {
    to,
    from,
    subject,
    text,
  }

  mg.messages().send(data, (err: any, body: any) => {
    if (err) {
      logger.error(err)
      return done(err)
    }

    logger.debug(body)
    return done(body)
  })
}

export default send
