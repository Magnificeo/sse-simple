import chatPage from '#app/controllers/chat/page.js';
import chatStream from '#app/controllers/chat/stream.js';
import chatAdd from '#app/controllers/chat/add.js';
import { type Express } from 'express';

/* import monitorBroadcasts from '#app/controllers/monitor/broadcasts.js';

import supportPage from '#app/controllers/support/page.js';
import supportStream from '#app/controllers/support/stream.js';
import supportAdd from '#app/controllers/support/add.js'; */

export default (server: Express) => {
  server.get('/chat', chatPage);
  server.post('/chat', chatAdd);
  server.get('/chat/stream', chatStream);

  /*   server.get('/monitor/broadcasts', monitorBroadcasts);

  server.get('/support', supportPage);
  server.post('/support', supportAdd);
  server.get('/support/stream', supportStream); */
};
