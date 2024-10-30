# Initial README.MD

## Project Completion

### Running application directly

- Clone this repo
- Run `npm install`
- Run `npm run dev`

### Running with docker

- Ensure that you have docker installed
- Clone this repo
- Run `docker compose up`

### Instructions for use

- Moving and connecting nodes work as standard with react flow.
- To duplicate, delete, or mark a node as complete, use the **Context Menu** by right clicking a node and selecting the desired function
- Additional functionality is available via the **Control Panel** in the bottom left (you may hover to see each function)

![2024-10-25-135613_hyprshot](https://github.com/user-attachments/assets/32abceef-5941-40a2-9fef-1d689f1131ef)

### Summary

Overall, I enjoyed this project. The React Flow library was extremely well documented and enjoyable to use. I spent approximately 5 hours or so. That also includes some setup time for my machine (recently switched to a fresh NixOS install which was its own mini project).

I think the React Flow library looks like an excellent choice

### Core Requirements

[x] Adding Nodes

[x] Removing Nodes

[x] Connecting Nodes

[x] Moving Nodes

### Additional Features

[x] User defined labels

[x] Interactivity

[x] Persistence

### Dealer's Choice Features

[x] Basic styling using tailwind

[x] Custom controls menu

[x] Active styling

### Known Issues

- It is possible to mark a node as complete, step through the automation and then mark a previously completed node as incomplete. This should be disallowed or at least some kind of warning should be issued to a user.

### Stuff I would have liked to do

- Countdowns on tasks for automatic Completion
- Multiple inputs for a flow (e.g. Quantity 15 means the flow must be run 15x to complete)
- Wrapping application with multiple charts (e.g. Charts owned by specific operators)
- Dashboard showing all workflow charts and aggregate statuses
- User authentication/login

## Running Thoughts

- **2024-10-24 11:20** This looks like a fun take home project. Finally wrapped up some consulting work, so will be starting in on this project now.
- **2024-10-24 12:28** Alright, got my nvim editor setup (new linux computer, took a minute!) and have read through a good portion of the docs for React Flow. I'll be able to handle all of the requirements using the library. It is a very comprehensive library indeed. I also sketched some designs I'll go for. Time to start coding
- **2024-10-24 18:26** A lot of interrupts today from client work. Made good progress in the pockets I could. Just need to add interactivity and labels. Might add some extras later on too for kicks. I'm approaching 4 hours at this point I think
- **2024-10-25 11:44** Alright, have wrapped things up this morning. I feel pretty good about the state of things. Just going to do some cleanup and update the readme
