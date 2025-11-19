// Type of the original replacer function, which takes (key, value, path)
// and returns any value. Note that `this` is typed as any.
type Replacer = (this: any, key: string, value: any, path: string) => any

/**
 * The replacerWithPath decorator takes a replacer and adds a third parameter `path`,
 * which contains the full path to the current key during JSON.stringify traversal.
 *
 * @param replacer the original function that will be called with (key, value, path)
 * @returns a new replacer function compatible with JSON.stringify
 */
export function replacerWithPath(replacer: Replacer): (this: any, key: string, value: any) => any {
    // Map to store the mapping between objects and their paths.
    const pathMap: Map<any, string> = new Map()

    return function (this: any, key: string, value: any): any {
        // Get the parent path. If it's missing (for the root object), it returns undefined,
        // which we replace with an empty string.
        const parentPath: string = pathMap.get(this) || ''

        // If `this` is an array, the key is formatted as square brackets,
        // otherwise as ".field".
        const appended = Array.isArray(this) ? '[]' : key ? `${key}` : ''

        // Build the full path. If no path is set for the parent, it will be empty.
        const path = [parentPath, appended].filter(Boolean).join('.')

        // If the value is an object (including arrays) and not null,
        // save its path in the Map for further traversal.
        if (value !== null && typeof value === 'object') {
            pathMap.set(value, path)
        }

        // Call the provided replacer with the additional path argument.
        return replacer.call(this, key, value, path)
    }
}
