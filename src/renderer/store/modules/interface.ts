
export interface BizMainState {
  navBarState: NavBarState;

}

export interface NavBarState {
  title: string;
  showLeft: boolean;
  leftIcon?: string;
  leftText?: string;
  leftAction?: Function;
  showRight: boolean;
  rightIcon?: string;
  rightText?: string;
  rightAction?: Function;
}

export interface AppState {

}

export interface AccountState {
  account: Account;
}

export class Account {
  uid: string;
  token?: string;
  nikename: string;
  avatar: string;
}