import Joi from 'joi';

const spaceSchema = Joi.object().keys({
  name: Joi.string().required(),
  id: Joi.string().required(),
  live: Joi.boolean().required()
});

const lastDeploySchema = Joi.object().keys({
  source: Joi.string().required(),
  schema: Joi.string.required()
});

export const settingsSchema = Joi.object().keys({
  contentfulToken: Joi.string().alphanum().length(64).required(),
  webtaskToken: Joi.string().required(),
  space: spaceSchema,
  availableSpaces: Joi.array().items(spaceSchema),
  lastDeploy: lastDeploySchema
});
