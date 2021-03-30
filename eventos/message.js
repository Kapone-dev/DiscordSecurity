import { MessageEmbed } from "discord.js";
import lang from '../model/langs';
import espanol from '../lang/espanol';
import ingles from '../lang/english';
export default async(client, message) => {
    if (message.author.bot) return;
    if (message.guild && !message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES")) return;
    const prefix = "d!";
    // Idioma
    let idioma;
    const searchLang = await lang.findOne({ guildId: message.guild.id });
    if (!searchLang) idioma = ingles;
    else searchLang.lang == 'es' ? idioma = espanol : idioma = ingles;

    try {
        if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
            const embed = new MessageEmbed()
                .setColor("#33333")
                .setDescription(idioma.events.message.prefix)
                .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
            message.channel.send(embed)
        }
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase()
        if (command.length === 0) return;

        //CMD Handler
        let cmd = client.comandos.get(command) || client.alias.get(command);
        if (!cmd) return;
        if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(idioma.events.message.noPerms)
        const lang =
            await cmd.run(client, message, args, idioma)

    } catch (error) {
        console.log(error)
        message.channel.send(idioma.events.message.error)
    } finally {
        message.channel.stopTyping(true);
    }
};