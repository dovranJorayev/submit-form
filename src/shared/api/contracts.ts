// Types for the API responses
export interface BirthPlace {
    id: number;
    label: string;
  }
  
  export interface Organization {
    id: number;
    label: string;
  }
  
  export interface Document {
    id: number;
    label: string;
  }
  
  export interface SubmitFormData {
    placeOfBirth: number;
    documentType: number;
    issuedDate: string;
    documentNumber: string;
    issuingOrganization: number;
    file?: File;
  }
  
  export interface SubmitResponse {
    success: boolean;
    message: string;
    id?: string;
  }
  