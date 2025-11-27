using com.ayon.excel as my from '../db/schema';

service AdminService @(path : '/admin') {
 entity Records as projection on my.Records;
}

