export interface Gist {
  id: string;
  description: string;
  created: string;
}

export interface GistsState {
  data: Gist[];
  loading: boolean;
  error: string | null;
  selectedGist?: Gist;
}
