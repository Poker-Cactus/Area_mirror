const express = require('express');
const app = express();

app.get('/about.json', (req, res) => {
  const about = {
    client: {
      host: req.ip || req.connection.remoteAddress || "unknown"
    },
    server: {
      current_time: Math.floor(Date.now() / 1000),
      services: [
        {
          name: "facebook",
          actions: [
            {
              name: "new_message_in_group",
              description: "A new message is posted in the group"
            },
            {
              name: "new_message_inbox",
              description: "A new private message is received by the user"
            },
            {
              name: "new_like",
              description: "The user gains a like from one of their messages"
            }
          ],
          reactions: [
            {
              name: "like_message",
              description: "The user likes a message"
            }
          ]
        }
      ]
    }
  };
  res.json(about);
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
