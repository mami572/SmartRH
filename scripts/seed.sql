USE smartrh;
-- Grades
INSERT INTO grades (grade_name, description, salary_base, bonus)
VALUES (
        'Junior Developer',
        'Entry level software engineer',
        35000,
        2000
    ),
    (
        'Senior Developer',
        'Experienced software engineer',
        80000,
        10000
    ),
    (
        'HR Manager',
        'Head of Human Resources',
        70000,
        5000
    );
-- Employees
INSERT INTO employees (
        first_name,
        last_name,
        date_birth,
        date_hire,
        grade_id,
        manager_id,
        salary_base,
        status,
        phone,
        address
    )
VALUES (
        'Ahmed',
        'Salem',
        '1990-05-15',
        '2022-01-10',
        2,
        NULL,
        80000,
        'Active',
        '22223333',
        'Nouakchott, TVZ'
    ),
    (
        'Mariam',
        'Mint',
        '1995-10-20',
        '2023-03-01',
        1,
        1,
        35000,
        'Active',
        '44445555',
        'Nouakchott, Ksar'
    );
-- Users (password_hash is 'password123' for demo - in real app use bcrypt)
INSERT INTO users (email, password_hash, role, emp_id)
VALUES (
        'ahmed@smartrh.mr',
        'scrypt:32768:8:1$vYv...',
        'HR',
        1
    ),
    (
        'mariam@smartrh.mr',
        'scrypt:32768:8:1$vYv...',
        'Employee',
        2
    );