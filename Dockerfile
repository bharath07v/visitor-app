#base image
FROM node:latest

#copy build files
WORKDIR /usr/visitorapp
COPY ./package.json ./
RUN npm install
COPY ./ ./
#start up command
CMD [ "npm","start" ]