## Instructions for Part2

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Install Docker

## Steps to get checked:

- Clone repo and checkout to the **part2** branch
- Install dependencies: **npm i**
- Create .env file (based on .env.example): ./.env 
- Build app and db images, run containers in daemon mode and run migrations: **nmp run docker:up**
- For tests: **nmp run test**

## Other commands

- For vulnerabilities scanning: **npm run docker:scan**
- For stop and remove containers - **nmp run docker:down**
- For full cleanup: **npm run docker:clean** - Be careful - this command will remove ALL images and volumes
- For build images without running - **npm run docker:build**

## A few important notes

- The application container runs in hot-reload mode - you can change the source code in the local ./src folder and the application in the container will restart automatically.
- All migrations are done locally
- If you want to change application or database port settings first stop and remove containers - **nmp run docker:down**, make changes in **.env** file and then start again **nmp run docker:up**  
- You can see the result (running containers and their output) in Docker Desktop. If you want to see the application running in a local terminal, use **nmp run docker:up:local**, but then you will need a second terminal window to run the tests

- If during startup or testing you see error messages such as
```
Error: Connection terminated unexpectedly
Exceeded timeout of 5000 ms for a test
dependency failed to start: container db is unhealthy
```
or something similar, it is most likely that your hardware is not coping with the load. Try restarting everything by stopping all non-test related applications :) 

- You can see the images in the public repo at https://hub.docker.com/repositories/edumgtk2020
If you want to use them for testing, uncomment lines 5 and 23 in the docker-compose file - then the images will be downloaded from Docker Hub at startup instead of being built locally. 


