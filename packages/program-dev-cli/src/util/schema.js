import Joi from 'joi';

const spaceSchema = Joi.object().keys({
  name: Joi.string().required(),
  id: Joi.string().required(),
  live: Joi.boolean().required()
});

export const settingsSchema = Joi.object().keys({
  contentfulToken: Joi.string().alphanum().length(64).required(),
  webtaskToken: Joi.string().alphanum().required(),
  space: spaceSchema
});