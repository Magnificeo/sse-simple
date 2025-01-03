import type { Request, Response } from 'express';

export default (request: Request, response: Response) => {
  response.render('chat', {
    title: 'Chat page',
  });
};
