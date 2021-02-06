# GraphQL syntax highlighting React component

## Installation

```bash
yarn add react-graphql-syntax-highlighter
```

## Example usage
```tsx
import { GraphQLCodeBlock } from 'react-graphql-syntax-highlighter';
import 'react-graphql-syntax-highlighter/dist/style.css';
import React from 'react';

interface Props {
  code: string;
}

export const GraphqlCodeBlock: React.FC<Props> = ({ code }) => (
  <GraphQLCodeBlock src={code} />
);
```

The components only takes two props: `className` and `code`. `code` is a graphql query string.
