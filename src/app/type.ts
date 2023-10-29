type ExtendString<T extends string> = T | Omit<string, T>;

type VideoFormatQuality =
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "hd720"
  | "hd1080"
  | "hd1440"
  | "hd2160"
  | "highres";

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Storyboard {
  templateUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailCount: number;
  interval: number;
  columns: number;
  rows: number;
  storyboardCount: number;
}

interface Chapter {
  title: string;
  start_time: number;
}

interface Media {
  category: string;
  category_url: string;
  game?: string;
  game_url?: string;
  year?: number;
  song?: string;
  artist?: string;
  artist_url?: string;
  writers?: string;
  licensed_by?: string;
  thumbnails: Thumbnail[];
}

interface MicroformatRenderer {
  thumbnail: {
    thumbnails: Thumbnail[];
  };
  embed: {
    iframeUrl: string;
    flashUrl: string;
    width: number;
    height: number;
    flashSecureUrl: string;
  };
  title: {
    simpleText: string;
  };
  description: {
    simpleText: string;
  };
  lengthSeconds: string;
  ownerProfileUrl: string;
  ownerGplusProfileUrl?: string;
  externalChannelId: string;
  isFamilySafe: boolean;
  availableCountries: string[];
  isUnlisted: boolean;
  hasYpcMetadata: boolean;
  viewCount: string;
  category: string;
  publishDate: string;
  ownerChannelName: string;
  liveBroadcastDetails?: {
    isLiveNow: boolean;
    startTimestamp: string;
    endTimestamp?: string;
  };
  uploadDate: string;
}

interface VideoDetail {
  videoId: string;
  title: string;
  shortDescription: string;
  lengthSeconds: string;
  keywords?: string[];
  channelId: string;
  isOwnerViewing: boolean;
  isCrawlable: boolean;
  thumbnails: Thumbnail[];
  averageRating: number;
  allowRatings: boolean;
  viewCount: string;
  author: string;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
}

interface MoreVideoDetail
  extends Omit<VideoDetail, "author" | "thumbnail" | "shortDescription">,
    Omit<MicroformatRenderer, "title" | "description"> {
  published: number;
  video_url: string;
  age_restricted: boolean;
  likes: number | null;
  dislikes: number | null;
  media: Media;
  author: Author;
  thumbnails: Thumbnail[];
  storyboards: Storyboard[];
  chapters: Chapter[];
  description: string | null;
}

export interface VideoFormat {
  itag: number;
  url: string;
  mimeType?: string;
  bitrate?: number;
  audioBitrate?: number;
  width?: number;
  height?: number;
  initRange?: { start: string; end: string };
  indexRange?: { start: string; end: string };
  lastModified: string;
  contentLength: string;
  quality: ExtendString<VideoFormatQuality>;
  qualityLabel:
    | "144p"
    | "144p 15fps"
    | "144p60 HDR"
    | "240p"
    | "240p60 HDR"
    | "270p"
    | "360p"
    | "360p60 HDR"
    | "480p"
    | "480p60 HDR"
    | "720p"
    | "720p60"
    | "720p60 HDR"
    | "1080p"
    | "1080p60"
    | "1080p60 HDR"
    | "1440p"
    | "1440p60"
    | "1440p60 HDR"
    | "2160p"
    | "2160p60"
    | "2160p60 HDR"
    | "4320p"
    | "4320p60";
  projectionType?: "RECTANGULAR";
  fps?: number;
  averageBitrate?: number;
  audioQuality?: "AUDIO_QUALITY_LOW" | "AUDIO_QUALITY_MEDIUM";
  colorInfo?: {
    primaries: string;
    transferCharacteristics: string;
    matrixCoefficients: string;
  };
  highReplication?: boolean;
  approxDurationMs?: string;
  targetDurationSec?: number;
  maxDvrDurationSec?: number;
  audioSampleRate?: string;
  audioChannels?: number;

  // Added by ytdl-core
  container: "flv" | "3gp" | "mp4" | "webm" | "ts";
  hasVideo: boolean;
  hasAudio: boolean;
  codecs: string;
  videoCodec?: string;
  audioCodec?: string;

  isLive: boolean;
  isHLS: boolean;
  isDashMPD: boolean;
}

interface Author {
  id: string;
  name: string;
  avatar: string; // to remove later
  thumbnails?: Thumbnail[];
  verified: boolean;
  user?: string;
  channel_url: string;
  external_channel_url?: string;
  user_url?: string;
  subscriber_count?: number;
}

export interface RelatedVideo {
  id?: string;
  title?: string;
  published?: string;
  author: Author | "string"; // to remove the `string` part later
  ucid?: string; // to remove later
  author_thumbnail?: string; // to remove later
  short_view_count_text?: string;
  view_count?: string;
  length_seconds?: number;
  video_thumbnail?: string; // to remove later
  thumbnails: Thumbnail[];
  richThumbnails: Thumbnail[];
  isLive: boolean;
}

export interface VideoInfo {
  videoFormats: VideoFormat[];
  audioFormat?: VideoFormat;
  related_videos: RelatedVideo[];
  videoDetails: MoreVideoDetail | null;
}

export type Tab = "Video" | "Audio";

export interface Download {
  type: "mp3" | "mp4";
  url?: string;
  itag?: number;
}
