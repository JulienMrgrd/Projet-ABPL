[![sonar-quality-gate][sonar-quality-gate]][sonar-url] [![sonar-coverage][sonar-coverage]][sonar-url] [![sonar-vulnerabilities][sonar-vulnerabilities]][sonar-url]

# ProjetABPL

Plateforme en ligne (*toujours en développement*) permettant la révision et certification de bonnes pratiques en laboratoire.
Projet-ABPL propose : 
- Des **fiches de révisions** par catégories
- Des **quiz d'entraînement** par catégories (pictogrames, déchets, sécurité, ...)
- Un quiz de **test blanc**

En WIP :
- Page d'examen, activable par un utilisateur de type **professeur**, **admin**, ...
- Sauvegardes, brouillons, statistiques, données sur les quiz/test/examens par utilisateur.
- Pouvoir délivrer une réelle certification d'Etat.

---------------------------------------------------------------------
### Framework
This application was generated using JHipster 5.6.1, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v5.6.1](https://www.jhipster.tech/documentation-archive/v5.6.1).

#### -> Hosted on Heroku : https://projet-abpl.herokuapp.com

### Development

To start your application in the dev profile, simply run:

    ./mvnw

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].


### Building for production

To optimize the ProjetABPL application for production, run:

    ./mvnw -Pprod clean package

To ensure everything worked, run:

    java -jar target/*.war

Refer to [Using JHipster in production][] for more details.

[sonar-url]: https://sonarcloud.io/dashboard?id=projet-abpl
[sonar-quality-gate]: https://sonarcloud.io/api/project_badges/measure?project=projet-abpl&metric=alert_status
[sonar-coverage]: https://sonarcloud.io/api/project_badges/measure?project=projet-abpl&metric=coverage
[sonar-vulnerabilities]: https://sonarcloud.io/api/project_badges/measure?project=projet-abpl&metric=vulnerabilities
