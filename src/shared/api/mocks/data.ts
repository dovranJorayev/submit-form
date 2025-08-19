import type { BirthPlace, Document, Organization } from "../contracts";

export const mockBirthPlaces: BirthPlace[] = [
  { id: 1, label: "Saglygy goraýyş edarasynda doglan" },
  {
    id: 2,
    label:
      "Saglygy goraýyş edarasyndan daşarda (lukmançylyk kömegi berilmezden) doglan",
  },
  {
    id: 3,
    label:
      "Ulag serişdelerinde, ýa-da aralykdaky duralýagda, ekspedisiýada doglan",
  },
];

export const mockOrganizations: Organization[] = [
  {
    id: 1,
    label: "M.Garrýýew ad. TDLUEÇSOÝM",
  },
  {
    id: 2,
    label: "Başga lukmançylyk merkezi",
  },
];

export const mockDocuments: Document[] = [
  {
    id: 1,
    label: "Dogluş hakynda lukmançylyk şahadatnamasy",
  },
  {
    id: 2,
    label: "Başga resminamasy",
  },
];
