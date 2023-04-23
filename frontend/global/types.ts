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