const { Command } = require('discord-akairo');
const { CreateEmbed } = require('../../Utility/CreateEmbed');

module.exports = class SkipCommand extends Command {
  constructor() {
    super('skip', {
      aliases: ['skip', 's'],
      description: {
        content: 'skip current playing track',
      },
      category: 'Music',
      cooldown: 3000,
    });
  }

  async exec(msg) {
    try {
      const GuildPlayers = this.client.erela.players.get(msg.guild.id);
      if (!GuildPlayers) return msg.channel.send(CreateEmbed('info', '⛔ | There no music playing in this guild'));
      if (!msg.member.voice.channelID) return msg.channel.send(CreateEmbed('warn', '⛔ | you must join voice channel to do this.'));
      if (msg.member.voice.channelID !== GuildPlayers.VoiceChannel) return msg.channel.send(CreateEmbed('warn', '⛔ | you must join voice channel same as me to do this.'));
      GuildPlayers.stop();
      return msg.channel.send(CreateEmbed('info', '👌 | Skipped current track'));
    } catch (e) {
      this.client.logger.error(e.message);
      return msg.channel.send(CreateEmbed('warn', '⛔ | An error occured'));
    }
  }
};
