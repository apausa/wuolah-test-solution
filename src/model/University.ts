export interface UniversityAPI {
  id: number;
  slug: string;
  name: string;
  shortName?: string;
  logoUrl: string;
}

const getInitials = (name: string) => {
  const words = name.split(" ");
  const initials = words.map((word) => word[0]).join("");
  return initials;
};

export const normalizeUniversity = (data: UniversityAPI) => ({
  ...data,
  shortName: data.shortName || getInitials(data.name),
});

export type University = ReturnType<typeof normalizeUniversity>;
