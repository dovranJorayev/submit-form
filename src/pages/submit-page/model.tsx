import type {
  BirthPlace,
  Document,
  Organization,
} from "@/shared/api/contracts";
import {
  loadBirthPlacesThunk,
  loadDocumentsThunk,
  loadOrganizationsThunk,
} from "@/shared/api/thunks";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const loadThunk = createAsyncThunk("submitForm/loadThunk", async (_, api) => {
  const [birthPlaces, organizations, documents] = await Promise.all([
    api.dispatch(loadBirthPlacesThunk()).unwrap(),
    api.dispatch(loadOrganizationsThunk()).unwrap(),
    api.dispatch(loadDocumentsThunk()).unwrap(),
  ]);

  return {
    birthPlaces: birthPlaces,
    organizations: organizations,
    documents: documents,
  };
});

const slice = createSlice({
  name: "pages/submit",
  initialState: {
    birthPlaces: [] as BirthPlace[],
    organizations: [] as Organization[],
    documents: [] as Document[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadThunk.fulfilled, (state, action) => {
        state.birthPlaces = action.payload.birthPlaces;
        state.organizations = action.payload.organizations;
        state.documents = action.payload.documents;
      })
      .addCase(loadThunk.pending, (state) => {
        state.loading = true;
      });

    builder.addMatcher(
      isAnyOf(loadThunk.fulfilled, loadThunk.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
  selectors: {
    selectBirthPlaces: (state) => state.birthPlaces,
    selectOrganizations: (state) => state.organizations,
    selectDocuments: (state) => state.documents,
    selectLoading: (state) => state.loading,
  },
});

export const submitPageModel = {
  selectors: slice.selectors,
  actions: {
    load: loadThunk,
  },
};

export const submitFormName = slice.name;
export const submitFormReducer = slice.reducer;
