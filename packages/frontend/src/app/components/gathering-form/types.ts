export type SubmitFunction<T> = () => Promise<{
  valid: boolean;
  data?: T;
}>;
