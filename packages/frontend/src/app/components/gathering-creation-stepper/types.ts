export interface FormStepProps<T> {
  formData: T | null;
  setSubmitRef: (ref: () => Promise<void>) => void;
  onSuccessfulSubmit: (data: T) => void;
}
