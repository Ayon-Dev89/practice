using com.cg.ayon as sh from '../db/schema';

service ShivamService @(path : '/admin') {
  entity People      as projection on sh.people  ;
  entity Bank        as projection on sh.Bank;
  entity Transaction as projection on sh.Transaction;
}