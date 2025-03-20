//exo 1
const arr = [1, 2, 3, 4, 5];

arr.map((elt) => {
    process.stdout.write(elt + " ");
});
console.log("\n");

//exo 2
const arr2 = [10, 20, 30, 40, 50];
console.log(arr2.reduce((sum, currElt) => sum + currElt));

//exo 3
const arr3 = [5, 7, 2, 9, 3];
console.log(Math.max(...arr3));

//exo 4
const arr4 = [1, 2, 3, 4, 5];
console.log(arr4.map(elt => elt * 2));

//exo 5

const arr5 = [2, 5, 8, 1, 10];
const seuil = 5;

console.log(arr5.filter(elt => elt > seuil));

//exo 6
const arr6 = ["Type", "Script", "Est", "Amusant"];
console.log(arr6.reduce((chaine, currElt) => chaine + currElt));

//exo 7
const arr7 = [["nom", "Alice"], ["âge", "25"], ["ville", "Paris"]];

console.log( arr7.reduce((acc : Record<string, string>, currElt) => {
    acc[currElt[0]] = currElt[1];
    return acc;
}, {}));