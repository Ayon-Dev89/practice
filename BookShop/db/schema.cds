namespace com.sap.bookshop;
using {Language,Currency,managed} from '@sap/cds/common';

type ISBN: String(15);
type Amount : Decimal(9,2);
entity Books :managed {
    key B_ID: String(20);
    title: String(60);
    author: Association to Authors;
    isbn : ISBN;
    stock:Integer;
    amount:Amount;
    price: Currency;
    discount: Integer;
    publisher: Association to Publishers;
    Language: Language;
    reviews: Composition of many Reviews on reviews.book = $self;
}

entity Authors{
    key A_ID : String(20);
    authorName: String(60);
    address:String(50); 
    pincode : Int64;
    books: Composition of many Books on books.author = $self;

// books : Association to Books ;
// books : Composition of one Books;
}
entity Publishers :  managed {
 key P_ID      : String(20);
  name         : String(100);
  location     : String(100);
  books        : Association to many Books on books.publisher = $self;
}

// Reviews
entity Reviews :  managed {
 key R_ID      : String(20);
  rating       : Integer;
  comment      : String(100);
  reviewer     : String(100);
  book         : Association to Books;
}
















