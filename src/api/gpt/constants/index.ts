export const MODEL_GPT_DEFAULT = { title: 'GPT-3.5 Turbo', model: 'gpt-3.5-turbo-1106' };
export const MODEL_SPEECH_DEFAULT = { title: 'Whisper', model: 'whisper-1', max: 10 * 60 * 1000 };
export const MODEL_IMAGE_DEFAULT = { title: 'DALL·E 2', model: 'dall-e-2', max: 3 };

export enum TypeGPT {
  AUDIO = 'audio',
  IMAGE = 'image',
  TEXT = 'text',
}

export enum MessageRolesGPT {
  ASSISTANT = 'assistant',
  USER = 'user',
  SYSTEM = 'system',
}

export const MAX_CONTEXT_TOKENS = 4096;
export const MAX_IMAGES_REQUEST = 3;
