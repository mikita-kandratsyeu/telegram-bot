import { downloadLogsCallback } from '@bot/callbacks';
import {
  AdminMenu,
  ConversationsMenu,
  CSV_READER_URL,
  SessionsMenu,
  UsersMenu,
} from '@bot/constants';
import { BotContextType } from '@bot/types';
import { Menu } from '@grammyjs/menu';

export const adminMainMenu = new Menu<BotContextType>(AdminMenu.INITIAL)
  .submenu((ctx) => ctx.t('admin-sessions'), SessionsMenu.INITIAL)
  .submenu((ctx) => ctx.t('admin-conversations'), ConversationsMenu.INITIAL)
  .row()
  .submenu((ctx) => ctx.t('admin-users'), UsersMenu.INITIAL)
  .text(
    (ctx) => ctx.t('admin-logs'),
    (ctx) => downloadLogsCallback(ctx),
  )
  .row()
  .url((ctx) => ctx.t('admin-csv-reader'), CSV_READER_URL)
  .text(
    (ctx) => ctx.t('admin-go-to-bot'),
    async (ctx) => {
      await ctx.deleteMessage();
      await ctx.reply(ctx.t('bot-initial'));
    },
  );
