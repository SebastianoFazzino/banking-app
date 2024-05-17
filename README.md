# Decision Engine Loan Application

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

### Usage

To test the application, use the following personal codes on the frontend:

- `49002010965` (Debt)
- `49002010976` (Segment 1)
- `49002010987` (Segment 2)
- `49002010998` (Segment 3)


### Development Setup

1. **Clone the Repository**:
   ```
   git clone <repository_url>
   cd <repository_directory>
   ```
   
2. Install Backend Dependencies:
   ```
   mvn clean install
   ```
3. **Run the Backend Server**:
   ```
   mvn spring-boot:run
   ```
   This command will compile the Spring Boot application and start a development server. 
   By default, the application will be accessible at [http://localhost:8080](http://localhost:8080).

2. **Install Frontend Dependencies**:
   ```
   npm install
   ```

3. **Run the Development Server**:
   ```
   ng serve
   ```

   This command will compile the Angular application and start a development server. 
   By default, the application will be accessible at [http://localhost:4200](http://localhost:4200).

4. **Access the Application**:
   Open your web browser and navigate to [http://localhost:4200](http://localhost:4200) to access the frontend application.

5. **Testing**:
   Use predefined personal codes to simulate different scenarios and ensure that the decision engine behaves as expected.


