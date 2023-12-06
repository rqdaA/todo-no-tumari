FROM ubuntu:22.04 as builder
WORKDIR /app
RUN apt update \
    && apt install -y curl unzip \
    && curl -fsSL https://bun.sh/install | bash
COPY ./bun.lockb ./tsconfig.json ./package*.json .
RUN PATH="$PATH:/root/.bun/bin" bun install 
COPY ./src ./public 
RUN PATH="$PATH:/root/.bun/bin" bun build ./src/index.tsx --outdir ./build --minify

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/
