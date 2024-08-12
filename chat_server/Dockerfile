FROM python:3.9

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    curl \
    xz-utils \
    file \
    git \
    mecab \
    libmecab-dev \
    mecab-ipadic

RUN pip install --upgrade pip
RUN git clone  https://github.com/feignbird/ChatterBot-spacy_fixed
RUN pip install ./ChatterBot-spacy_fixed
RUN pip install chatterbot-corpus
RUN pip uninstall pyYAML
RUN pip install pyYAML==5.3.1
RUN pip install flask
RUN pip install mecab-python3


WORKDIR /
COPY . .

ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

ENV PYTHONUNBUFFERED 1
CMD ["flask", "run"]
