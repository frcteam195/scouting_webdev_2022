export class Types {
    AnalysisTypeID: number;
    AnalysisType: string;
    SortOrder: number;
    Description: string;

constructor(AnalysisTypeID: number,
    AnalysisType: string,
    SortOrder: number,
    Description: string ){
    this.AnalysisTypeID=AnalysisTypeID;
    this.AnalysisType=AnalysisType;
    this.SortOrder=SortOrder;
    this.Description=Description;
}}
