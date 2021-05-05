
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}
  
interface CourseNormalSubmissionPart extends CoursePartBase {
    description: string;
}
  
  interface CourseNormalPart extends CourseNormalSubmissionPart {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends CourseNormalSubmissionPart {
    type: "submission";
    exerciseSubmissionLink: string;
  }
  
  interface CourseRequirement extends CourseNormalSubmissionPart {
    type: "special";
    requirements: string[];
  }
  
export type CoursePart = 
        CourseNormalPart | 
       CourseProjectPart | 
    CourseSubmissionPart | 
        CourseRequirement;
  
