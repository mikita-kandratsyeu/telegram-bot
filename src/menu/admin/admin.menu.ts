import { InlineKeyboard } from 'grammy';
import { Menu, MenuRange } from '@grammyjs/menu';
import { mongo } from '../../services';
import {
  addUserInitialCallback,
  blockUnblockUserCallback,
  deleteUserSessionMessages,
  getAllUsersCallback,
  getUserSessionMessages,
} from '../../callbacks';
import { BotContextType, UserModelType } from '../../types';

export const dynamicUsersRange = async (
  callback: (username: string, ctx: BotContextType) => void,
  ctx: BotContextType,
  isSession = false,
) => {
  const range = new MenuRange<BotContextType>();
  const currentUsername = ctx?.update?.callback_query?.from?.username ?? '';

  const users: UserModelType[] = (await mongo.getUsers()) ?? [];

  users
    .filter((user) => isSession || user.username !== currentUsername)
    .forEach((user) => {
      const username = user.username;

      range.text(username, async () => callback(username, ctx)).row();
    });

  return range;
};

export const adminMainMenu = new Menu<BotContextType>('admin-main-menu')
  .submenu((ctx) => ctx.t('admin-sessions'), 'admin-sessions-menu')
  .submenu((ctx) => ctx.t('admin-users'), 'admin-users-menu');

export const adminSessionsMenu = new Menu<BotContextType>('admin-sessions-menu')
  .submenu((ctx) => ctx.t('admin-get-session'), 'admin-dynamic-users-for-sessions-menu')
  .submenu((ctx) => ctx.t('admin-delete-session'), 'admin-dynamic-users-for-delete-sessions-menu')
  .row()
  .back((ctx) => ctx.t('admin-go-back'));

export const adminUsersMenu = new Menu<BotContextType>('admin-users-menu')
  .text((ctx) => ctx.t('admin-get-all-users'), getAllUsersCallback)
  .row()
  .text((ctx) => ctx.t('admin-add-user'), addUserInitialCallback)
  .row()
  .submenu((ctx) => ctx.t('admin-block-unblock-user'), 'admin-dynamic-users-menu')
  .row()
  .back((ctx) => ctx.t('admin-go-back'));

export const adminDynamicUsersMenu = new Menu<BotContextType>('admin-dynamic-users-menu')
  .dynamic(async (ctx) => dynamicUsersRange(blockUnblockUserCallback, ctx))
  .back((ctx) => ctx.t('admin-cancel'));

export const adminDynamicUsersForSessionsMenu = new Menu<BotContextType>(
  'admin-dynamic-users-for-sessions-menu',
)
  .dynamic(async (ctx) => dynamicUsersRange(getUserSessionMessages, ctx, true))
  .back((ctx) => ctx.t('admin-cancel'));

export const adminDynamicUsersForDeleteSessionsMenu = new Menu<BotContextType>(
  'admin-dynamic-users-for-delete-sessions-menu',
)
  .dynamic(async (ctx) => dynamicUsersRange(deleteUserSessionMessages, ctx, true))
  .back((ctx) => ctx.t('admin-cancel'));

export const adminInlineGoToMainMenu = (ctx: BotContextType) =>
  new InlineKeyboard().text(ctx.t('admin-go-to-main'), 'admin-go-to-main-action');