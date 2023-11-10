import { transcription } from '@bot/api/gpt';
import { getGptContent } from '@bot/common/helpers';
// import { inlineVoteButton } from '@bot/keyboards';
import { logger } from '@bot/services';
import { BotType } from '@bot/types';

export const voiceModule = (bot: BotType) => {
  bot.on('message:voice', async (ctx) => {
    try {
      const telegramId = Number(ctx.message?.from.id);
      const messageId = Number(ctx.message?.message_id);

      const voicePathApi = (await ctx.getFile()).file_path ?? '';
      const clientTranscription = await transcription(voicePathApi, telegramId);

      if (!clientTranscription) {
        return await ctx.reply(ctx.t('error-message-gpt'), { reply_to_message_id: messageId });
      }

      const gptContent = await getGptContent(ctx, clientTranscription);

      if (gptContent) {
        return await ctx.reply(gptContent, {
          reply_to_message_id: messageId,
          // TODO: https://app.asana.com/0/1205877070000801/1205877070000835/f
          // reply_markup: inlineVoteButton(ctx),
        });
      }

      return await ctx.reply(ctx.t('error-message-gpt'), { reply_to_message_id: messageId });
    } catch (error) {
      await ctx.reply(ctx.t('error-message-common'));

      logger.error(
        `src/modules/voice/voice.module.ts::voiceModule::${JSON.stringify(error.message)}`,
      );
    }
  });
};
