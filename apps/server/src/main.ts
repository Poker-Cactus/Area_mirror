/*
** EPITECH PROJECT, 2025
** area
** File description:
** main.ts
*/

import express from 'express';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/about.json', (req, res) => {
  const clientIp =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '';

  const response = {
    client: {
      host: clientIp,
    },
    server: {
      current_time: Math.floor(Date.now() / 1000),
      services: [
        {
          name: 'facebook',
          actions: [
            {
              name: 'new_message_in_group',
              description: 'A new message is posted in the group',
            },
            {
              name: 'new_message_inbox',
              description: 'A new private message is received by the user',
            },
            {
              name: 'new_like',
              description: 'The user gains a like from one of their messages',
            },
          ],
          reactions: [
            {
              name: 'like_message',
              description: 'The user likes a message',
            },
          ],
        },
      ],
    },
  };

  res.json(response);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
