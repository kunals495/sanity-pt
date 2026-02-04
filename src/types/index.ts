export interface Project {
  _id: string;
  title: string;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  category: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  completedDate: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  testimonialText: string;
  rating: number;
  clientImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  projectType: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
}
