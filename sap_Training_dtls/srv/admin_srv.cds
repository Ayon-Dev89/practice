using com.cg.ayon as ad from '../db/schema';

service adminService @(path : '/admin') {
    entity ModuleSRV as projection on  ad.Sap_Module;
    entity employeesSRV as projection on ad.Employees;
    entity zupskills_empSRV as projection on ad.Upskills_emp;


    // crud operation on upskilling plan
    @insertonly entity Insert_upskillsSRV as projection on ad.Upskills_emp;
    @updateonly entity Update_upskillsSRV as projection on ad.Upskills_emp;
    @deleteonly entity Delete_upskillsSRV as projection on ad.Upskills_emp;



    // @insertonly entity Insert_upskillsSRV1 as projection on ad.Upskills_emp;
    // @updateonly entity Update_upskillsSRV1 as projection on ad.Upskills_emp;
    // @deleteonly entity Delete_upskillsSRV1 as projection on ad.Upskills_emp;
}