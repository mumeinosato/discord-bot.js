FROM python:3.8

RUN apt-get update && apt-get install -y

RUN pip install pytz cython
RUN pip install spacy==2.3.5
RUN pip install --upgrade pip
RUN pip install chatterbot
RUN pip install flask

WORKDIR /
COPY . .

ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

ENV PYTHONUNBUFFERED 1
CMD ["flask", "run"]
