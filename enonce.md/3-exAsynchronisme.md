# Callback / Promises

## URL = esgiprofnodexnk988qs-node-test-api.functions.fnc.fr-par.scw.cloud

## Step 1 faire une requête réseau avec une promise chain

- faire une requête get avec une promise chain et affiché son résultat avec l'url `{URL}/api/v1/random-delay?start=1&end=8`
- vous pouvez vous aidez d'outil tel que Postman ou Curl
- niveau lib je vous conseil `axios` ou `fetch`
- attention à la gestion d'erreur
- la réponse sera de la forme pour 
    - un succès
        ```ts
        {
            time: string,
            sentence: string
        }
        ```
    -  une erreur
        ```ts
        {
            error: string
        }
        ```

## Step 2 faire une requête réseau avec une promise async / await 

- faire une requête get avec les Promise avec async await et affiché son résultat TOUJOURS AVEC LE MÊME URL QUE LE STEP 1
- vous pouvez vous aidez d'outil tel que Postman, curl...
- niveau lib je vous conseil `axios` ou `fetch`

## Step 3 plus compliqué avec async / await

- une première requête avec toujours le même url
    - si il y'a pas d'erreur faire une requête POST vers `{URL}/api/v1/shuffle-sentence` avec en body de la requête le résultat `sentence`
        retour de `{URL}/api/v1/shuffle-sentence` -> `{"sentence_shuffled": "string"}`
        - si il n'y a toujours pas d'erreur faire une requête POST vers `{URL}/api/v1/remove-carrac` avec en body le résultat `sentence_shuffled`de la première requête. La nouvelle requête devra avoir un body de la forme: `{ sentence: string }`
        retour `{"sentence_removed": "string"}`
    - dans tous les cas print le temps qu'a pris l'ensemble des requêtes en secondes