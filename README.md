# Secure CI/CD Pipeline with Shift-Left Security Scanning

## Overview

This project demonstrates how to build a **secure CI/CD pipeline** by integrating security checks early in the software development lifecycle (Shift-Left Security). The pipeline automatically scans source code, dependencies, Docker images, and secrets before deployment, ensuring that vulnerable code never reaches production.

The project uses GitHub Actions as the CI/CD platform and integrates multiple industry-standard security tools.

## Objectives

- Perform Static Application Security Testing (SAST)
- Detect hardcoded secrets
- Scan project dependencies for known vulnerabilities
- Scan Docker images for OS and package vulnerabilities
- Fail the pipeline when HIGH or CRITICAL vulnerabilities are detected
- Generate security reports for every commit
- Provide centralized security insights through SonarQube

---

## Architecture

```
                Developer
                    │
                Git Push
                    │
                    ▼
            GitHub Actions
                    │
    ┌───────────────────────────────┐
    │ Install Dependencies          │
    │ Run Unit Tests                │
    │ SonarQube Scan                │
    │ Semgrep Scan                  │
    │ Gitleaks Scan                 │
    │ Trivy Dependency Scan         │
    │ Build Docker Image            │
    │ Trivy Image Scan              │
    │ Upload Reports                │
    │ Deploy (If Successful)        │
    └───────────────────────────────┘
                    │
                    ▼
           SonarQube Dashboard
```

---

# Technology Stack

- GitHub Actions
- Node.js
- Docker
- SonarQube
- Semgrep
- Trivy
- Gitleaks

---

# Security Tools

| Tool | Purpose |
|------|---------|
| SonarQube | Static Application Security Testing (SAST) |
| Semgrep | Static Code Analysis |
| Gitleaks | Secret Detection |
| Trivy | Dependency & Docker Image Scanning |
| GitHub Actions | CI/CD Automation |

---

# Project Structure

```
secure-cicd-demo/
│
├── .github/
│   └── workflows/
│       └── security.yml
│
├── app.js
├── Dockerfile
├── package.json
├── sonar-project.properties
├── README.md
└── .gitignore
```

---

# Pipeline Workflow

## 1. Checkout Repository

The workflow begins by checking out the latest source code.

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Run Unit Tests

```bash
npm test
```

---

## 4. Static Application Security Testing (SAST)

### SonarQube

The project is analyzed for:

- Security vulnerabilities
- Code smells
- Bugs
- Code duplication
- Maintainability
- Coverage

---

### Semgrep

Semgrep scans the source code for insecure coding patterns such as:

- SQL Injection
- Command Injection
- XSS
- Unsafe eval()
- Insecure APIs

---

## 5. Secret Detection

Gitleaks scans the repository for:

- AWS Keys
- Azure Credentials
- GitHub Tokens
- API Keys
- Passwords
- Private Keys

Example:

```javascript
const password = "admin123";
```

This will be reported as a potential secret.

---

## 6. Dependency Scanning

Trivy scans:

- npm packages
- package-lock.json
- OS packages

Example output:

```
express 4.17.1

HIGH

CVE-2022-24999
```

---

## 7. Docker Image Scan

After building the image:

```bash
docker build -t secure-demo .
```

Trivy scans the Docker image for:

- Operating System vulnerabilities
- Installed package vulnerabilities
- Misconfigurations

---

## 8. Pipeline Failure

The workflow automatically fails whenever HIGH or CRITICAL vulnerabilities are found.

Example:

```
HIGH Vulnerability Found

Pipeline Failed
```

Deployment is blocked until issues are resolved.

---

## SonarQube Dashboard

SonarQube provides:

- Vulnerabilities
- Security Hotspots
- Code Smells
- Bugs
- Code Coverage
- Duplications
- Quality Gate Status

---

## GitHub Actions Workflow

The workflow performs the following steps:

1. Checkout Repository
2. Install Dependencies
3. Run Tests
4. SonarQube Scan
5. Semgrep Scan
6. Gitleaks Scan
7. Trivy Dependency Scan
8. Build Docker Image
9. Trivy Image Scan
10. Upload Reports
11. Deploy (Only if all checks pass)

---

# Running Locally

Clone the repository.

```bash
git clone https://github.com/yourusername/secure-cicd-demo.git
```

Move into the project.

```bash
cd secure-cicd-demo
```

Install dependencies.

```bash
npm install
```

Start the application.

```bash
npm start
```

---

# Running SonarQube

Start SonarQube using Docker.

```bash
docker run -d \
--name sonarqube \
-p 9000:9000 \
sonarqube:lts-community
```

Open:

```
http://localhost:9000
```

Generate a token and add it as a GitHub Secret.

---

# GitHub Secrets

The repository requires the following secrets:

```
SONAR_TOKEN

SONAR_HOST_URL

SNYK_TOKEN
```

---

# Expected Results

A successful pipeline should:

- Pass unit tests
- Detect insecure code
- Detect leaked secrets
- Detect vulnerable dependencies
- Detect vulnerable Docker images
- Upload security reports
- Pass the Sonar Quality Gate
- Proceed to deployment only if no blocking issues are found

---

# Future Improvements

- Add CodeQL scanning
- Add OWASP Dependency Check
- Add Slack notifications
- Generate SBOM (Software Bill of Materials)
- Add Infrastructure as Code (IaC) scanning with Checkov
- Add Kubernetes manifest scanning
- Integrate Microsoft Teams notifications
- Deploy automatically after security approval

---

# Learning Outcomes

After completing this project, you will understand:

- DevSecOps principles
- Shift-Left Security
- Static Application Security Testing (SAST)
- Secret Detection
- Dependency Vulnerability Management
- Docker Security
- GitHub Actions
- Secure CI/CD Pipeline Design
- Security Gates
- Automated Security Testing

---

## Author

Your Name

Cloud & DevSecOps Engineer
