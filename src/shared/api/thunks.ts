import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BirthPlace, Document, Organization } from "./contracts";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const loadBirthPlacesThunk = createAsyncThunk<BirthPlace[]>(
  "submitForm/loadBirthPlaces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/birth-places`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to load birth places"
      );
    }
  }
);

export const loadOrganizationsThunk = createAsyncThunk<Organization[]>(
  "submitForm/loadOrganizations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to load organizations"
      );
    }
  }
);

export const loadDocumentsThunk = createAsyncThunk<Document[]>(
  "submitForm/loadDocuments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to load documents"
      );
    }
  }
);

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

export const submitFormThunk = createAsyncThunk<SubmitResponse, SubmitFormData>(
  "submitForm/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const submitData = new FormData();

      submitData.append("placeOfBirth", formData.placeOfBirth.toString());
      submitData.append("documentType", formData.documentType.toString());
      submitData.append("issuedDate", formData.issuedDate);
      submitData.append("documentNumber", formData.documentNumber);
      submitData.append(
        "issuingOrganization",
        formData.issuingOrganization.toString()
      );

      if (formData.file) {
        submitData.append("file", formData.file);
      }

      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    }
  }
);
