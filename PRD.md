# Dorm Marketplace PRD

### Update

Minor improvement added for PR creation

## Scope Cut

1. Payments — Not needed for MVP
2. Chat — Users can meet offline
3. Advanced Search — Simple list is enough

## MVP Features

1. Add items
2. View items
3. Claim items

## Acceptance Criteria

Given an item is available  
When a user claims it  
Then it becomes unavailable

Given an item is claimed  
When another user tries  
Then system blocks it

Given an item is claimed  
When claim expires  
Then item becomes available again
