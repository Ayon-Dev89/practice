using {com.sap.bookshop as db} from '../db/schema';

service BookShopService @(impl:'./schema_srv.js',requires:['admin','system-user']) 
{    @odata.draft.enabled
    entity Books      as projection on db.Books;
    entity Authors    as projection on db.Authors;
    entity Reviews    as projection on db.Reviews;
    entity Publishers as projection on db.Publishers;
    action  rateBook(bookID : Integer, rating : Integer) returns Books;
    function getPopularBook() returns Books;

}
service CustomerService @(requires:['admin''customer']){
    @readonly
    entity Books      as projection on db.Books;

    @readonly
    entity Authors     as projection on db.Authors;

    entity Reviews     as projection on db.Reviews;
     @readonly
    entity Publishers  as projection on db.Publishers;

}
