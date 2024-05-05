export interface IAppState {
  isLoaded: boolean;
  isToggleSidebar: boolean;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: any;
}
