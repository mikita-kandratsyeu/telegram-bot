import { BotType } from '../../types';

export const newController = (bot: BotType) =>
  bot.command('new', async (ctx) => ctx.reply(ctx.t('initial')));