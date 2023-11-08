import { DAY_MS, UserRoles } from '@bot/constants';
import { addMultipleUsersConversation, addUserConversation } from '@bot/conversations';
import { inlineGoToAdminMenu, inlineGoToModeratorMenu } from '@bot/keyboards';
import { csv, logger, mongo } from '@bot/services';
import {
  BotContextType,
  DynamicNewGptLimitsMenuCallbackType,
  DynamicUserRolesMenuCallbackType,
  DynamicUsersMenuCallbackType,
} from '@bot/types';
import { getTimestampUnix, removeFile } from '@bot/utils';

export const addUserInitialCallback = async (ctx: BotContextType) => {
  await ctx.deleteMessage();
  await ctx.conversation.enter(addUserConversation.name);
};

export const addMultipleUsersCallback = async (ctx: BotContextType) => {
  await ctx.deleteMessage();
  await ctx.conversation.enter(addMultipleUsersConversation.name);
};

export const getAllUsersCallback = async (ctx: BotContextType) => {
  try {
    const users = await mongo.getUsers();
    const currentUserRole =
      (await mongo.getUser(String(ctx?.from?.username)))?.role ?? UserRoles.USER;

    if (users) {
      const { filePath, filePathForReply } = await csv.createUsersCsv(
        users.filter(
          (user) =>
            currentUserRole !== UserRoles.MODERATOR ||
            ![UserRoles.ADMIN, UserRoles.SUPER_ADMIN].includes(user.role),
        ),
      );

      if (filePath && filePathForReply) {
        await ctx.deleteMessage();
        await ctx.replyWithDocument(filePathForReply, {
          reply_markup: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN].includes(currentUserRole)
            ? inlineGoToAdminMenu(ctx)
            : inlineGoToModeratorMenu(ctx),
        });

        await removeFile(filePath);
      }
    }
  } catch (error) {
    await ctx.reply(ctx.t('error-message-common'));

    logger.error(`callbacks::users::getAllUsersCallback::${JSON.stringify(error.message)}`);
  }
};

export const changeUserRoleCallback: DynamicUserRolesMenuCallbackType = async (
  ctx,
  username,
  role,
) => {
  try {
    await mongo.updateUser(username, { role });

    await ctx.deleteMessage();
    await ctx.reply(
      ctx.t('users-menu-message-change-role-success', {
        username,
        role: ctx.t(`user-role-${role}`),
      }),
      {
        reply_markup: inlineGoToAdminMenu(ctx),
      },
    );
  } catch (error) {
    await ctx.reply(ctx.t('error-message-common'));

    logger.error(`callbacks::users::changeUserRoleCallback::${JSON.stringify(error.message)}`);
  } finally {
    ctx.session.memory.userData.selectedUsername = null;
  }
};

export const changeUserGptLimitsCallback: DynamicNewGptLimitsMenuCallbackType = async (
  ctx,
  username,
  newPackage,
  newLimit,
) => {
  try {
    const [gptTokens, gptImages] = newLimit.split('/');

    await mongo.updateUser(username, {
      limit: {
        gptTokens: Number(gptTokens),
        gptImages: Number(gptImages),
        expire: 'test',
      },
    });

    await ctx.deleteMessage();
    await ctx.reply(
      ctx.t('users-menu-message-new-gpt-limits-success', {
        username,
        package: `[ ${ctx.t(
          `user-gpt-limit-${newPackage.toLocaleLowerCase()}`,
        )} ] ${gptTokens} / ${gptImages}`,
      }),
      {
        reply_markup: inlineGoToAdminMenu(ctx),
      },
    );
  } catch (error) {
    await ctx.reply(ctx.t('error-message-common'));

    logger.error(`callbacks::users::changeUserGptLimitsCallback::${JSON.stringify(error.message)}`);
  } finally {
    ctx.session.memory.userData.selectedUsername = null;
  }
};

export const blockUnblockUserCallback: DynamicUsersMenuCallbackType = async (ctx, username) => {
  try {
    const user = await mongo.getUser(username);
    const updatedUser = await mongo.updateUser(username, { enabled: !user?.enabled });

    const answer = ctx.t(
      `users-menu-message-${!updatedUser?.enabled ? 'block' : 'unblock'}-success`,
      {
        username,
      },
    );

    await ctx.answerCallbackQuery(answer);
    ctx.menu.update();
  } catch (error) {
    await ctx.reply(ctx.t('error-message-common'));

    logger.error(`callbacks::users::blockUnblockUserCallback::${JSON.stringify(error.message)}`);
  }
};

export const deleteUserCallback: DynamicUsersMenuCallbackType = async (ctx, username) => {
  try {
    await mongo.deleteUser(username);

    await ctx.deleteMessage();
    await ctx.reply(ctx.t('users-menu-message-delete-success', { username }), {
      reply_markup: inlineGoToAdminMenu(ctx),
    });
  } catch (error) {
    await ctx.reply(ctx.t('error-message-common'));

    logger.error(`callbacks::users::deleteUsersCallback::${JSON.stringify(error.message)}`);
  }
};
