# FROM python:3.6-stretch
FROM alpine:latest

# FROM nginx:latest
RUN apk add cmd:pip3
RUN apk add build-base

RUN apk add --no-cache python3-dev libffi-dev gcc  musl-dev
# RUN pip3 --cache-dir=.pip install --upgrade pip
# RUN apk add --no-cache mysql-client
WORKDIR /app
COPY . /app

# RUN pip3 install greenlet
RUN pip3 --no-cache-dir install -r requirements.txt
RUN pip install uwsgi



CMD ["uwsgi", "app.ini"]


# EXPOSE 5000

# ENTRYPOINT ["python3"]
# CMD ["app.py"]