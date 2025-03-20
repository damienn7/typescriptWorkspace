import { Transaction } from "./Transaction";
import { TransactionType } from "./TransactionType.enum";
import { BankAccount } from "./BankAccount";
class RegularBankAccount extends BankAccount {

    transfer(otherAccount: BankAccount, montant: number): void {
        this.withdraw(montant);
        otherAccount.deposit(montant);
    }
    
    withdraw(montant: number): void {
        this.balance = this.balance - montant;
        this.addTransactionToHistory(new Transaction(montant, TransactionType.RETRAIT, Date.now()));
    }
}

export { RegularBankAccount } ;