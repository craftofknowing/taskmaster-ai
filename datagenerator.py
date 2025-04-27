# Using Faker and random
from faker import Faker
fake = Faker()

def generate_employees(num=10):
    return [{
        'name': fake.name(),
        'role': fake.job(),
        'skills': random.sample(['Python', 'Project Mgmt', 'Data Analysis'], 2)
    } for _ in range(num)]

def generate_tasks(num=20):
    return [{
        'title': fake.bs(),
        'description': fake.text(),
        'due_date': fake.date_this_year(),
        'complexity': random.randint(1,5)
    } for _ in range(num)]

