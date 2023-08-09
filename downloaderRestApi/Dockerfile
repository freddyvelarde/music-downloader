FROM python:3.11.4-alpine

WORKDIR /app

COPY requirements.txt .

RUN apk add --no-cache ffmpeg
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=server.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 7676

CMD [ "python3", "server.py" ]
