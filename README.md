# webmcp-adapter-react

React hooks for WebMCP tool registration. Provides a simple `useTools` hook to register AI-powered tools within React component lifecycle.

## Installation

```bash
npm install webmcp-adapter-react webmcp-adapter
```

## API

### `useTools(options)`

Registers tools with WebMCP and automatically unregisters them on unmount or when dependencies change.

```typescript
interface UseToolsOptions {
    /** Tools to register */
    tools: ToolDefinition[]
    /** Dependencies that should trigger re-registration */
    deps?: unknown[]
}

function useTools(options: UseToolsOptions): void
```

## How It Works

1. Tools are registered when the component mounts
2. Tools are unregistered when the component unmounts
3. If `deps` change, tools are unregistered and re-registered

```tsx
useTools(tools, [fields])
//              ^^^^^^^^
//              When fields change:
//              1. Unregister old tools
//              2. Register new tools
```

## Usage

### Basic Usage

```tsx
import { useTools } from 'webmcp-adapter-react'
import { defineTool } from 'webmcp-adapter'

function App() {
    const tools = [
        defineTool({
            name: 'greet',
            description: 'Greet the user',
            inputSchema: {
                type: 'object',
                properties: {
                    name: { type: 'string' }
                },
                required: ['name']
            },
            execute: ({ name }) => ({
                content: [{ type: 'text', text: `Hello, ${name}!` }]
            })
        })
    ]

    useTools(tools)

    return <div>My App</div>
}
```

### With `webmcp-forms`

```tsx
import { useState } from 'react'
import { useTools } from 'webmcp-adapter-react'
import { createFormTools } from 'webmcp-forms'

const fields = {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true }
}

function ContactForm() {
    const [values, setValues] = useState({ name: '', email: '' })

    useTools({
        tools: createFormTools({
            formId: 'test',
            fields,
            values,
            onChange: (field, value) => {
                setValues((prev) => ({ ...prev, [field]: value }));
            },
            selectedTools: new Set<FormTools>(['fill-field', 'clear-field']),
        }),
        deps: [fields]
    })

    return (
        <form>
            <input
                value={values.name}
                onChange={e => setValues(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Name"
            />
            <input
                value={values.email}
                onChange={e => setValues(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

## Requirements

- React 18.0.0 or higher
- `webmcp-adapter` as a peer dependency
- Browser with WebMCP support (`navigator.modelContext`)

## Related Packages

- [`webmcp-adapter`](https://github.com/asouqi/webmcp-adapter) - Core adapter for defining and registering tools

## License

MIT