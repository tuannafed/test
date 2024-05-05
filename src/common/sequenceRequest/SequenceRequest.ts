import hash from 'object-hash';

const axiosConfigs = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000
};

export class SequenceRequest {
  private static _requestQueueMemo: { [key: string]: Promise<any> }[] = [];
  private static _listSubscribers: Function[] = [];

  private constructor() {
    //TODO: Implementar singleton
  }
  // public static getRequestSequence() {
  //     if (this._requestInstance) {
  //         this._requestInstance =  axios.create(axiosConfigs)
  //     }
  // }

  public static subscribe(subscriber: Function) {
    this._listSubscribers = [...this._listSubscribers, subscriber];
  }

  public static unsubscribe(subscriber: Function) {
    this._listSubscribers = this._listSubscribers.filter(
      sub => sub !== subscriber
    );
  }

  public static publish(objectParams: Object, functionCall: Promise<any>) {
    const key = hash(objectParams);
    this._requestQueueMemo = [
      ...this._requestQueueMemo,
      { [key]: functionCall }
    ];

    functionCall.then(values => {
      const foundIndex = Object.values(this._requestQueueMemo).findIndex(
        async promiseCall => promiseCall == (await functionCall)
      );

      if (foundIndex == 0) {
        this._listSubscribers.forEach(subscriber => subscriber(values));
        delete this._requestQueueMemo[key];
      } else {
        setTimeout(() => {
          this._listSubscribers.forEach(subscriber => subscriber(values));
        }, 1000);
      }
    });
  }
}
