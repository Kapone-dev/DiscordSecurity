import { Message } from 'discord.js';
import moment from 'moment';
import Bot from '../../bot';
import { Vip } from '../../database/';
import { CommandBase } from '../../lib';

export default class AddVip extends CommandBase {
	constructor() {
		super('add-vip', 'dev', ['añadir-vip'], 1);
	}
	async run(bot: Bot, message: Message, args: Array<string>) {
		
		if (!args[0]) return message.channel.send('Please provide a argument.\nUse: `d!add-vip <Guild> <Licence> <Buyer>`');

		const guild = await bot.client.guilds
			.fetch(`${BigInt(args[0])}`)
			.catch(() => null);
		if (!guild) return message.channel.send('Guild invalid!');
		
		const searchGuild = await Vip.findById(guild.id);
		if (searchGuild) {
			return message.channel.send('This guild has the licence ' + searchGuild.licence);
		} else {

			const licence = args[1].toLowerCase();
			const buyer = await bot.client.users
				.fetch(args[2])
				.catch(() => null);
			
			if (!buyer) return message.channel.send('Please provide a valid buyer\nUse: `d!add-vip <Guild> <Licence> <Buyer>`');
			if (!['vip1', 'vip2', 'vip3'].includes(licence)) return message.channel.send('Please provide a valid license. `Vip1, vip2, vip3`\nUse: `d!add-vip <Guild> <Licence> <Buyer>`');

			const now = new Date();
			const date = new Date(now.setDate(now.getDate() + 30));

			await Vip.create({
				_id: guild.id,
				time: date,
				buyer,
				licence,
			});

			message.channel.send('¡The licence has created!. Ends in: ' + moment(date).format('L'));
		}
	}
}
