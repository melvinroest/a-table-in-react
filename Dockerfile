# pull official base image
FROM node:12.21.0-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN yarn global add react-scripts@3.4.1

# add app
COPY . ./

# RUN npm run build

# start app
# EXPOSE 80
# CMD ["npx", "serve", "-s", "build", "-p", "80"]
CMD ["yarn", "run", "start"]