FROM ubuntu:20.04

# Install Python 3 and pip
RUN apt update && apt install -y python3 python3-pip
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive 
WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get install nginx -y
RUN apt clean 
COPY . .
# RUN python3 manage.py migrate
EXPOSE 8000

CMD ["gunicorn", "server.wsgi:application", "--bind", "0.0.0.0:8000"]