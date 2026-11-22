# Support GraphQL 16 and 17

## Status

Accepted

## Context

The library uses the application's GraphQL installation. `graphql-language-service` 6 supports GraphQL 16.11 and later on the 16.x line, as well as 17.x. Requiring 17.x would force applications on a supported 16.x version to upgrade.

## Decision

Declare `^16.11.0 || ^17.0.0` as the GraphQL peer dependency. Use GraphQL 17.x as the development dependency.

## Consequences

Applications can upgrade this library without moving from GraphQL 16 to 17 if they already use 16.11 or later. GraphQL 16.0 through 16.10 are not supported. The default CI install uses GraphQL 17.x, so verify the 16.11.0 minimum separately when changing GraphQL integration.
