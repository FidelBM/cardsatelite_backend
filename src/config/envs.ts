import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  DB_PORT: number;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
}

const envsSchema = joi
  .object({
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  db_port: envVars.DB_PORT,
  db_host: envVars.DB_HOST,
  db_username: envVars.DB_USERNAME,
  db_password: envVars.DB_PASSWORD,
  db_database: envVars.DB_DATABASE,
};
