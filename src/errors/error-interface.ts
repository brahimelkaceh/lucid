interface ErrorBase {
  code: number;
  message: string;
  details?: ErrorDetails;
}

interface ErrorDetails {
  additionalInfo?: string;
}
