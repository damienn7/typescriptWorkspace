import { v4 } from "uuid";

export class InvalidBankAccountBalance extends Error {
    constructor(message: string) {
        super(message)
    }
}

class BankAccount {
    protected id: string;
    protected transactions: Transaction[] = []
    constructor(protected balance: number) {
        if (balance < 0) {
            throw new InvalidBankAccountBalance("balance need to be upper or equal than 0");
        }
        this.id = v4();
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        this.transactions.push(new DepositTransaction(amount, TransactionType.deposit, new Date()))
    }

    displayHistory(transactionPrinter: TransactionPrinter): string {
        return transactionPrinter.display(this.transactions);
    }
}

class StandardBankAccount extends BankAccount {

    withdraw(amount: number): number {
        if (amount > this.balance) {
            throw new InvalidBankAccountBalance("balance is lower than the amount withdraw");
        }
        this.balance -= amount;
        this.transactions.push(new WithdrawTransaction(amount, TransactionType.withdraw, new Date()))
        return 0;
    }

    transfer(amount: number, bankAccount: StandardBankAccount): void {
        if (amount > this.balance) {
            throw new InvalidBankAccountBalance("balance is lower than the amount transfered");
        }
        this.balance - amount;
        this.transactions.push(new TransferTransaction(amount, TransactionType.transfer, new Date(), this.id, bankAccount.id))
        bankAccount.receiveTransfer(amount)
    }

    receiveTransfer(amount: number): void {
        bankAccount.balance += amount;
        this.transactions.push(new TransferTransaction(amount, TransactionType.transfer, new Date(), bankAccount.id, this.id))
    }
}

class YoungBankAccount extends BankAccount {

}

interface TransactionPrinter {
    display(transactions: Transaction[]): string;
}

class TransactionISOPrinter implements TransactionPrinter {
    display(transactions: Transaction[]): string {
        const result = transactions.reduce((acc, transaction) => {
            const transactionTypeFormat = this.identifyTransaction(transaction);
            return acc + `${transaction.date.toISOString()} - ${transactionTypeFormat}: ${transaction.amount}\n`
        }, "")

        return result
    }

    private identifyTransaction(transaction: Transaction): string {
        if (transaction instanceof WithdrawTransaction) return "retrait";
        if (transaction instanceof DepositTransaction) return "dépôt";
        if (transaction instanceof TransferTransaction) return "Transfer";
        return "UnknownTransaction";
    }
}


class TransactionDetailedPrinter implements TransactionPrinter {
    display(transactions: Transaction[]): string {
        const result = transactions.reduce((acc, transaction) => {
            if (transaction instanceof TransferTransaction) {
                return acc + this.displayTransfer(transaction);
            } else {
                const transactionTypeFormat = this.identifyTransaction(transaction)
                return acc + `Date: ${transaction.date.toISOString()}, Type: ${transactionTypeFormat}, Montant: ${transaction.amount}\n`
            }
        }, "")

        return result
    }

    private identifyTransaction(transaction: Transaction): string {
        if (transaction instanceof WithdrawTransaction) return "retrait";
        if (transaction instanceof DepositTransaction) return "dépôt";
        if (transaction instanceof TransferTransaction) return "Transfer";
        return "UnknownTransaction";
    }

    private displayTransfer(transaction: TransferTransaction): string {
        const transactionTypeFormat = this.identifyTransaction(transaction)
        return `Date: ${transaction.date.toISOString()}, Type: ${transactionTypeFormat},Expediteur: ${transaction.depositerId}, receiver: ${transaction.receiverId}`;
    }
}



class TransactionSimplePrinter implements TransactionPrinter {
    display(transactions: Transaction[]): string {
        const result = transactions.reduce((acc, transaction) => {
            const transactionTypeFormat = this.identifyTransaction(transaction)
            return acc + `${transaction.date.toDateString()} - ${transactionTypeFormat}${transaction.amount}€\n`
        }, "")

        return result
    }

    private identifyTransaction(transaction: Transaction): string {
        if (transaction instanceof WithdrawTransaction) return "R";
        if (transaction instanceof DepositTransaction) return "D";
        if (transaction instanceof TransferTransaction) return "T";
        return "UnknownTransaction";
    }
}

class TransactionAmountPrinter implements TransactionPrinter {
    display(transactions: Transaction[]): string {
        const result = transactions.reduce((acc, transaction) => {
            return acc + `${transaction.amount}€\n`
        }, "")

        return result
    }
}

class Transaction {
    public id: string;
    constructor(public amount: number, public transactionType: TransactionType, public date: Date) {
        this.id = v4()
    }
}

class WithdrawTransaction extends Transaction { }

class DepositTransaction extends Transaction { }

class TransferTransaction extends Transaction {
    constructor(
        public amount: number,
        public transactionType: TransactionType,
        public date: Date,
        public depositerId: string,
        public receiverId: string
    ) {
        super(amount, transactionType, date);
    }
}


// could be deleted
enum TransactionType {
    deposit = "deposit",
    withdraw = "withdraw",
    transfer = "transfer"
}

const bankAccount = new StandardBankAccount(0);

bankAccount.deposit(10);
bankAccount.deposit(20);
bankAccount.withdraw(5);

const bankAccount2 = new StandardBankAccount(10);
bankAccount.transfer(10, bankAccount2);


console.log(bankAccount.displayHistory(new TransactionDetailedPrinter()));
console.log(bankAccount.displayHistory(new TransactionISOPrinter()));
console.log(bankAccount.displayHistory(new TransactionAmountPrinter()));

console.log(bankAccount2.displayHistory(new TransactionDetailedPrinter()));