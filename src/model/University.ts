export interface UniversityAPI {
  id: number;
  slug: string;
  name: string;
  shortName?: string;
  logoUrl: string;
}

export const normalizeUniversity = (data: UniversityAPI) => ({
  ...data,
});

export type University = ReturnType<typeof normalizeUniversity>;
