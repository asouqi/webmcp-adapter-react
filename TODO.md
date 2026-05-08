# TODO

## Features

- [ ] **`useToolsWithStatus`** - Return registration status
  ```tsx
  const { isRegistered, toolNames } = useToolsWithStatus(tools)
  ```

- [ ] **`enabled` option** - Conditionally enable/disable tools
  ```tsx
  useTools(tools, { enabled: isLoggedIn, deps: [fields] })
  ```

- [ ] **`ToolsProvider` context** - Register tools at app level
  ```tsx
  <ToolsProvider tools={globalTools}>
      <App />
  </ToolsProvider>
  ```

- [ ] **`useRegisterTool`** - Register a single tool
  ```tsx
  useRegisterTool(myTool, [deps])
  ```

- [ ] **React 19 support** - Ensure compatibility with React 19 features

- [ ] **Suspense integration** - Support for React Suspense boundaries

## Improvements

- [ ] Add debug mode for logging tool registration/unregistration
- [ ] Add warning when tools array changes without deps update
- [ ] Add TypeScript generics for better tool input inference
