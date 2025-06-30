using {com.sap.school as db} from '../db/school';

service SchoolService @(impl:'./school_srv.js') {
    @odata.draft.enabled
    entity Students as projection on db.Students;

    entity Subjects as projection on db.Subjects;
    function getHighestMarks() returns Subjects;
}

service StudentService @(impl:'./school_srv.js') {
    @readonly
    entity Students as projection on db.Students;
    @readonly
    entity Subjects as projection on db.Subjects;
    function getHighestMarks() returns Subjects;
}
