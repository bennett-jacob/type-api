import { CronTask } from '..'
import { CronJob } from 'cron'
import { logger } from '../../logger'
export class TestCron implements CronTask {
  scheduleJob(cronString = '0 * * * * *'): void {
    new CronJob(
      cronString,
      (): void => {
        logger.info('Hello, I am Cron! Please see /src/config/cron.ts')
      },
      null,
      true,
    )
  }
}
