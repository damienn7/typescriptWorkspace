import { TransactionType } from "./TransactionType.enum";
class Transaction {
    private date: number;

    private montant: number;

    private type: TransactionType;

    constructor(montant: number, type: TransactionType, date: number) {
        this.montant = montant;
        this.type = type;
        this.date = date;
        return;
    }

    getMontant(): number {
        return this.montant;
    }

    setMontant(montant: number): void {
        this.montant = montant;
    }

    getType(): TransactionType {
        return this.type;
    }

    setType(type: TransactionType): void {
        this.type = type;
    }

    getDate(): number {
        return this.date;
    }

    setDate(date: number): void{
        this.date = date;
    }
}

export { Transaction };