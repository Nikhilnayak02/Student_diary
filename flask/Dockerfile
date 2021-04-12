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

# RUN pip3 install itsdangerous==1.1.0
# RUN pip3 install Jinja2==2.11.3
# RUN pip3 install MarkupSafe==1.1.1
# RUN pip3 install Flask==1.1.2
# RUN pip3 install Flask-Cors==3.0.10
# RUN pip3 install flask-marshmallow==0.14.0
# RUN pip3 install greenlet==1.0.0
# RUN pip3 install Flask-SQLAlchemy==2.5.1


# RUN pip3 install marshmallow==3.11.1
# RUN pip3 install marshmallow-sqlalchemy==0.24.2
# RUN pip3 install six==1.15.0
# RUN pip3 install SQLAlchemy==1.4.4
# RUN pip3 install Werkzeug==1.0.1
# EXPOSE 5000
CMD ["uwsgi", "app.ini"]


# EXPOSE 5000

# ENTRYPOINT ["python3"]
# CMD ["app.py"]