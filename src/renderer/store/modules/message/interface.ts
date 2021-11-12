import { DateTime } from "luxon";


export interface MessageCenterState {
  users: Map<string, User>; // 缓存用户数据
  myEmoticons: Map<string, CustomEmoji>;
}

export interface SessionState {
  curSid: string; // 当前会话ID
  sessions: Map<string, Session>; // 缓存会话数据
}

export class CustomEmoji {
  eid: string;
  snap: string; // 预览图
  url: string; // 资源地址

  constructor(eid: string, snap: string, url: string) {
    this.eid = eid;
    this.snap = snap;
    this.url = url;
  }
}

export class User {
  uid: string;
  nickname: string;
  avatar: string;

  constructor(uid: string, nickname: string, avatar: string) {
    this.uid = uid;
    this.nickname = nickname;
    this.avatar = avatar;
  }
}

export enum SessionType {
  P2P, // 单聊
  GROUP, // 群组
  SYSTEM // 系统
}

export class Session {
  sid: string;
  type: SessionType;
  title?: string;
  thumb?: string;
  snapshot?: string;
  members: Array<string>;
  messages: Array<Message>;

  constructor(sid: string, type: SessionType, members: Array<string>, title?: string, thumb?: string, messages?: Array<Message>) {
    this.sid = sid;
    this.type = type;
    this.members = members;
    this.title = title;
    this.thumb = thumb;
    this.messages = messages;
  }

  addMessage(message: Message) {
    if (this.messages == null) this.messages = new Array();
    this.messages.push(message);
  }

  lstMessage(): Message {
    return this.messages[this.messages.length - 1];
  }
}

export enum MessageType {
  TEXT = 1, // 文字
  EMOJI = 2, // 表情
  IMAGE = 3, // 图片
  AUDIO = 4, // 语音
  VIDEO = 5, // 视频
  SYSTEM = 6 // 系统通知
}

export class Message {
  uid: string;
  timestamp: DateTime;
  sent: boolean; // 是否已发送
  read: boolean; // 是否已读
  type: MessageType;
  content: any;

  constructor(uid: string, type: MessageType, content: any,
    timestamp: DateTime,
    sent?: boolean, read?: boolean,) {
    this.uid = uid;
    this.type = type;
    this.content = content;
    this.timestamp = timestamp;
    this.sent = sent ? sent : false;
    this.read = read ? read : false;
  }
}