import {
	Client,
	ClientOptions,
	Collection,
	GuildChannel,
	User,
} from 'discord.js';
import { ICommands, IEvents, ILang, Handler } from './lib';
import { Database } from './database/db';
class Bot {

	readonly _client: Client;
	private _commands: Collection<string, any>;
	private _events: Collection<string, any>;

	constructor(
		options: ClientOptions,
		commands: Collection<string, any>,
		events: Collection<string, any>
	) {
		this._client = new Client(options);
		this._commands = commands;
		this._events = events;
	}

	set commands(commands) {
		this._commands = commands;
	}

	get commands(): Collection<string, ICommands> {
		return this._commands;
	}

	set events(events) {
		this._events = events;
	}

	get events(): Collection<string, IEvents> {
		return this._events;
	}

	get client(): Client {
		return this._client;
	}
	/**
	 * Loggin in the database and joining in the bot
	 */
	async start(): Promise<void> {
		const { register } = new Handler(this);
		const { connect } = new Database(process.env.URLMONGODB);

		connect();
		
		await register('./commands');
		await register('./events');
		await this.client.login(process.env.TOKEN);
	}

	/**
	 * Find a user with a id
	 */
	async getUser(id: string): Promise<null | User> {
		return (
			this.client.users.cache.get(id) ||
			(await this.client.users.fetch(id).catch(() => null))
		);
	}
	
	/**
	 * Find a channel with a id
	 */
	async getChannel(id: string): Promise<null | GuildChannel> {
		return (
			this.client.channels.cache.get(id) ||
			(await this.client.channels.fetch(id).catch(() => null))
		);
	}
}

export default Bot;
