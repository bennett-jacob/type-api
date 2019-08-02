/* tslint:disable no-unused-expression */
import { CronJob } from 'cron'
import { logger } from '../logger'
import { TestCron } from './testCron';

export default class Cron {
  private static cronTasks = [
    new TestCron(),
  ]
  public static init(): void {
    this.cronTasks.forEach((task) => {
      task.scheduleJob('0 * * * * *')
    })
    logger.info('Cron initialized')
  }


}

export interface CronTask {
  scheduleJob: (cronString: string) => CronJob
}
