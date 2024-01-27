export * from 'flarum/common/models/User';

declare module 'flarum/common/models/User' {
  export default interface User {
    blocksPd(): boolean;
    cannotBeDirectMessaged(): boolean;
    unreadPrivateMessagesCount(): number;
  }
}
