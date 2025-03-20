# Exercices TypeScript sur les Tableaux

Ces exercices sont conçus pour pratiquer l'utilisation des tableaux en TypeScript.

## Exercice 1 : Affichage des Éléments d'un Tableau

**Description :** Écrivez un programme qui affiche chaque élément du tableau.

**Exemple de tableau :** `[1, 2, 3, 4, 5]`

## Exercice 2 : Calcul de la Somme

**Description :** Calculer la somme des éléments d'un tableau de nombres.

**Exemple de tableau :** `[10, 20, 30, 40, 50]`

## Exercice 3 : Trouver le Maximum

**Description :** Écrivez un programme pour trouver l'élément le plus grand dans un tableau de nombres.

**Exemple de tableau :** `[5, 7, 2, 9, 3]`

## Exercice 4 : Conversion des Éléments

**Description :** Faites un programme pour convertir tous les éléments d'un tableau de nombres en leur double.

**Exemple de tableau :** `[1, 2, 3, 4, 5]`

**Attendu :** `[2, 4, 6, 8, 10]`

## Exercice 5 : Filtrage de Tableau

**Description :** Écrivez un programme pour filtrer un tableau de nombres, ne conservant que les éléments qui sont supérieurs à un certain seuil.

**Exemple de tableau :** `[2, 5, 8, 1, 10]`
**Seuil :** `5`

**Attendu :** `[8, 10]`

## Exercice 6 : Concaténation de Chaînes

**Description :** Écrivez un programme pour concaténer les éléments d'un tableau de chaînes de caractères.

**Exemple de tableau :** `["Type", "Script", "Est", "Amusant"]`

**Attendu :** `"TypeScriptEstAmusant"`

## Exercice 7 : Création d'un Objet

**Description :** Écrivez un programme qui transforme un tableau de paires clé/valeur en un objet.

**Exemple de tableau :** `[["nom", "Alice"], ["âge", "25"], ["ville", "Paris"]]`

**Attendu :** `{ nom: "Alice", âge: "25", ville: "Paris" }`

## Exercice 8 : GroupBy avec Reduce

**Objectif :** Créer une fonction `groupBy` en TypeScript qui utilise `reduce` pour regrouper les éléments d'un tableau par une propriété spécifique.

**Description :** Implémentez `groupBy` pour qu'elle prenne un tableau d'objets et une clé, et retourne un objet groupant les éléments par la valeur de la clé donnée.

**Exemple :**
```typescript
groupBy([{ nom: "Pomme", type: "Fruit" }, { nom: "Melon", type: "Fruit" }, { nom: "Carotte", type: "Légume" }, { nom: "Courgette", type: "Légume" }], "type");
```

**Attendu :**  {"Fruit" => [{"nom": "Pomme","type": "Fruit"}, {"nom": "Melon","type": "Fruit"}], "Légume" =>[{"nom": "Carotte","type": "Légume"}, {"nom": "Courgette","type": "Légume"}]} 

