export interface FormStepProps<T> {
  formData: T | null;
  onSuccessfulSubmit: (data: T) => void;
}
