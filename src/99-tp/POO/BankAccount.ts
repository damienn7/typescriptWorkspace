import { Transaction } from "./Transaction";
import { TransactionType } from "./TransactionType.enum";
import { FormatHistoryType } from "./FormatHistoryType.enum";
class BankAccount {
    protected balance: number;

    protected history: Transaction[];
    constructor(balance: number, history: Transaction[] | undefined = undefined) {
        this.balance = balance;
        if (history != undefined) {
            this.history = history;
            return;
        }
        this.history = [new Transaction(balance, TransactionType.DEPOT, Date.now())];
        return;
    }

    getBalance(): number {
        return this.balance;
    }

    setBalance(balance: number): void {
        this.balance = balance;
    }

    deposit(montant: number): void {
        this.balance = this.balance + montant;
        this.addTransactionToHistory(new Transaction(montant, TransactionType.DEPOT, Date.now()));
    }
    
    addTransactionToHistory(transaction: Transaction): void {
        this.history = [...this.history, transaction];
    }

    displayHistory(format: FormatHistoryType): string {
        return this.history.map((transaction: Transaction) => {
            if (format == FormatHistoryType.DETAIL) {
                return `${new Date(transaction.getDate()).toISOString()}, Type: ${transaction.getType()}, Montant: ${transaction.getMontant()}`;
            } else if (format == FormatHistoryType.SIMPLIFY) {
                let date = new Date(transaction.getDate()).toISOString().split('T');
                return `${date[2]}/${date[1]}/${date[0]} - D${transaction.getMontant()}€`;
            }
        }).join();
    }
}

export { BankAccount } ;