import { useEffect, useRef } from "react"
import { registerBatch, ToolDefinition } from "webmcp-adapter"

export interface UseToolsOptions {
    /** Tools to register */
    tools: ToolDefinition[]
    /** Dependencies that should trigger re-registration */
    deps?: unknown[]
}

/**
 * Generic hook to register any WebMCP tools in React.
 * Tools are automatically unregistered on unmount or when deps change.
 */
export function useTools(options: UseToolsOptions) {
    const { tools, deps = [] } = options

    const toolsRef = useRef(tools)
    toolsRef.current = tools

    useEffect(() => {
        const unregisterAll = registerBatch(toolsRef.current)
        return () => unregisterAll()
    }, [deps])
}