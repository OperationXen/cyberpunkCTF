# cyberpunkCTF

A CTF framework built on python using django, graphql and react

## Requirements

- Python 3
- Pip

## Setup

Clone this repository, then;

```
# Install dependencies from requirements file
pip install -r requirements.txt

# Create and run database migrations
python manage.py makemigrations && python manage.py migrate
```

## Starting a server using the built in debugging server
```
# Start server on default host and port (127.0.0.1:8000)
python manage.py runserver

# Start server on custom host and port (note that port numbers < 1024 require elevated priviliges
python manage.py runserver 10.10.10.10 80
```


## User Creation

You will need to create an admin user, you can do this with the command;

```
python manage.py createsuperuser
```
Once the user has been created you can log in to the built in admin page at /admin to create and configure challenges
