import path from 'path';
import { Bot, session } from 'grammy';
import { I18n } from '@grammyjs/i18n';
import { config } from './config';
import { createInitialSessionData } from './helpers';
import {
  aboutController,
  adminController,
  descriptionController,
  newController,
  startController,
  textController,
  voiceController,
} from './controllers';
import { adminDynamicUsersMenu, adminMainMenu, adminSessionsMenu, adminUsersMenu } from './menu';
import { auth, normalize } from './middlewares';
import { mongo } from './services';
import { gptModel } from './constants';
import { BotContextType } from './types';

export const createBot = () => {
  const bot = new Bot<BotContextType>(config.TELEGRAM_TOKEN);

  const i18n = new I18n<BotContextType>({
    defaultLocale: 'en',
    useSession: true,
    directory: path.join(__dirname, './locales'),
    globalTranslationContext(ctx) {
      return {
        first_name: ctx.from?.first_name ?? '',
        username: ctx?.from?.username ?? '',
        model: gptModel,
      };
    },
  });

  adminMainMenu.register(adminSessionsMenu);
  adminMainMenu.register(adminUsersMenu);
  adminMainMenu.register(adminDynamicUsersMenu);

  bot.use(i18n);

  // bot.use(auth());

  bot.use(
    session({
      initial: createInitialSessionData,
      storage: mongo.sessionAdapter,
    }),
  );

  bot.use(normalize());

  bot.use(adminMainMenu);

  [
    aboutController,
    adminController,
    descriptionController,
    newController,
    startController,
    // textController,
    // voiceController,
  ].forEach((handle) => handle(bot));

  return bot;
};
