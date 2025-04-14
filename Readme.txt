#Calculator Microservice

A simple Node.js and Express-based calculator microservice supporting basic arithmetic operations, with robust logging using Winston and containerization via Docker and Docker Compose.

---

##Features

- Addition, Subtraction, Multiplication, Division
- Exponentiation (Power)
- Square Root
- Modulo Operation
- Error handling with HTTP status codes
- Winston logging (Console & File-based logs)
- Dockerized & Docker Compose-ready
- Health check endpoint for container stability

---

## API Endpoints

All operations accept query parameters (`num1` and `num2`) via HTTP GET requests:

| Endpoint      | Description                         | Example                                 |
|---------------|-------------------------------------|-----------------------------------------|
| `/add`        | Add two numbers                     | `/add?num1=5&num2=3`                     |
| `/subtract`   | Subtract second number from first   | `/subtract?num1=10&num2=4`              |
| `/multiply`   | Multiply two numbers                | `/multiply?num1=6&num2=7`               |
| `/divide`     | Divide first number by second       | `/divide?num1=20&num2=5`                |
| `/power`      | Exponentiation (num1 ^ num2)        | `/power?num1=2&num2=4`                  |
| `/sqrt`       | Square root of a number             | `/sqrt?num1=16`                         |
| `/modulo`     | Modulo (num1 % num2)                | `/modulo?num1=10&num2=3`                |

---

## Error Handling

- Returns `400 Bad Request` for invalid or missing parameters.
- Division by zero and square root of negative numbers are handled gracefully.

---

##Logging

Logs are handled by **Winston** and stored in the `logs/` directory:

- `error.log`: Logs errors
- `combined.log`: Logs all activity
- Console logging with simplified format

---

## Docker Usage

### Prerequisites

- Docker
- Docker Compose

### Build and Run with Docker Compose

```bash
docker-compose up --build



##To deploy the calculator microservice on a Kubernetes cluster:

Push your Docker image to Docker Hub

Tag your image and push it:

docker tag cals yourdockerhubusername/cals:latest
docker push yourdockerhubusername/cals:latest
Create Kubernetes configuration files

deployment.yaml: Defines the deployment with your Docker image and container port.

service.yaml: Exposes the service using a LoadBalancer or NodePort for external access.

Apply the configuration

Run the following commands:

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
Verify the deployment


Check if the pod is running:

kubectl get pods


Check the service and access URL:

kubectl get services

Open the application in your browser using:

http://localhost:<NodePort>



##Kubernetes Deployment Instructions
This project is containerized and can be deployed on a Kubernetes cluster. Follow these steps to deploy the application:

Step 1: Build the Docker Image
docker build -t newcal .

Step 2: Tag the Image for Docker Hub
Replace tomin55 with your Docker Hub username if different.
docker tag newcal tomin55/newcal:latest

Step 3: Push the Image to Docker Hub
docker push tomin55/newcal:latest

Step 4: Update Deployment YAML
In your deployment.yaml file, set the image field:

containers:
  - name: calculator
    image: tomin55/newcal:latest
    ports:
      - containerPort: 8080

Step 5: Apply Kubernetes Configurations
Apply your deployment and service configuration files:
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

Step 6: Access the Application
If running locally with Docker Desktop, use:
kubectl port-forward service/calculator-service 9090:8080
Then open:
👉 http://localhost:9090

This will load the frontend index.html interface and allow direct interactions with the calculator microservice.
