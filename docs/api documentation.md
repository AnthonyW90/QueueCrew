# QueueCrew - API Documentation

## Base URL

TBD

## Authentication

All API routes except for the authentication routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/discord

Initiate Discord OAuth flow.

**Response:**
- `302 Found` - Redirects to Discord OAuth page

#### GET /auth/discord/callback

Handle Discord OAuth callback.

**Query Parameters:**
- `code` (string, required): The authorization code from Discord

**Response:**
- `200 OK` - Returns JWT token
- `400 Bad Request` - If code is invalid

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users

#### GET /users/me

Get current user's profile.

**Response:**
- `200 OK` - Returns user object

```json
{
  "id": "user_123",
  "discord_id": "discord_456",
  "username": "GameMaster",
  "avatar_url": "https://discord.com/avatars/discord_456/abc123.png"
}
```

### Groups

#### POST /groups

Create a new group.

**Request Body:**
```json
{
  "name": "Weekend Gamers"
}
```

**Response:**
- `201 Created` - Returns created group object

```json
{
  "id": "group_789",
  "name": "Weekend Gamers",
  "created_at": "2024-07-27T12:34:56Z"
}
```

#### GET /groups

Get list of groups user belongs to.

**Response:**
- `200 OK` - Returns array of group objects

```json
[
  {
    "id": "group_789",
    "name": "Weekend Gamers",
    "created_at": "2024-07-27T12:34:56Z"
  },
  // ...
]
```

#### GET /groups/:groupId

Get details of a specific group.

**Parameters:**
- `groupId` (string, required): The ID of the group

**Response:**
- `200 OK` - Returns group object with members
- `404 Not Found` - If group doesn't exist or user doesn't have access

```json
{
  "id": "group_789",
  "name": "Weekend Gamers",
  "created_at": "2024-07-27T12:34:56Z",
  "members": [
    {
      "id": "user_123",
      "username": "GameMaster",
      "role": "admin"
    },
    // ...
  ]
}
```

### Game Suggestions

#### POST /groups/:groupId/suggestions

Create a new game suggestion.

**Parameters:**
- `groupId` (string, required): The ID of the group

**Request Body:**
```json
{
  "game_name": "Apex Legends",
  "suggested_for": "2024-07-28"
}
```

**Response:**
- `201 Created` - Returns created suggestion object

```json
{
  "id": "suggestion_101",
  "game_name": "Apex Legends",
  "suggested_for": "2024-07-28",
  "group_id": "group_789",
  "user_id": "user_123",
  "created_at": "2024-07-27T13:00:00Z"
}
```

#### GET /groups/:groupId/suggestions

Get game suggestions for a group.

**Parameters:**
- `groupId` (string, required): The ID of the group

**Query Parameters:**
- `date` (string, optional): Filter suggestions for a specific date (YYYY-MM-DD)

**Response:**
- `200 OK` - Returns array of suggestion objects

```json
[
  {
    "id": "suggestion_101",
    "game_name": "Apex Legends",
    "suggested_for": "2024-07-28",
    "group_id": "group_789",
    "user_id": "user_123",
    "created_at": "2024-07-27T13:00:00Z",
    "votes": 3
  },
  // ...
]
```

### Votes

#### POST /suggestions/:suggestionId/votes

Cast a vote for a game suggestion.

**Parameters:**
- `suggestionId` (string, required): The ID of the game suggestion

**Response:**
- `201 Created` - Vote recorded successfully
- `400 Bad Request` - If user has already voted for this suggestion

```json
{
  "id": "vote_202",
  "game_suggestion_id": "suggestion_101",
  "user_id": "user_123",
  "created_at": "2024-07-27T14:30:00Z"
}
```

#### DELETE /suggestions/:suggestionId/votes

Remove a vote from a game suggestion.

**Parameters:**
- `suggestionId` (string, required): The ID of the game suggestion

**Response:**
- `204 No Content` - Vote removed successfully
- `404 Not Found` - If vote doesn't exist

### WebSocket

#### WS /ws

Real-time updates for groups, suggestions, and votes.

**Events:**
- `suggestion_created`: New game suggestion added
- `vote_updated`: Vote count changed for a suggestion
- `group_updated`: Group details or membership changed

**Example message:**
```json
{
  "type": "vote_updated",
  "data": {
    "suggestion_id": "suggestion_101",
    "votes": 4
  }
}
```

## Error Responses

All endpoints can return the following error responses:

- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error response body:

```json
{
  "error": "Error message describing the issue"
}
```