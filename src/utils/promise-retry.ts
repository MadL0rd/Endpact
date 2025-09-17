type PromiseRetryConfig<T> = {
  call: () => Promise<T>;
  count: number;
  timeoutSec?: number;
  onError?: (error: unknown) => Promise<void>;
};

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

export async function promiseRetry<T>(config: PromiseRetryConfig<T>): Promise<T> {
  let error: any;
  for (let i = 0; i < config.count; i++) {
    try {
      const result = await config.call();
      return result;
    } catch (e) {
      error = e;
    }
    if (config.onError) {
      await config.onError(error);
    }
    if (config.timeoutSec && i + 1 !== config.count) {
      await sleep(config.timeoutSec);
    }
  }

  throw error;
}
