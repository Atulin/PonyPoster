export interface DerpiResult {
    images: Image[];
    interactions: object[];
    total: number;
  }
  
  export interface Image {
    sourceURL: null | string;
    sha512Hash: string;
    faves: number;
    uploaderID: number | null;
    upvotes: number;
    thumbnailsGenerated: boolean;
    id: number;
    downvotes: number;
    origSha512Hash: string;
    format: Format;
    animated: boolean;
    height: number;
    representations: Representations;
    name: string;
    uploader: null | string;
    aspectRatio: number;
    description: string;
    processed: boolean;
    spoilered: boolean;
    mimeType: MIMEType;
    tagCount: number;
    size: number;
    intensities: Intensities;
    hiddenFromUsers: boolean;
    duplicateOf: null | number;
    tags: string[];
    deletionReason: null | string;
    width: number;
    firstSeenAt: Date;
    createdAt: Date;
    tagIDS: number[];
    commentCount: number;
    wilsonScore: number;
    score: number;
    updatedAt: Date;
    duration: number;
    viewURL: string;
  }
  
  export enum Format {
    Jpg = "jpg",
    PNG = "png",
    Webm = "webm",
    Gif = "gif",
    Jpeg = "jpeg",
    SVG = "svg",
  }
  
  export interface Intensities {
    ne: number;
    nw: number;
    se: number;
    sw: number;
  }
  
  export enum MIMEType {
    ImageGIF = "image/gif",
    ImageJPEG = "image/jpeg",
    ImagePNG = "image/png",
    VideoWebm = "video/webm",
    ImageSvgXml = "image/svg+xml",
  }
  
  export interface Representations {
    full: string;
    large: string;
    medium: string;
    small: string;
    tall: string;
    thumb: string;
    thumbSmall: string;
    thumbTiny: string;
  }
  