FROM python:3.8

RUN apt-get update && apt-get install -y

RUN pip install --upgrade pip
RUN pip install chatterbot flask

WORKDIR /
COPY . .

ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

ENV PYTHONUNBUFFERED 1
CMD ["flask", "run"]
