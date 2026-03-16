# Flooring Services Platform — Project Guide for GitHub Copilot

## Purpose of this file
This file exists to guide development for a school project.  
The goal is **not** to generate the entire project automatically.  
Use this as a **strict implementation reference, debugging guide, and consistency guide** while coding manually.

This project is a **Flooring Services Platform** where users can browse flooring-related services offered by experts, apply to become sellers, manage services, place orders, and ask an AI chatbot limited to the flooring-services domain.

The codebase must look like a real student-made project:
- clean but not overengineered
- readable
- practical folder structure
- realistic dummy data
- consistent naming conventions
- human-style UI and code decisions
- no flashy over-automation
- no unnecessary abstractions
- no AI-looking patterns like excessive generic helpers everywhere

---

# GLOBAL PROJECT RULES

## Tech Stack Rules
### Frontend
- Use **React**
- Do **not** use Vite
- Use **React Bootstrap + Bootswatch**
- Tailwind is acceptable only as a replacement for Bootstrap, but prefer **React Bootstrap + Bootswatch**
- Do **not** use component libraries
- Use **Redux** with:
  - `/actions`
  - `/reducers`
  - `/constants`
  - `store.js`

### Backend
- Use **Django**
- Use **Django REST Framework**
- Use **JWT authentication**
- Use a **custom user model**
- Use simple and practical DRF class-based views or APIViews where appropriate
- Keep backend readable and beginner-friendly, but still correct

---

# OVERALL PROJECT CONCEPT

Build a platform called something like:

**Flooring Services Platform**  
A web app where users can:
- register and sign in
- browse available flooring services
- view details of each service
- apply to become a seller
- order services using PayPal
- see their profile and order history
- chat with a flooring-services-only AI assistant

Admins can:
- manage users
- view seller applications
- approve or decline seller applications
- assign merchant IDs when approving sellers

Sellers can:
- access their own dashboard
- add new flooring services
- edit/delete their own services
- manage service listings

---

# IMPORTANT DEVELOPMENT STYLE

## Humanized Coding Style
Write code in a way that feels naturally made by a student developer:
- use straightforward variable names
- avoid robotic or overly abstract patterns
- do not create unnecessary helper files
- do not create giant “ultimate reusable systems” if not needed
- solve the exact requirement directly
- prefer clarity over cleverness
- comments should sound natural and useful, not AI-polished
- keep UI realistic and simple
- avoid excessive animations or fancy modern effects
- cards, tables, forms, modals, navbars, and profile layouts should feel practical

## Dummy Data Style
Use realistic flooring-related data such as:
- Tile Installation
- Hardwood Floor Polishing
- Vinyl Flooring Setup
- Laminate Floor Repair
- Grout Cleaning Service
- Epoxy Floor Coating
- Marble Floor Restoration

For experts/sellers, use realistic names and locations.
Avoid fake-looking placeholders like:
- lorem ipsum
- sample1 sample2
- test service 123
- John Doe everywhere

Use believable values for:
- ratings
- price
- service duration
- seller names
- images
- locations

---

# FRONTEND REQUIREMENTS

## Expected Frontend Folder Direction
Use a structure similar to:

- `/src/actions`
- `/src/constants`
- `/src/reducers`
- `/src/screens`
- `/src/components`
- `/src/store.js`
- `/src/App.js`
- `/src/index.js`

Keep screen files inside `/screens`.

---

## Required Screens

### `/screens/HomeScreen.jsx`
This is the main list page showing all available flooring services.

Display services using **card design**.

Each card must show:
- `service_name`
- `description`
- `rating`
- `sample_image`

Each card should be clickable and redirect to the detail page.

Suggested UI:
- responsive card grid
- top navbar
- simple hero/header section like “Find Trusted Flooring Experts”
- service cards with image at the top and text content below
- “View Details” button or whole card clickable

---

### `/screens/DetailScreen.jsx`
Show detailed information of one selected service.

Display:
- `service_name`
- `description`
- `rating`
- `price`
- `duration_of_service`
- `sample_image`
- `name_of_the_expert`

Also include:
- button to avail/book/order service
- clear service image
- neat layout using Bootstrap grid
- realistic formatting for pesos, duration, seller name

---

### `/screens/SignIn.jsx`
Login page.

Requirements:
- credential is **email**, not username
- fields:
  - email
  - password
- frontend validation required
- redirect user properly after successful login

Design should be simple:
- centered form card
- clear labels
- sign in button
- link to sign up page

---

### `/screens/SignUp.jsx`
Registration page.

Fields:
- email
- username
- phone_number
- first_name
- last_name
- location
- gender
- password
- confirm_password

Requirements:
- validate required fields
- validate email format
- validate password confirmation
- submit to backend register endpoint
- newly registered account should automatically have role = `User`

Make the form look realistic and complete.

---

### `/screens/ApplySeller.jsx`
Page where a regular user can apply to become a seller.

Requirements:
- only signed-in users can access
- user submits seller application
- show status if they already applied
- handle pending / approved / declined states cleanly

Possible UI:
- short explanation section
- application button or form
- current application status badge

---

### `/screens/UserScreen.jsx`
Admin-only page.

Must contain a table design with **two tabs**.

#### Tab 1: All Users
Show:
- `first_name`
- `last_name`
- `email`

Actions:
- `Edit`
- `Delete`

Only admin can edit from this page.

#### Tab 2: Seller Applications
Show seller applications in a similar table.

Actions:
- `Approve`
- `Decline`

Behavior:
- when approving, show modal to assign `merchant-id`
- when declining, show modal to enter decline reason

The UI should feel practical:
- tabs at top
- table below
- Bootstrap modal for both actions
- admin-only route protection

---

### `/screens/SellerDashboard.jsx`
Approved sellers only.

Purpose:
- add new flooring services
- manage existing services

Features:
- form to create service with:
  - name
  - description
  - price
  - duration
  - image
- list/table/cards of seller’s existing services
- edit/delete actions for each service

Layout suggestion:
- top summary heading
- left or top form
- service management section below

Keep it realistic and manageable.

---

### `/screens/UserProfile.jsx`
User profile page.

Show:
- user information
- order history table below

Suggested user info:
- full name
- email
- phone number
- location
- gender
- role

Order history table should show realistic order info such as:
- service name
- price paid
- purchase date
- PayPal transaction ID

---

## AI Chatbot Frontend
Add a chatbot area/component/page that only answers questions related to the flooring services project.

Rules for chatbot:
- must only answer project-related or flooring-services-related inquiries
- politely refuse unrelated topics
- should feel like a support assistant for flooring services
- example allowed topics:
  - flooring types
  - service durations
  - tile installation tips
  - epoxy flooring questions
  - polishing vs refinishing
  - service booking inquiries

Do not make it look like a general-purpose chatbot.

---

# FRONTEND STATE MANAGEMENT

## Redux Requirements
Use:
- actions
- constants
- reducers
- store.js

Suggested state slices:
- user login
- user register
- user details/profile
- user list
- seller application submit
- seller application list
- application approve/decline
- service list
- service details
- seller service manage
- order create
- order history
- chatbot ask

Reducers and action names should be clear and conventional.

---

# FRONTEND ROUTING AND AUTH GUARDS

## Route Protection
Implement frontend route checks so that:
- unauthenticated users trying to access protected pages are redirected to login
- admin-only pages are restricted
- seller-only dashboard is restricted to approved sellers
- regular user pages remain accessible only when relevant

Protected pages include:
- ApplySeller
- UserScreen
- SellerDashboard
- UserProfile

---

# FRONTEND VALIDATION RULES

Implement proper frontend validation for:
- sign in
- sign up
- seller application actions
- service creation/editing
- checkout/order action

Validation should be practical and visible:
- required fields
- invalid email
- mismatched passwords
- empty service form fields
- invalid price inputs
- invalid duration inputs

Use readable validation messages.

---

# PAYPAL FRONTEND BEHAVIOR

The project follows a **multi-merchant approach**.

Meaning:
- payment goes directly to the seller’s PayPal
- the platform acts as a marketplace
- the platform merchant account should still be able to see transactions happening in the project

When implementing UI and order logic:
- order description should use the **service name**
- show the amount clearly
- after successful payment, save the order in backend

Keep payment flow code organized and understandable.

---

# BACKEND REQUIREMENTS

## Backend Apps
Create the following Django apps:
- `users`
- `applications`
- `services`
- `orders`
- `chat`

Base API routes:
- `/api/v1/users/`
- `/api/v1/applications/`
- `/api/v1/services/`
- `/api/v1/orders/`
- `/api/v1/chat`

---

# USERS APP

## Purpose
Handles:
- authentication
- JWT tokens
- custom user model
- roles
- profile fetching
- admin user listing

## Custom User Model
Create a custom user model extending `AbstractUser` or `AbstractBaseUser`.

Fields:
- `email`
- `username`
- `phone_number`
- `first_name`
- `last_name`
- `location`
- `gender`
- `role`
- `merchant_id`

### Role choices
Use roles like:
- `Admin`
- `Seller`
- `User`

Default upon registration:
- `User`

Use email-based login logic.

---

## Users Serializers
Create:
- `UserSerializer`
- `RegisterSerializer`
- `MyTokenObtainPairSerializer`

### Expectations
- `UserSerializer` returns important user fields
- `RegisterSerializer` handles account creation and password hashing
- `MyTokenObtainPairSerializer` allows login using email and returns token + user info if needed

---

## Users Views
Create:
- `MyTokenObtainPairView`
- `RegisterView`
- `UserProfileView`
- `AdminUserListView`

### Expectations
- login using email
- register user with default role `User`
- authenticated user can fetch own profile
- admin can list users

---

## Users URLs
Create:
- `login/`
- `register/`
- `profile/`
- `admin/users/`

---

# APPLICATIONS APP

## Purpose
Handles seller application lifecycle:
- submit application
- list applications
- approve application
- decline application
- assign merchant ID when approving

## Model
Create `SellerApplication` model with fields:
- `STATUS_CHOICES`
- `user`
- `status`
- `decline_reason`
- `created_at`

### Suggested statuses
- `Pending`
- `Approved`
- `Declined`

A user should not be able to spam multiple active applications unnecessarily. Handle logic sensibly.

---

## Serializer
Create:
- `SellerApplicationSerializer`

---

## Views
Create:
- `SubmitApplicationView`
- `ListApplicationView`
- `ApproveApplicationView`
- `DeclineApplicationView`

### Expectations
- regular user can submit seller application
- admin can list applications
- admin can approve application and assign merchant ID
- admin can decline application with reason
- approving changes user role to `Seller`

---

## URLs
Create:
- `apply/`
- `list/`
- `pk/approve/`
- `pk/decline/`

---

# SERVICES APP

## Purpose
Handles flooring service listings and seller-managed service CRUD.

## Model
Create `Service` model with fields:
- `seller`
- `service_name`
- `description`
- `price`
- `duration_of_service`
- `sample_image`

This should represent flooring-related services offered by approved sellers.

Examples:
- Tile Floor Installation
- Hardwood Polishing
- Vinyl Floor Repair
- Epoxy Coating
- Marble Restoration

---

## Serializer
Create:
- `ServiceSerializer`

---

## Views
Create:
- `ServiceListView`
- `ServiceDetailView`
- `SellerServiceManageView`
- `SellerServiceDetailView`

### Expectations
- public can view service list and detail
- sellers can add/manage their own services
- sellers can update/delete only their own services
- image upload should work locally
- backend responses should be clean and frontend-friendly

---

## URLs
Create:
- `list/`
- `pk/`
- `manage/`
- `manage/pk/`

---

# ORDERS APP

## Purpose
Handles successful PayPal transaction logging and user order history.

## Model
Create `Order` model with fields:
- `buyer`
- `service`
- `paypal_transaction_id`
- `price_paid`
- `date_purchased`

---

## Serializer
Create:
- `OrderSerializer`

---

## Views
Create:
- `CreateOrderView`
- `UserOrderHistoryView`

### Expectations
- after successful payment, create order entry
- authenticated user can fetch own order history
- save PayPal transaction ID properly
- save actual price paid

---

## URLs
Create:
- `create/`
- `history/`

---

# CHAT APP

## Purpose
Handles AI chatbot API communication for flooring-services-only support.

## View
Create:
- `AIChatbotView`

## URL
Create:
- `ask/`

### Chatbot Rules
The chatbot must only answer:
- flooring service questions
- platform-related help
- flooring materials and service concerns relevant to this project

The chatbot must refuse unrelated questions such as:
- math problems
- general trivia
- celebrity questions
- politics
- unrelated coding questions

The chatbot tone should feel like a helpful flooring service assistant.

---

# API DESIGN EXPECTATIONS

## General Backend Expectations
- Use clean serializer responses
- Use proper authentication and permissions
- Return useful error messages
- Keep naming consistent
- Do not make endpoints overly complex
- Use JWT for authentication
- Protect routes properly

## Permissions
Suggested behavior:
- admin-only endpoints for user and application approval management
- seller-only endpoints for service management
- authenticated user-only endpoints for profile, apply seller, create order, order history
- public endpoints for service list and service detail

---

# REALISTIC FLOORING DOMAIN DETAILS

## Theme of the Project
Everything should revolve around **flooring services**.

Use service categories such as:
- tile installation
- tile replacement
- grout cleaning
- hardwood polishing
- hardwood refinishing
- laminate repair
- vinyl installation
- epoxy floor coating
- marble floor restoration
- floor leveling consultation

## Good UI Wording Examples
Use headings such as:
- Find Skilled Flooring Experts
- Browse Reliable Flooring Services
- Flooring Solutions for Homes and Businesses
- Seller Dashboard
- Apply as a Flooring Service Provider
- Your Orders
- Manage Flooring Services

---

# UI/UX DIRECTION

## General Style
The UI should feel:
- clean
- student-made but polished
- practical
- service marketplace focused
- not too modern or overdesigned
- not empty
- not template-looking

## Suggested Components
Build with simple pieces:
- navbar
- footer
- cards
- forms
- tables
- modals
- alerts
- loaders
- protected route wrapper

Use Bootswatch theme consistently.

---

# README EXPECTATION

Create a concise and proper README that includes:
- project title
- short description
- key features
- tech stack
- setup instructions for frontend
- setup instructions for backend
- environment variables needed
- how to run the project
- main API routes
- user roles overview

Keep README clean and not too wordy.

---

# COMMIT MESSAGE STYLE

Use proper and concise commit messages.

Examples:
- `feat: create custom user model with role support`
- `feat: build service listing and detail pages`
- `feat: add seller application workflow`
- `fix: resolve email login issue in jwt serializer`
- `fix: protect seller dashboard route`
- `style: clean up profile page layout`
- `docs: add project setup instructions to readme`

Avoid messy commit messages like:
- update
- final final
- ayos na
- fix lang
- try
- working na ata

---

# IMPLEMENTATION PRIORITY

Follow this build order as much as possible:

1. Setup backend project and apps
2. Create custom user model
3. Setup JWT authentication with email login
4. Build registration and login APIs
5. Build seller application APIs
6. Build service APIs
7. Build order APIs
8. Build chatbot API
9. Setup React frontend structure
10. Setup Redux store, constants, actions, reducers
11. Build authentication screens
12. Build home and detail screens
13. Build profile screen
14. Build apply seller page
15. Build admin user screen with tabs and modals
16. Build seller dashboard
17. Connect PayPal flow
18. Connect chatbot
19. Final validation and route protection
20. Final README cleanup

---

# COPILOT CODING BEHAVIOR INSTRUCTIONS

When suggesting code:
- follow the exact project requirements
- do not introduce Vite
- do not use component libraries
- keep code modular but simple
- prefer React Bootstrap components
- do not invent missing requirements unless necessary
- if generating dummy content, keep it flooring-related and realistic
- use beginner-friendly but correct patterns
- keep JSX readable
- keep Django views and serializers clean
- avoid unnecessary advanced architecture
- do not rewrite the whole project at once
- focus on one file or one feature at a time
- preserve naming consistency with the project requirements

When generating frontend code:
- use practical Bootstrap layouts
- write forms with controlled inputs
- include loading, error, and success states where needed
- keep screen components readable
- do not create giant 500-line files unless necessary

When generating backend code:
- use DRF conventions
- keep serializers explicit
- keep permissions clear
- use readable model definitions
- return practical API responses
- do not overcomplicate with unnecessary services/repositories layers

---

# FINAL GOAL

The final project should feel like:
- a believable student-made marketplace project
- focused specifically on flooring services
- complete enough to meet the requirement
- humanized in code structure and UI
- realistic in naming and data
- functional across admin, seller, and user workflows

Build the project piece by piece, with correctness and readability first.