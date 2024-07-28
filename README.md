# Weather Report Application

## Project Overview
This application provides weather reports including METAR (Meteorological Terminal Air Report) and TAF (Terminal Aerodrome Forecast) data for specified airport locations. Developed as part of a coding challenge, it demonstrates rapid learning and application of new technologies within a self-imposed 6-hour timeframe.

## Technology Stack
- Frontend: Angular
- Backend: C# with ASP.NET Core
- Database: MongoDB (simulated in this implementation)

## Key Features
- METAR data display
- TAF data display
- Full weather report combining METAR and TAF
- User activity tracking

## Technical Approach
Despite no prior Angular experience, I chose to adhere to the specified stack of Angular for the frontend and C# for the backend. This decision aligned with project requirements and presented an opportunity for rapid skill acquisition. The learning process involved:

1. Quickly grasping Angular fundamentals
2. Applying component-based architecture principles
3. Implementing data binding and services
4. Working with TypeScript in a real-world context

## Project Structure
- `src/app/metar`: METAR component
- `src/app/taf`: TAF component
- `src/app/full`: Full weather report component
- `src/app/user-activity`: User activity tracking
- `src/app/services`: Weather data service
- `src/styles`: Shared SCSS styles
- `Controllers`: C# backend controllers
- `Services`: C# backend services

## Setup and Execution
The project consists of two parts:
1. C# Web API (Net 8)
2. Angular frontend (located in the `code-challenge-app` folder)

The backend must run at https://localhost:44357 for the frontend to function correctly.

## Future Enhancements
Given the self-imposed time constraint, several areas for improvement were identified:

1. Implement actual MongoDB integration
2. Enhance error handling and user feedback
3. Improve responsive design for mobile devices
4. Add comprehensive unit and integration tests
5. Implement user authentication for personalized experiences

Prioritization focused on core functionality implementation over extensive testing or design refinement, considering the time limitation and the nature of this demonstration project.

## Conclusion
This project showcases the ability to rapidly acquire and apply new technologies to meet specific requirements. Despite the challenge of working with an unfamiliar framework, the application successfully implements core weather reporting functionalities. It serves as a solid foundation for further discussion and development at our next meeting.