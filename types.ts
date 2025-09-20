
export interface VideoData {
  thumbnailUrl: string;
  title: string;
  description: string;
  downloadLinks: DownloadLink[];
}

export interface DownloadLink {
  quality: string;
  url: string;
}
