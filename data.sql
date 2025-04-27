-- Employees
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(50),
    skills TEXT[]
);

-- Tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    status VARCHAR(20) DEFAULT 'TODO',
    due_date DATE,
    complexity INTEGER
);

-- Assignments
CREATE TABLE assignments (
    task_id INTEGER REFERENCES tasks(id),
    employee_id INTEGER REFERENCES employees(id),
    feedback TEXT
);

