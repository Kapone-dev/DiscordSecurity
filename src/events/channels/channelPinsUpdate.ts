import { TextChannel } from 'discord.js';
import Bot from '../../bot';
import { Vip, Messages } from '../../database/';
import { BaseEvent } from '../../lib';

export default class UpdatePinsEvent extends BaseEvent {
	constructor() {
		super('channelPinsUpdate');
	}

	async run(bot: Bot, channel: TextChannel): Promise<void> {

		if (!channel.guild) return;

		const searchVip = await Vip.findById(channel.guildId);
		if (!searchVip || searchVip.licence !== 'vip3') return;

		const update = await Messages.findOne({
			_id: channel.guild.id,
			channel: channel.id,
		});
		const message = await channel.messages.fetchPinned();
		const data = [];

		for (const msg of [...message.values()]) {
			data.push({
				username: msg.author.username,
				avatar: msg.author.avatarURL(),
				content: msg.content,
			});
		}

		if (update) {
			update.messages = data;
			await update.save();
		} else {
			await Messages.create({
				_id: channel.guild.id,
				channel: channel.id,
				messages: data,
			});
		}
	}
}
