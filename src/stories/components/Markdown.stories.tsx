import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from '../../components/Markdown';

const meta = {
  title: 'Components/Markdown',
  component: Markdown,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Markdown content to render',
    },
  },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMarkdown = `# Heading 1

This is a paragraph with **bold** and *italic* text.

## Heading 2

Here's a list:
- Item 1
- Item 2
- Item 3

### Heading 3

And a numbered list:
1. First item
2. Second item
3. Third item

Here's some \`inline code\` and a [link](https://example.com).

\`\`\`javascript
function hello() {
  console.log('Hello, world!');
}
\`\`\`

> This is a blockquote
> It can span multiple lines
`;

export const Default: Story = {
  args: {
    content: sampleMarkdown,
  },
};

export const SimpleText: Story = {
  args: {
    content: 'This is a simple paragraph with some **bold** and *italic* text.',
  },
};

export const WithCode: Story = {
  args: {
    content: `# Code Example

Here's a JavaScript function:

\`\`\`javascript
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet('World'));
\`\`\``,
  },
};

export const WithLinks: Story = {
  args: {
    content: `# Useful Links

Check out these resources:
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)`,
  },
};
