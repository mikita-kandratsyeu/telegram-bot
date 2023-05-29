import { config } from '@bot/config';
import { BotCommands, UserRoles } from '@bot/constants';
import { logger, mongo } from '@bot/services';
import { BotContextType, GrammyMiddlewareFn } from '@bot/types';

export const auth = (): GrammyMiddlewareFn<BotContextType> => async (ctx, next) => {
  try {
    const username = String(ctx?.from?.username);
    const action = String(ctx?.update?.message?.text);

    logger.defaultMeta = { username };

    if (username === config.SUPER_ADMIN_USERNAME) {
      return await next();
    }

    const user = await mongo.getUser(username);

    if (user?.enabled) {
      if (action === `/${BotCommands.ADMIN}` && user?.role !== UserRoles.ADMIN) {
        await ctx.reply(ctx.t('error-message-auth-admin'));

        return;
      }

      if (action === `/${BotCommands.MODERATOR}` && user?.role !== UserRoles.MODERATOR) {
        await ctx.reply(ctx.t('error-message-auth-moderator'));

        return;
      }

      return await next();
    }

    await ctx.reply(ctx.t('error-message-auth'));

    return;
  } catch (error) {
    logger.error(error.description);

    return;
  }
};
