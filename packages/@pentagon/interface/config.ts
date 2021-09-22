export interface configFeatures {
  title: string;
  content: string;
}

export interface configHref {
  message: string;
  href: string;
}

export interface config {
  global: {
    name: string;
    description: string;
    homepage: string;
    features: configFeatures[];
    madeBy: string;
  };
  content: {
    startMessage: string;
    startBtn: configHref;
  };
  naviBar: configHref[];
  posts: string[];
}
