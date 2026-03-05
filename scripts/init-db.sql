CREATE DATABASE IF NOT EXISTS smartrh;
USE smartrh;
CREATE TABLE IF NOT EXISTS grades (
    id_grade INT AUTO_INCREMENT PRIMARY KEY,
    grade_name VARCHAR(100) NOT NULL,
    description TEXT,
    salary_base DECIMAL(10, 2) NOT NULL,
    bonus DECIMAL(10, 2) NOT NULL
);
CREATE TABLE IF NOT EXISTS employees (
    id_emp INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_birth DATE NOT NULL,
    date_hire DATE NOT NULL,
    grade_id INT NOT NULL,
    manager_id INT NULL,
    salary_base DECIMAL(10, 2) NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    FOREIGN KEY (grade_id) REFERENCES grades(id_grade),
    FOREIGN KEY (manager_id) REFERENCES employees(id_emp)
);
CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Employee', 'Manager', 'HR') NOT NULL,
    emp_id INT NOT NULL,
    FOREIGN KEY (emp_id) REFERENCES employees(id_emp)
);
CREATE TABLE IF NOT EXISTS bulletins_paie (
    id_bulletin INT AUTO_INCREMENT PRIMARY KEY,
    emp_id INT NOT NULL,
    mois INT NOT NULL,
    annee INT NOT NULL,
    salaire_brut DECIMAL(10, 2) NOT NULL,
    cotisations DECIMAL(10, 2) NOT NULL,
    primes DECIMAL(10, 2) NOT NULL,
    net_a_payer DECIMAL(10, 2) NOT NULL,
    date_generation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emp_id) REFERENCES employees(id_emp)
);
CREATE TABLE IF NOT EXISTS conges (
    id_conge INT AUTO_INCREMENT PRIMARY KEY,
    emp_id INT NOT NULL,
    type ENUM('Annuel', 'Maladie', 'Maternite', 'Exceptionnel') NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    statut ENUM('En attente', 'Approuve', 'Refuse') NOT NULL,
    valideur_id INT NULL,
    solde_restant DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (emp_id) REFERENCES employees(id_emp),
    FOREIGN KEY (valideur_id) REFERENCES employees(id_emp)
);
CREATE TABLE IF NOT EXISTS formations (
    id_formation INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    statut ENUM('Planifiee', 'En cours', 'Terminee') NOT NULL,
    cout DECIMAL(10, 2) NOT NULL
);
CREATE TABLE IF NOT EXISTS formation_participants (
    formation_id INT NOT NULL,
    emp_id INT NOT NULL,
    PRIMARY KEY (formation_id, emp_id),
    FOREIGN KEY (formation_id) REFERENCES formations(id_formation),
    FOREIGN KEY (emp_id) REFERENCES employees(id_emp)
);