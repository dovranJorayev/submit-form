import type {
  BirthPlace,
  Document,
  Organization,
  SubmitFormArg,
} from "@/shared/api/contracts";
import {
  loadBirthPlacesThunk,
  loadDocumentsThunk,
  loadOrganizationsThunk,
  submitFormThunk,
} from "@/shared/api/thunks";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { z } from "zod";

type SubmitSliceState = Record<
  typeof reducerName,
  ReturnType<typeof slice.getInitialState>
>;

const reducerName = "pages/submit";

const loadThunk = createAsyncThunk(
  `${reducerName}/loadThunk`,
  async (_, api) => {
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
  }
);
const submitThunk = createAsyncThunk(
  `${reducerName}/submitThunk`,
  async (arg: SubmitFormArg, api) => {
    const response = await api
      .dispatch(
        submitFormThunk({
          placeOfBirth: Number(arg.placeOfBirth),
          documentType: Number(arg.documentType),
          issuedDate: arg.issuedDate,
          documentNumber: arg.documentNumber,
          issuingOrganization: Number(arg.issuingOrganization),
          file: arg.file,
        })
      )
      .unwrap();
    return response;
  },
  {
    condition(_, api) {
      return !slice.selectors.selectSubmitting(
        api.getState() as SubmitSliceState
      );
    },
  }
);

export const submitFormSchema = z.object({
  placeOfBirth: z.string({ message: "Dogluş ýeri saýlanmadyk" }),
  documentType: z.string({ message: "Resminamanyň görnüşi saýlanmadyk" }),
  issuedDate: z.string({
    message: "Berlen wagty girizilmedi",
  }),
  documentNumber: z.string({ message: "Resminamanyň nomeri girizilmedi" }),
  issuingOrganization: z.string({
    message: "Resminamany beren edaranyň ady saýlanmadyk",
  }),
  file: z.instanceof(File, { message: "Resminamany ýükle" }).optional(),
});

const slice = createSlice({
  name: reducerName,
  initialState: {
    birthPlaces: [] as BirthPlace[],
    organizations: [] as Organization[],
    documents: [] as Document[],
    loading: false,
    submitting: false,
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
      })
      .addCase(submitThunk.pending, (state) => {
        state.submitting = true;
      });

    builder
      .addMatcher(isAnyOf(loadThunk.fulfilled, loadThunk.rejected), (state) => {
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(submitThunk.fulfilled, submitThunk.rejected),
        (state) => {
          state.submitting = false;
        }
      );
  },
  selectors: {
    selectBirthPlaces: (state) => state.birthPlaces,
    selectOrganizations: (state) => state.organizations,
    selectDocuments: (state) => state.documents,
    selectLoading: (state) => state.loading,
    selectSubmitting: (state) => state.submitting,
  },
});

export const submitPageModel = {
  selectors: slice.selectors,
  actions: {
    load: loadThunk,
    submit: submitThunk,
  },
};

export const submitFormName = slice.name;
export const submitFormReducer = slice.reducer;
