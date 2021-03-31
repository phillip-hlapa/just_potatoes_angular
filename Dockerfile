FROM node as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN ls -al /app

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration
#RUN npm run build --prod

# Stage 2
FROM nginx

COPY --from=build-stage /app/dist/out /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80



#FROM node:15.11.0-alpine3.10 as build-stage
#
#WORKDIR /app
#
#COPY package*.json /app/
#
#RUN npm install
#
#COPY ./ /app/
#
#RUN ls -al /app
#
#ARG configuration=production
#
#RUN npm run build -- --output-path=./dist/out --configuration $configuration
#RUN npm run build --prod

# Stage 2
#FROM nginx

#COPY --from=build-stage /app/dist/out /usr/share/nginx/html

#COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80
