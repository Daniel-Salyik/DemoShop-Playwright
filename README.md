## About the project

This is my first attempt to practice Playwright and create end-to-end tests with Playwright and TypeScript.  
I'm using one of the public test websites as the SUT.

My main goal is to practice TypeScript while using the Playwright framework.  
I'm focusing on testing the most important features as a guest user:  
- homepage loading and navigation  
- navigating through categories  
- product list display  
- contact page accessibility  
- sign-in and registration page behavior  

As a logged-in customer:  
- successful login  
- accessing role-specific features  

I'm not going to cover the admin role because my main focus is practicing TypeScript and Playwright, not covering the entire functionality of the website.

I'm following the Page Object Model to make my code easier to read and more reusable.

## Prerequisites

To run the tests in this project, make sure you have the following tools installed:

- Git – clone the repository and verify installation with `git --version`
- Node.js – download from https://nodejs.org/ and verify with `node -v`
- npm – comes with Node.js, verify with  `npm -v`
- VS Code (recommended) – install the Playwright Test for VS Code extension
- Docker & Docker Compose (optional) – run locally with `docker compose up -d`

## Environment Configuration

Although the application can be executed locally via ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) the automated tests are configured to use the public hosted version instead of localhost due to setup issues experienced during local deployment.

## Getting Started
1. Clone the repository into your chosen directory  
  `git clone <repository-url>` (replace `<repository-url>` with the project link)

2. Navigate to the project folder  
  `cd <project-folder>`

3. Install the required dependencies  
  `npm install` (this installs all dependencies required to run the project)

4. Run the Playwright tests  
  `npx playwright test`  
  or, if defined in `package.json`:  
  `npm run test`

  ## Built With

- [TypeScript](https://www.typescriptlang.org/) – for writing the test scripts
- [Playwright](https://playwright.dev/) – test automation framework
- [Node.js](https://nodejs.org/) – runtime environment
- [npm](https://www.npmjs.com/) – dependency management
- [VS Code](https://code.visualstudio.com/) – recommended editor
- [Docker](https://www.docker.com/) (optional) – for running the webshop locally