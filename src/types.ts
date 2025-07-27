export type Stock = {
    approved?: boolean;
    author?: string;
    category?: number;
    collection?: string;
    description?: string;
    main_file?: string;
    keywords?: string[];
    id?: number;
    type?: string;
    fileType?: string;
    created_at?: string;
    updated_at?: string;
    stock_id?: string;
    name?: string;
    explicit?: boolean;
    imgUrl?: string;
    releaseForm?: string[];
    location?: string;
    user?: number;
    usageType?: string;
    draft_id?: number;
    matured_content?: boolean,
    thumbnail?: string
}

export interface SignUpResponse {
  status: "success" | "error";
  message: {
    email: string[];
  };
}

export interface SignUpArgs {
  data: SignUpPayload;
  isModel: boolean;
}

export interface SignUpPayload {
  full_name: string;
  display_name: string;
  email: string;
  password: string;
  country: string;
  consent: boolean;
  web_domain: string;
}