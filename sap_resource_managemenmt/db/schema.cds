namespace com.sap.capgemini;
// using { cuid } from '@sap/cds/common';


entity Sap_Module {
  key  module : String(10);
}

entity Employees  {
  key id         : String(8) ;
  name           : String(25);
  sapmodule      : String;
  mentor         : String;
  project        : String;
  billablestatus : String;
}

define entity Upskills_emp {
  key id         : String(8) not null;
  key trainingid : String(8) not null;
  trainingname   : String;
  numberofdays   : Integer;
  startdate      : Date;
  completiondate : Date;
  status         : String;
}