namespace com.cg.ayon;
using { cuid , managed } from '@sap/cds/common';

entity people : managed{
    key email : String @assert.format: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' @mandatory @assert.unique ;
    First_name : String @assert.format: '^[a-zA-Z]+$';
    Last_name : String @assert.format: '^[a-zA-Z]+$';
    name : String = (First_name || ' ' || Last_name) stored;
    gender : String; //  @assert.range  enum { Male; Female; Other; };
    mobile : String; //@assert.format: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
    Address : String;
    City : String;
    State : String; 
    Postal_code : String;
    Dob : Date;
    SSN : String;
    Password : String; // @mandatory @assert.format: '^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$';
    createdBy : String = (First_name || ' ' || Last_name) stored ;
    modifiedBy : String = (First_name || ' ' || Last_name) stored ;
}

entity Bank :cuid , managed {
    email : String @mandatory;
    bank_name : String;
    card_number : String(16) @mandatory;
    expire_date : Date @mandatory;
    amount : Decimal(16,2) default 0.00;
}

entity Transaction:cuid , managed {
    email : String @mandatory;
    bank_name : String;
    card_number : String(16) @mandatory;
    transaction : String;
    amount : Decimal(16,2);
    status : String;
    category : String;
    message : String;
    recipant_bank_number : String(16) @mandatory;
}