import { BotContextType } from '@bot/app/types';
import { BotCommandsWithDescription, botName } from '@bot/common/constants';
import { I18n } from '@grammyjs/i18n';

export const mapBotCommands = (i18n: I18n<BotContextType>, languageCode = 'en') =>
  BotCommandsWithDescription.map(({ command, i18nKey }) => ({
    command,
    description: i18n.t(languageCode, i18nKey),
  }));

export const mapBotDescription = (i18n: I18n<BotContextType>, languageCode = 'en') =>
  `${i18n.t(languageCode, 'description-message-start', { botName })}\n\r${i18n.t(
    languageCode,
    'description-message-body',
  )}`;
