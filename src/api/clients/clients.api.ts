import { ClientAvailabilityResponse, ClientResponse } from '@bot/api/clients/types';
import { BotLanguageCodes } from '@bot/common/constants';
import { fetchCachedData } from '@bot/common/utils';
import { config } from '@bot/config';
import { Logger } from '@bot/services';
import axios, { HttpStatusCode } from 'axios';

export const createClient = async (
  telegramId: number,
  metadata: {
    firstname?: string;
    lastname?: string;
    username?: string;
  },
  languageCode = BotLanguageCodes.ENGLISH,
) => {
  try {
    const response = await axios<ClientResponse>({
      method: 'post',
      data: { languageCode, telegramId, metadata },
      url: `${config.CHAT_GPT_API_HOST}/v1/api/clients`,
    });

    return response.data;
  } catch (error) {
    Logger.error(`src/api/clients/clients.api.ts::createClient::${JSON.stringify(error.message)}`);

    return null;
  }
};

export const getClientAvailability = async (
  telegramId: number,
): Promise<ClientAvailabilityResponse | null> => {
  try {
    const clientAvailability = await fetchCachedData('cached-client-availability', async () => {
      const response = await axios<ClientAvailabilityResponse>({
        method: 'get',
        url: `${config.CHAT_GPT_API_HOST}/v1/api/clients/availability/${telegramId}`,
      });

      return response.data;
    });

    return clientAvailability;
  } catch (error) {
    if (error.response && error.response.status !== HttpStatusCode.NotFound) {
      Logger.error(
        `src/api/clients/clients.api.ts::getClientAvailability::${JSON.stringify(error.message)}`,
      );
    }

    return null;
  }
};

export const giveFeedback = async () => {};
