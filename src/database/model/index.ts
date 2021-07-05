import {model, Schema, Document} from 'mongoose';

// Creando los esquemas
const vip = new Schema({
    guildId: String,
    time: Date,
    buyer: String,
    licence: String
});

const channel = new Schema({
    _id: String,
    channel: Array
});

const langs = new Schema({
    _id: String,
    lang: String
});

const malicioso = new Schema({
    usuarios: Array
});


const messages = new Schema({
    _id: String,
    channel: String,
    messages: Array
});


const registrador = new Schema({
    _id: String,
    channel: String,
    users: Array,
    extrem: Boolean,
    autoban: Boolean,
    roles: Boolean
});


// Exportando los esquemas
export const Vip = model<IVip>('Vips', vip);
export const Channel = model<IChannel>('Channels', channel);
export const Langs = model<ILangs>('Langs', langs);
export const Malicioso =  model<IMalicioso>('Malicioso', malicioso);
export const Messages = model<IMessages>('messages', messages);
export const Registrador = model<IRegistrador>('Registrador', registrador);


// Creando y exportando las interfaces
export interface IVip extends Document {
    licence: string;
    guildId: string;
    time: Date;
    buyer: string;
}
export interface IChannel extends Document {
    _id: string;
    channel: Array<string>;
}
export interface ILangs extends Document {
    _id: string;
    lang: string;
}

export interface IMalicioso extends Document {
    usuarios: Array<string>;
}
export interface IMessages extends Document {
    _id: string;
    channel: string;
    messages: Array<any>;
}
export interface IRegistrador extends Document {
    _id: string;
    channel: string;
    users: Array<string>;
    extrem: Boolean;
    autoban: Boolean;
    roles: Boolean;
}