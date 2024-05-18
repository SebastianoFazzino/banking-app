# Loan Application Decision Engine

## Overview

This project is a decision engine designed to evaluate loan requests based on personal code,
loan amount, and loan period. It determines the maximum loan amount that can be approved or 
provides an alternative loan amount and period if the requested loan amount is not suitable.

## Task

Design a decision engine that:
- Takes in personal code, loan amount, and loan period in months.
- Returns a decision (positive or negative) and the approved amount.
- Finds the maximum allowed sum irrespective of the requested loan amount.
- Suggests an alternative loan period if the requested period is not suitable.
- Mocks user profile data based on predefined personal codes and segmentation.
- Supports four scenarios: debt and three segmentation cases.

## Scenarios

| Personal Code | Segmentation    | Credit Modifier |
|---------------|-----------------|-----------------|
| 49002010965   | Debt            | N/A             |
| 49002010976   | Segment 1       | 100             |
| 49002010987   | Segment 2       | 300             |
| 49002010998   | Segment 3       | 1000            |

- **Debt**: No loan is approved.
- **Segment 1**: Credit modifier is 100.
- **Segment 2**: Credit modifier is 300.
- **Segment 3**: Credit modifier is 1000.

## Constraints

- Minimum input and output sum: 2000 €
- Maximum input and output sum: 10000 €
- Minimum loan period: 12 months
- Maximum loan period: 60 months

## Scoring Algorithm

 credit score = (credit modifier / loan amount) * loan period

- Approve the loan if credit score >= 1
- Otherwise, find a suitable amount or period.

## Project Structure

The project consists of a backend and a frontend component:

- **Backend**: Java Spring Boot application.
- **Frontend**: Angular application served by Nginx.

## Backend

### Technologies

- Java 17
- Spring Boot 3.2.5
- H2 in-memory database

### Database Initialization

On startup, the backend creates a `clients` table and inserts the predefined clients.

```sql
INSERT INTO clients (personal_code, segmentation, credit_modifier) VALUES
('49002010965', 'DEBT', NULL),
('49002010976', 'SEGMENT_ONE', 100),
('49002010987', 'SEGMENT_TWO', 300),
('49002010998', 'SEGMENT_THREE', 1000);
```

## Frontend

### Technologies

- Angular 17
- Nginx
- Bootstrap
- Bootstrap Icons


### Different Development Setups

There are two ways to set up the development environment:

- Development Setup #1: Run the backend and frontend separately 
- Development Setup #2: Run the backend and frontend using Docker and Docker Compose


### Development Setup 1

1. **Clone the Repository**:
   ```bash
   git clone --depth 1 https://github.com/SebastianoFazzino/banking-app.git
   cd <repository_directory>
   ```
   
2. Install Backend Dependencies:
   ```bash
   cd banking-app-backend
   mvn clean install
   ```
   
3. **Run the Backend Server**:
   ```bash
   mvn spring-boot:run
   ```
   
   This command will compile the Spring Boot application and start a development server. 
   By default, the application will be accessible at [http://localhost:8080](http://localhost:8080).

4. **Install Frontend Dependencies**:
   ```bash
   cd banking-app-frontend
   npm install
   ```

5. **Run the Development Server**:
   ```bash
   ng serve
   ```

   This command will compile the Angular application and start a development server. 
   By default, the application will be accessible at [http://localhost:4200](http://localhost:4200).

6. **Access the Application**:
   Open your web browser and navigate to [http://localhost:4200](http://localhost:4200) to access the frontend application.


## Required Tools
Ensure you have the following tools installed on your machine:

- Git
- Java Development Kit (JDK) 17
- Maven
- Node.js and npm
- Angular CLI


### Development Setup 2: Docker and Docker Compose

1. **Clone the Repository**:
    ```bash
    git clone --depth 1 https://github.com/SebastianoFazzino/banking-app.git
    cd <repository_directory>
    ```

2. **Build and Run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```

   This command will build and start the Docker containers defined in the `docker-compose.yml` file.

   - The `backend` service is built from the Dockerfile in the `./banking-app-backend` directory, which compiles the Spring Boot application and runs it on port 8080.
   - The `frontend` service is built from the Dockerfile in the `./banking-app-frontend` directory, which builds the Angular application and serves it with Nginx on port 80.

3. **Access the Application**:
   Open your web browser and navigate to [http://localhost:4200](http://localhost:4200) to access the frontend application.

   The frontend application will communicate with the backend service internally using Docker's internal networking, 
   eliminating the need to hardcode URLs.


## Required Tools
Ensure you have the following tools installed on your machine:

- Git
- Docker
- Docker Compose
   

## Testing and Expected Outputs

### Loan Request Form

Navigate to [http://localhost:4200/loan-request](http://localhost:4200/loan-request) to access the loan request form.

#### Possible Error Messages
- **Missing Parameters**: Ensure all required fields are filled out.
- **Invalid Personal Code**: Check that the personal code is valid.
- **Invalid Amount**: Verify that the loan amount meets the constraints.
- **Invalid Duration**: Ensure the loan duration is within the allowed range.

### Loan Response

After submitting a valid loan request, you will be redirected to [http://localhost:4200/loan-response](http://localhost:4200/loan-response), 
where the loan decision engine response will be displayed. Below are the expected scenarios:

#### Request Rejected
- If the loan request is rejected, a message indicating the rejection will be displayed.

#### Request Partially Accepted
- If the loan request is partially accepted, the loan amount may be decreased, or the loan period may be increased to meet the criteria. 
- The response will reflect these adjustments.

#### Request Accepted with Larger Sum
- If the loan request is accepted, and the client's credit score allows for a larger sum to be borrowed, the response will indicate the approved amount.

#### Request Accepted with Actual Credit Score
- If the loan request is accepted, the response will also display the client's credit score, indicating the approval decision based on their creditworthiness.

To submit another loan request, click the "Submit New Request" button to return to the loan request form.

### Personal Codes for Testing
To test the application, use the following personal codes on the frontend:

- `49002010965` (Debt)
- `49002010976` (Segment 1)
- `49002010987` (Segment 2)
- `49002010998` (Segment 3)