import { http, HttpResponse } from "msw";
import type { SubmitResponse } from "../thunks";
import { mockBirthPlaces, mockDocuments, mockOrganizations } from "./data";

export const handlers = [
  // Get birth places
  http.get("*/api/birth-places", async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return HttpResponse.json(mockBirthPlaces);
  }),

  // Get organizations
  http.get("*/api/organizations", async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return HttpResponse.json(mockOrganizations);
  }),

  // Get documents
  http.get("*/api/documents", async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return HttpResponse.json(mockDocuments);
  }),

  // Submit form
  http.post("*/api/submit", async ({ request }) => {
    try {
      const formData = await request.formData();

      // Simulate validation
      const placeOfBirth = formData.get("placeOfBirth");
      const documentType = formData.get("documentType");
      const issuedDate = formData.get("issuedDate");
      const documentNumber = formData.get("documentNumber");
      const issuingOrganization = formData.get("issuingOrganization");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate validation errors
      if (!placeOfBirth) {
        return HttpResponse.json(
          { success: false, message: "Dogluş ýeri saýlanmadyk" },
          { status: 400 }
        );
      }

      if (!documentType) {
        return HttpResponse.json(
          { success: false, message: "Resminamanyň görnüşi saýlanmadyk" },
          { status: 400 }
        );
      }

      if (!issuedDate) {
        return HttpResponse.json(
          { success: false, message: "Berlen wagty girizilmedi" },
          { status: 400 }
        );
      }

      if (!documentNumber) {
        return HttpResponse.json(
          { success: false, message: "Resminamanyň nomeri girizilmedi" },
          { status: 400 }
        );
      }

      if (!issuingOrganization) {
        return HttpResponse.json(
          { success: false, message: "Beriji edaranyň ady saýlanmadyk" },
          { status: 400 }
        );
      }

      // Simulate successful submission
      const response: SubmitResponse = {
        success: true,
        message: "Arza üstünlikli iberildi",
        id: `FORM_${Date.now()}`,
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return HttpResponse.json(response);
    } catch {
      return HttpResponse.json(
        { success: false, message: "Arzany ibermekde ýalňyşlyk ýüze çykdy" },
        { status: 500 }
      );
    }
  }),
];
