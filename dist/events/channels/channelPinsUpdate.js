"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database/");
const lib_1 = require("../../lib");
class UpdatePinsEvent extends lib_1.BaseEvent {
    constructor() {
        super('channelPinsUpdate');
    }
    async run(bot, channel) {
        if (!channel.guild)
            return;
        const searchVip = await database_1.Vip.findOne({ guildId: channel.guild.id });
        if (!searchVip || searchVip.licence !== 'vip3')
            return;
        const update = await database_1.Messages.findOne({ guild: channel.guild.id, channel: channel.id });
        const message = await channel.messages.fetchPinned();
        const data = [];
        for (const msg of message.array()) {
            data.push({
                username: msg.author.username,
                avatar: msg.author.avatarURL(),
                content: msg.content
            });
        }
        if (!update) {
            await database_1.Messages.create({
                guild: channel.guild.id,
                channel: channel.id,
                messages: data
            });
        }
        else {
            update.messages = data;
            await update.save();
        }
    }
}
exports.default = UpdatePinsEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbFBpbnNVcGRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZlbnRzL2NoYW5uZWxzL2NoYW5uZWxQaW5zVXBkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBQWdEO0FBQ2hELG1DQUFzQztBQUN0QyxNQUFxQixlQUFnQixTQUFRLGVBQVM7SUFDbEQ7UUFDSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFRLEVBQUUsT0FBTztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sY0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLE1BQU07WUFBRSxPQUFPO1FBRXZELE1BQU0sTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDTixRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRO2dCQUM3QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQzlCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTzthQUN2QixDQUFDLENBQUM7U0FDTjtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLG1CQUFRLENBQUMsTUFBTSxDQUFDO2dCQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN2QixPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ25CLFFBQVEsRUFBRSxJQUFJO2FBQ2pCLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7Q0FDSjtBQTlCRCxrQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm90IGZyb20gXCIuLi8uLi9ib3RcIjtcclxuaW1wb3J0IHsgVmlwLCBNZXNzYWdlcyB9IGZyb20gXCIuLi8uLi9kYXRhYmFzZS9cIjtcclxuaW1wb3J0IHsgQmFzZUV2ZW50IH0gZnJvbSAnLi4vLi4vbGliJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlUGluc0V2ZW50IGV4dGVuZHMgQmFzZUV2ZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCdjaGFubmVsUGluc1VwZGF0ZScpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgcnVuKGJvdDogQm90LCBjaGFubmVsKSB7XHJcbiAgICAgICAgaWYgKCFjaGFubmVsLmd1aWxkKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoVmlwID0gYXdhaXQgVmlwLmZpbmRPbmUoeyBndWlsZElkOiBjaGFubmVsLmd1aWxkLmlkIH0pO1xyXG4gICAgICAgIGlmICghc2VhcmNoVmlwIHx8IHNlYXJjaFZpcC5saWNlbmNlICE9PSAndmlwMycpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlID0gYXdhaXQgTWVzc2FnZXMuZmluZE9uZSh7IGd1aWxkOiBjaGFubmVsLmd1aWxkLmlkLCBjaGFubmVsOiBjaGFubmVsLmlkIH0pO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBjaGFubmVsLm1lc3NhZ2VzLmZldGNoUGlubmVkKCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgbXNnIG9mIG1lc3NhZ2UuYXJyYXkoKSkge1xyXG4gICAgICAgICAgICBkYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IG1zZy5hdXRob3IudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBhdmF0YXI6IG1zZy5hdXRob3IuYXZhdGFyVVJMKCksXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBtc2cuY29udGVudFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF1cGRhdGUpIHtcclxuICAgICAgICAgICAgYXdhaXQgTWVzc2FnZXMuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGd1aWxkOiBjaGFubmVsLmd1aWxkLmlkLFxyXG4gICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbC5pZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBkYXRhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZS5tZXNzYWdlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZS5zYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19