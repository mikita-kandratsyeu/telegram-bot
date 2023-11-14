import { BotType } from '@bot/app/types';
import { BotCommands } from '@bot/common/constants';

export const startModule = (bot: BotType) =>
  bot.command(BotCommands.START, async (ctx) => {
    const messageId = Number(ctx.message?.message_id);

    return ctx.reply(ctx.t('start-description'), {
      reply_to_message_id: messageId,
    });
  });