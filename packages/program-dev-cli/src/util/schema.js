import Joi from 'joi';

export const settingsSchema = Joi.object().keys({
  contentfulToken: Joi.string().alphanum().length(64).required(),
  webtaskToken: Joi.string().alphanum().required()
});