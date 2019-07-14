# cyberpunkCTF

A CTF framework built on python using django, graphql and react

## Requirements

- Python 3
- Pip

## Setup

Clone this repository, then;

```
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations && python manage.py migrate

# Start server
python manage.py runserver
```

Comes up on `http://127.0.0.1:8000/` by default.
