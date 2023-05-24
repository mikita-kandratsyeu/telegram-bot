import { config } from '@bot/config';
import { getFileApiLink, getGPTAnswer } from '@bot/helpers';
import { logger, oggConverter, openAI } from '@bot/services';
import { BotType } from '@bot/types';

export const voiceController = (bot: BotType) => {
  bot.on('message:voice', async (ctx) => {
    try {
      const userId = String(ctx.message.from.id);
      const messageId = Number(ctx.message.message_id);

      const voiceFile = await ctx.api.getFile(ctx.message.voice.file_id);
      const voiceFileApiLink = getFileApiLink(config.TELEGRAM_TOKEN, voiceFile.file_path);

      const oggPath = await oggConverter.create(voiceFileApiLink, userId);
      const mp3Path = await oggConverter.toMp3(oggPath, userId);

      const text = await openAI.transcription(mp3Path);
      const gptAnswer = (await getGPTAnswer(ctx, text)) ?? '';

      await ctx.reply(gptAnswer, { reply_to_message_id: messageId });
    } catch (error) {
      await ctx.reply(ctx.t('error-common'));

      logger.error(`controller::voiceController::${(error as Error).message}`);
    }
  });
};