import Bot from '../../bot';
import { GuildChannel, Message, TextChannel } from 'discord.js';
import { Channel } from '../../database/';
import { CommandBase } from '../../lib';

export default class PTCCommand extends CommandBase {
	constructor() {
		super('protected-channels', 'admin', ['canales-protegidos', 'ptc'], 5);
	}

	async run(bot: Bot, message: Message, args: string[]) {
		const lang = this.language(message.guildId);

		if (message.author.id != message.guild.ownerId) return message.channel.send(lang.noPerms);
		if (!args[0]) return message.channel.send(lang.removeAdd);

		const channel = await bot.getChannel(args[1]);
		const searchChannel = await Channel.findById(message.guildId);

		if (['remove', 'remover'].includes(args[0].toLowerCase())) {
			if (!searchChannel) return message.reply(lang.noCanales);
			
			const indice = searchChannel.channel.indexOf(args[1]);
			if (indice === -1) return message.channel.send(lang.noFound);
			
			searchChannel.channel.splice(indice, 1);
			await searchChannel.save();
			
			message.channel.send(lang.removeExitoso);
		} else if (['add', 'añadir'].includes(args[0].toLowerCase())) {
			if (!channel) return message.channel.send(lang.noCanal);
			if (channel.guild.id !== message.guildId) return message.channel.send(lang.noCanal);
			if (searchChannel) {
				if (searchChannel.channel.length >= 3) return message.channel.send(lang.no3Mas);
				if (searchChannel.channel.includes(channel.id)) return message.channel.send(lang.yaEsta);
				
				await searchChannel.updateOne({
					$push: { channel: channel.id },
				});
			} else {
				const newChannel = new Channel({
					_id: message.guildId,
					channel: channel.id,
				});

				await newChannel.save();
			}

			message.channel.send(channel.toString() + lang.establecido);
		} else if (['view', 'ver'].includes(args[0].toLowerCase())) {
			if (!searchChannel) return message.channel.send('There are no channels');
			message.channel.send(searchChannel.channel.map((v) => '<#' + v + '>').join(' '));
		} else {
			message.channel.send(lang.removeAdd);
		}
	}
}
