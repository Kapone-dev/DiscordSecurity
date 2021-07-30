"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const lib_1 = require("../../lib");
class InviteCommand extends lib_1.CommandBase {
    constructor() {
        // Name, Category, alias, cooldown
        super('invite', 'user', [], 3);
    }
    async run(bot, message, args) {
        const lang = bot.language.commands.invite;
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(bot.client.user.username, bot.client.user.avatarURL())
            .setDescription(lang.desc)
            .setColor("RANDOM")
            .setFooter(lang.footer);
        message.channel.send({ embeds: [embed] });
    }
}
exports.default = InviteCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3VzZXIvaW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQW1EO0FBRW5ELG1DQUF3QztBQUN4QyxNQUFxQixhQUFjLFNBQVEsaUJBQVc7SUFDbEQ7UUFDSSxrQ0FBa0M7UUFDbEMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVEsRUFBRSxPQUFnQixFQUFFLElBQW1CO1FBQ3JELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxJQUFJLHlCQUFZLEVBQUU7YUFDL0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNoRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN6QixRQUFRLENBQUMsUUFBUSxDQUFDO2FBQ2xCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNKO0FBZEQsZ0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBNZXNzYWdlRW1iZWQgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0IEJvdCBmcm9tICcuLi8uLi9ib3QuanMnO1xyXG5pbXBvcnQgeyBDb21tYW5kQmFzZSB9IGZyb20gJy4uLy4uL2xpYic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludml0ZUNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBOYW1lLCBDYXRlZ29yeSwgYWxpYXMsIGNvb2xkb3duXHJcbiAgICAgICAgc3VwZXIoJ2ludml0ZScsICd1c2VyJywgW10sIDMpXHJcbiAgICB9XHJcbiAgICBhc3luYyBydW4oYm90OiBCb3QsIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBjb25zdCBsYW5nID0gYm90Lmxhbmd1YWdlLmNvbW1hbmRzLmludml0ZTtcclxuICAgICAgICBjb25zdCBlbWJlZCA9IG5ldyBNZXNzYWdlRW1iZWQoKVxyXG4gICAgICAgIC5zZXRBdXRob3IoYm90LmNsaWVudC51c2VyLnVzZXJuYW1lLCBib3QuY2xpZW50LnVzZXIuYXZhdGFyVVJMKCkpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKGxhbmcuZGVzYylcclxuICAgICAgICAuc2V0Q29sb3IoXCJSQU5ET01cIilcclxuICAgICAgICAuc2V0Rm9vdGVyKGxhbmcuZm9vdGVyKTtcclxuICAgICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZCh7ZW1iZWRzOiBbZW1iZWRdfSk7XHJcbiAgICB9XHJcbn0iXX0=