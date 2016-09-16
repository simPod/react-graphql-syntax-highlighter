A React component for GraphQL syntax highlighting.

Usage:
`import { GraphqlCodeBlock } from 'graphql-syntax-highlighter-react';`

```
<GraphqlCodeBlock
  className="GraphqlCodeBlock"
  queryBody="query getData($eventId: Int!) {event(id: $eventId) {name,... eventFields ... on Event{attendees(first: 5)}}}"
/>
```
