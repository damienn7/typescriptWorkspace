# Step 1

La classe `BankAccount` doit avoir des méthodes pour `deposit` (ajouter de l'argent), `withdraw` (retirer de l'argent) et `displayHistory`, qui montre toutes les transactions effectuées.
Elle devra aussi avoir un propriété `balance` qui enregistra le montant présent dans le compte.

# Step 2

Chaque dépôt ou retrait est une `transaction`. Une classe `Transaction` pourrait être utile pour enregistrer la date, le montant et le type de transaction (dépôt ou retrait).

## Transaction business

Le compte ne doit pas permettre un retrait qui entraînerait un solde négatif.
Les montants de dépôt et de retrait doivent être positifs.

# Step 3

La méthode `displayHistory` doit imprimer l'historique des transactions dans un format lisible, indiquant les dates, les montants et le solde courant après chaque transaction.
```
Wed Jan 31 2024 18:13:48 GMT+0100 (Central European Standard Time) - dépôt: 100
```

# Step 4

La méthode `displayHistory` devra maintenant être capable d'afficher l'historique dans deux autres format:
```
Date: 2024-01-30T12:45:00.000Z, Type: dépôt, Montant: 100
```
et :

```
1/30/2024 - D100€
```

# Step 5

Il va maintenant être possible pour vos compte d'effectuer un transfer d'un compte à un autre.
Créé pour cela une fonction `transfer` qui permettra de transmettre de l'argent d'un compte à un autre.


# Step 6 

Ajouter une class `YoungBankAccount`, elle réagit comme un bank account sauf qu'il est impossible de faire un transfer ou de retirer de l'argent
