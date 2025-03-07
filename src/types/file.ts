export interface File {
  filename: string;
  content?: string;
}

export interface FilesState {
  data: File[];
  loading: boolean;
  error: string | null;
  selectedFile?: File;
}

export interface FetchFilesParams {
  gistId: string;
  userName: string;
}
