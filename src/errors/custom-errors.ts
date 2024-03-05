// Base Error classes
export abstract class DataError extends Error implements ErrorBase {
  code: number;
  details?: ErrorDetails;

  constructor(code: number, message: string, details?: ErrorDetails) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

// Data Conversion Errors
export class DataConversionError extends DataError {
  constructor(message: string, details?: ErrorDetails) {
    super(1, message, details);
  }
}

// Data Formatting Errors
export class DataFormattingError extends DataError {
  constructor(message: string, details?: ErrorDetails) {
    super(2, message, details);
  }
}

// Transaction Management Errors
export class TransactionManagementError extends DataError {
  constructor(message: string, details?: ErrorDetails) {
    super(3, message, details);
  }
}

// File Upload Management Errors
export class FileUploadManagementError extends DataError {
  constructor(message: string, details?: ErrorDetails) {
    super(4, message, details);
  }
}
