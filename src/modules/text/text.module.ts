import { BotType } from '@bot/app/types';
import { getGptContent, gptLoader } from '@bot/common/helpers';
import { expiresInFormat, isExpiredDate } from '@bot/common/utils';
import { inlineFeedback } from '@bot/keyboards';
import { Logger } from '@bot/services';

export const textModule = (bot: BotType) => {
  bot.on('message:text', async (ctx) => {
    try {
      const messageId = Number(ctx.message?.message_id);
      const text = String(ctx.message?.text);
      const locale = String(ctx.from?.language_code);

      const rate = ctx.session.client.rate;

      if (rate && !isExpiredDate(rate.expiresAt) && !rate.gptTokens) {
        return await ctx.reply(
          `${ctx.t('usage-token-limit', {
            expiresIn: expiresInFormat(rate.expiresAt, locale),
          })} ${ctx.t('support-contact')}`,
          { reply_to_message_id: messageId },
        );
      }

      const startMessage = await gptLoader(ctx, messageId);

      if (!text) {
        return await startMessage.editText(ctx.t('error-message-gpt'), {
          reply_to_message_id: messageId,
        });
      }

      const gptContent = await getGptContent(ctx, text);

      if (gptContent) {
        return await startMessage.editText(gptContent, {
          reply_to_message_id: messageId,
          reply_markup: inlineFeedback(ctx),
        });
      }

      return await startMessage.editText(ctx.t('error-message-gpt'), {
        reply_to_message_id: messageId,
      });
    } catch (error) {
      await ctx.deleteMessage();
      await ctx.reply(ctx.t('error-message-common'));

      Logger.error(
        `src/modules/text/text.module.ts::textController::${JSON.stringify(error.message)}`,
      );
    }
  });
};
