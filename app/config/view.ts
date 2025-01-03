import { engine } from 'express-handlebars';

const VIEW_ENGINE_OPTIONS = {};

export const VIEW_DIR = './app/views';
export const VIEW_ENGINE_NAME = 'handlebars';
export const VIEW_ENGINE = engine(VIEW_ENGINE_OPTIONS);
