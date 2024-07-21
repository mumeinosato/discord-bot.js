FROM python:3.10

RUN apt-get update && apt-get install -y

RUN pip install pytz cython
RUN pip install spacy
RUN pip install --upgrade pip
RUN pip install chatterbot
RUN pip install flask

WORKDIR /
COPY . .

ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

ENV PYTHONUNBUFFERED 1
CMD ["flask", "run"]
