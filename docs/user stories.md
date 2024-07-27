# QueueCrew - User Stories and Use Cases

   ## User Stories

   1. As a user, I want to log in with my Discord account so that I can easily access the app.
   2. As a user, I want to create a new group so that I can start planning game sessions with my friends.
   3. As a user, I want to join an existing group so that I can participate in game voting.
   4. As a group member, I want to suggest a game for today so that it's considered in the voting process.
   5. As a group member, I want to vote on multiple game suggestions so that I can express my preferences.
   6. As a group member, I want to see the voting results so that I know which game is most popular for today.
   7. As a group admin, I want to manage group members so that I can maintain the group's composition.

   ## Use Cases

   1. User Authentication
      - User clicks "Login with Discord"
      - User is redirected to Discord OAuth page
      - User authorizes the app
      - User is redirected back to the app and logged in

   2. Creating a Group
      - Logged-in user navigates to "Create Group" page
      - User enters group name and optional description
      - User confirms creation
      - System creates the group and adds the user as admin

   3. Suggesting and Voting on Games
      - User opens the app and selects a group
      - User views today's game suggestions
      - User adds a new game suggestion if desired
      - User votes on one or more suggested games
      - System updates vote counts in real-time

   4. Viewing Results
      - User opens the app and selects a group
      - System displays today's suggestions with vote counts
      - User can see which game(s) have the most votes
