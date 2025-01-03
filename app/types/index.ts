import type { Response } from 'express';

export type Client = { response: Response; createdAt: number };
export type SSEEvent = { data: any; id: number };
