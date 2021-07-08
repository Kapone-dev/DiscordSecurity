import {Malicioso} from "../../database/model/index";
import BaseCommand from '../../utils/Structure/command';
import Bot from "../../bot";
import { Message, Util, MessageEmbed, Client } from "discord.js";
export default class ForceBanCommand extends BaseCommand {
    constructor() {
        // Name, Category, alias, cooldown
        super('force-ban', 'Admin', ["forceban"], 1500)
    }
    async run(bot: Bot, message: Message, args: string[], idioma) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(idioma.global.noPerms);
        const lang = idioma.commands.forceban;
        const users = await Malicioso.findOne();
        if (!users) return message.channel.send(lang.noUsers)
        const msg = await message.channel.send(lang.baneado);
        let noBans: number = 0;
        let banneds: number = 0;
        for (const usersId of users.usuarios) {
            await Util.delayFor(5000); // This will allow the API not to be abused by waiting 5 seconds
            const userToBan = bot.client.users.cache.get(`${BigInt(usersId)}`) || await bot.client.users.fetch(`${BigInt(usersId)}`);
            if (userToBan) {
                await message.guild.members.ban(userToBan, { days: 7, reason: lang.reason }).catch(() => { noBans++ });
            }
            banneds++;
        };
        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setDescription(lang.desc)
            .addFields({
                    name: lang.ready,
                    value: `${banneds - noBans}`,
                    inline: true
                },
                {
                    name: lang.errores,
                    value: `${noBans}`,
                    inline: true
                });
        await msg.edit({ embeds: [embed] });
    }
}