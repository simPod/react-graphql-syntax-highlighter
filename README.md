# GraphQL syntax highlighting React component

## Installation

```bash
yarn add react-graphql-syntax-highlighter
```

## Example usage
```tsx
import { GraphQLCodeBlock } from 'react-graphql-syntax-highlighter';
import 'react-graphql-syntax-highlighter/style.css';

const MyComponent = ({ code }: { code: string }) => (
  <GraphQLCodeBlock src={code} />
);
```

The component takes two props: `className` and `src`. `src` is a GraphQL query string.
