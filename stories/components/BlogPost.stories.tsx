import type { Meta, StoryObj } from '@storybook/react';
import { BlogPost } from '../../src/components/BlogPost';

const meta = {
  title: 'Pages/BlogPost',
  component: BlogPost,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the blog post',
    },
    date: {
      control: 'date',
      description: 'The publication date of the blog post',
    },
    tags: {
      control: 'object',
      description: 'Array of tags associated with the blog post',
    },
    content: {
      control: 'text',
      description: 'The markdown content of the blog post',
    },
    image: {
      control: 'text',
      description: 'Optional header image URL for the blog post',
    },
  },
} satisfies Meta<typeof BlogPost>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = `## Introduction

This is a sample blog post showcasing the blog post layout and styling. It demonstrates how markdown content is rendered with proper formatting and syntax highlighting.

### Code Examples

Here's a JavaScript code example:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

### Lists

Here are some key features:

- **Bold text** for emphasis
- *Italic text* for subtlety
- \`inline code\` for technical terms
- [Links](https://example.com) to external resources

### Ordered Lists

1. First point with important information
2. Second point with more details
3. Third point wrapping things up

### Blockquotes

> This is a blockquote that can be used to highlight important quotes or callouts within the blog post content.

### More Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

#### Subsection

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Conclusion

This concludes our sample blog post. The content demonstrates various markdown features and how they render in the blog post layout.`;

export const Default: Story = {
  args: {
    title: 'Getting Started with Next.js and TypeScript',
    date: '2024-11-05',
    tags: ['Next.js', 'TypeScript', 'React', 'Web Development'],
    content: sampleContent,
  },
};

export const WithImage: Story = {
  args: {
    title: 'Building Modern Web Applications',
    date: '2024-11-05',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    content: sampleContent,
    image: '/img/me.jpeg',
  },
};

export const ShortPost: Story = {
  args: {
    title: 'Quick Update',
    date: '2024-11-05',
    tags: ['Announcement'],
    content: `## Quick Update

Just a brief announcement about recent changes to the platform.

### What's New

- Improved performance
- Better user experience
- Bug fixes and stability improvements

That's all for now!`,
  },
};

export const TechnicalPost: Story = {
  args: {
    title: 'Advanced TypeScript Patterns',
    date: '2024-11-05',
    tags: ['TypeScript', 'Programming', 'Advanced'],
    content: `## Advanced TypeScript Patterns

Let's explore some advanced TypeScript patterns that can help you write better code.

### Generic Constraints

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

### Conditional Types

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type Example = NonNullable<string | null>; // string
\`\`\`

### Mapped Types

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

These patterns help create more type-safe and reusable code.`,
  },
};

export const LongFormArticle: Story = {
  args: {
    title: 'The Complete Guide to Modern Web Development',
    date: '2024-11-01',
    tags: ['Web Development', 'Guide', 'Best Practices'],
    content: `## The Complete Guide to Modern Web Development

Modern web development has evolved significantly over the years. This comprehensive guide covers everything you need to know.

### Table of Contents

1. Introduction to Modern Web Development
2. Frontend Technologies
3. Backend Technologies
4. DevOps and Deployment
5. Best Practices

## 1. Introduction to Modern Web Development

Web development in 2024 is more exciting than ever. With new frameworks, tools, and best practices emerging constantly, developers have more options than ever before.

### The Current Landscape

The web development ecosystem is vast and diverse:

- **Frontend Frameworks**: React, Vue, Svelte, and more
- **Backend Solutions**: Node.js, Python, Go, Rust
- **Database Options**: PostgreSQL, MongoDB, Redis
- **Cloud Providers**: AWS, Google Cloud, Azure

## 2. Frontend Technologies

### React and Next.js

React continues to dominate the frontend landscape. Next.js has become the go-to framework for React applications.

\`\`\`jsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <p>The React Framework for Production</p>
    </div>
  );
}
\`\`\`

### TypeScript

TypeScript adds static typing to JavaScript:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(res => res.json());
}
\`\`\`

## 3. Backend Technologies

Backend development has many options. Node.js remains popular, but other languages are gaining traction.

### API Design

RESTful APIs are still common, but GraphQL is growing:

\`\`\`graphql
type Query {
  user(id: ID!): User
  posts: [Post!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}
\`\`\`

## 4. DevOps and Deployment

Modern deployment strategies include:

1. Continuous Integration/Continuous Deployment (CI/CD)
2. Containerization with Docker
3. Orchestration with Kubernetes
4. Serverless architectures

### Example CI/CD Pipeline

\`\`\`yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
      - run: npm run build
\`\`\`

## 5. Best Practices

### Code Quality

- Write clean, readable code
- Use TypeScript for type safety
- Implement proper error handling
- Write tests for critical functionality

### Performance

> Performance is not just about speed; it's about the overall user experience.

- Optimize images and assets
- Implement code splitting
- Use lazy loading
- Cache strategically

### Security

Security should be a top priority:

- Sanitize user input
- Use HTTPS everywhere
- Implement proper authentication
- Keep dependencies updated

## Conclusion

Modern web development is a constantly evolving field. By staying up to date with the latest technologies and best practices, you can build better, faster, and more secure web applications.

Happy coding! 🚀`,
    image: '/img/me.jpeg',
  },
};
