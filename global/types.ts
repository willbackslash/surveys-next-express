interface CustomProfile {
    sub?: string
    name?: string
    email?: string
    image?: string
    id?: number
    groups?: string[]
}

interface CustomSession {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      id?: string | null
      groups?: string[] | null
    }
    expires: string
  }

interface CustomJWT {
    name?: string | null
    email?: string | null
    picture?: string | null
    sub?: string
    groups?: string[] | null
}

interface SurveyData {
    id?: number;
    name: string;
    description: string;
    options: Option[];
}
  
interface Option {
    index: number;
    name: string;
}

interface OptionCreate {
    create: Option[]
}

interface SurveyCreate {
    name: string;
    description: string;
    options: OptionCreate;
}