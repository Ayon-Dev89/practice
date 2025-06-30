namespace com.sap.school;
using {managed} from '@sap/cds/common';

type marks: Integer;
type address : String(200);
entity Students :managed {
    key ID: String(20);
    first_name: String(60);
    last_name: String(60);
    Age: Integer;
    Class: String(20);
    Roll_No: Integer;
    Contact: String(50);
    Email: String(100);
    Address: address;
 
    subjects : Composition of many Subjects on subjects.student_ID = ID;


}

entity Subjects{
    key ID : String(20);
    Science: marks;
    Maths: marks;
    English: marks;
    History: marks;
    Hindi: marks;
    Computer: marks;
    totalMarks: Integer @cds.persistence.skip;  
    percentage: String @cds.persistence.skip; 
    student_ID: String(20);
    student: Association to Students on student_ID = ID;




}

















