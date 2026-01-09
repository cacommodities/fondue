FROM public.ecr.aws/docker/library/node:22-alpine as build
RUN npm config set @cac:registry "http://codeartifact-proxy.backends.cacom.dk/npm"
ARG VERSION
ENV VITE_APP_BUILD_VERSION=$VERSION

WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . /app
RUN npm run build

FROM public.ecr.aws/docker/library/nginx:1.21.6-alpine
ARG VERSION
ENV VITE_APP_BUILD_VERSION=$VERSION
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80