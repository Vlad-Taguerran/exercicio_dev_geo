export interface IEventService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(url: string, onMessage: (data: any) => void, onError?: (error: any) => void): void;
  disconnect(): void;
}
