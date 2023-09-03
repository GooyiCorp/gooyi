FROM ubuntu:20.04

# Install Python 3 and pip
RUN apt update && apt install -y python3 python3-pip
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive
ENV db_user = postgres
ENV db_host = 'localhost'
ENV db_port = '5432'
ENV db_database = 'gutchein'
ENV db_password = 'postgres'
ENV MAIL_USER = 'thanhoilathanh482@gmail.com'
ENV MAIL_PASSWORD = 'xrudhtrxnlvlxxrj'
ENV MAIL_HOST = 'smtp.gmail.com'

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN apt clean 
COPY . .
RUN chmod +x ./entrypoint.sh
EXPOSE 8000
RUN ./entrypoint.sh

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]