module.exports = {
  name: "imitate",
  description: "whats this?",
  aliases: [],
  ownerOnly: true,
  guildOnly: true,
  args: true,
  cooldown: 3,
  usage: "<id> <message>",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    msg.delete();
    const id = args[0];
    if (id.length !== 18) {
      return msg.channel.send(`Invalid ID`);
    }
    const rawMessage = msg.content.replace(`${prefix}imitate `, ``);
    const message = rawMessage.replace(id, ``);

    const user = client.users.fetch(id).then(function (user) {
      msg.channel.fetchWebhooks().then(function (webhooks) {
        if (!webhooks.size) {
          msg.channel
            .createWebhook(client.user.username, {
              avatar: avatar,
              reason: "Needed a cool new Webhook",
            })
            .then(function (webhook) {
              webhook.send(message, {
                username: user.username,
                avatarURL: user.avatarURL(),
              });
            });
        } else {
          webhooks.first().send(message, {
            username: user.username,
            avatarURL: user.avatarURL(),
          });
        }
      });
    });
  },
};
