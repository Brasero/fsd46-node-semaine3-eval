# Comment lancer le projet

>1. Démarrer docker 
>2. En se placant dans le dossier `api` lancer la commande `npm run db:pull`
>3. Puis la commande `npm run db:mount`
>4. Et la commande `npm run db:seed` (À ne lancer qu'une seule fois)
>5. Enfin une fois ces étapes réalisée, il suffira d'utiliser la commande `npm run db:start` pour démarrer mongoDB et `npm run db:stop` pour l'arrêter
>6. Avec mongoDB de démarré, dans le dossier `api` , lancez la commande `npm run dev` pour démarrer l'api.
>7. Dans le dossier `app` lancez la commande `npm run dev` pour lancer l'application

> P.S. : Il est possible de lancer le projet sans Docker avec une installation locale de MongoDB, au quelle cas vous pouvez commencer par l'étape 4 une fois mongoDB lancé

> P.P.S : accès à l'éspace admin : 
>> E-mail : admin@fabrictout.fr
>
>> Mot de passe : Fabrictout@! (sensible à la casse)

RDV sur http://localhost:5173