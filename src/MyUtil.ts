export class MyUtil {
    static getEnvironmentVariable(key: string): string {
        return (window as any)._env_?.[key] || "";
    }

    /**
     * Sorts a list of items and removes duplicates.
     *
     * @param items The array of items to sort and deduplicate. Can contain primitives or objects.
     * @param keyExtractor (Optional) A function that extracts a unique and comparable key from an item.
     * If not provided, assumes items are primitives (strings/numbers).
     * E.g., `item => item.id` or `item => item.label`
     * @param sortComparator (Optional) A custom comparison function for sorting.
     * If not provided, uses default alphanumeric/numeric sorting based on keyExtractor or item itself.
     * E.g., `(a, b) => a.localeCompare(b)` for strings, or `(a, b) => a - b` for numbers.
     * @returns A new array with unique, sorted items.
     */
    static getUniqueSortedList<T>(
        items: T[],
        keyExtractor?: (item: T) => string | number, // Function to get a unique ID/comparable value
        sortComparator?: (a: T, b: T) => number      // Custom sort function
    ): T[] {
        if (!items) {
            return [];
        }

        // --- Deduplication ---
        const seen = new Set();
        const uniqueItems: T[] = [];

        items.forEach(item => {
            // Determine the unique key for deduplication
            // If a keyExtractor is provided, use it. Otherwise, use the item itself (for primitives).
            const uniqueValue = keyExtractor ? keyExtractor(item) : item;

            // Convert non-string/number uniqueValues to string for Set consistency
            // This handles objects by stringifying them, ensuring consistent deduplication.
            const uniqueKey = typeof uniqueValue === 'object' && uniqueValue !== null
                ? JSON.stringify(uniqueValue)
                : String(uniqueValue);

            if (!seen.has(uniqueKey)) {
                seen.add(uniqueKey);
                uniqueItems.push(item);
            }
        });

        // --- Sorting ---
        // Create a copy to avoid mutating the uniqueItems array in place during sort
        const sortedItems = [...uniqueItems];

        if (sortComparator) {
            sortedItems.sort(sortComparator);
        } else {
            // Default sort for primitives or items where keyExtractor gives comparable primitives
            sortedItems.sort((a, b) => {
                const valA = keyExtractor ? keyExtractor(a) : a;
                const valB = keyExtractor ? keyExtractor(b) : b;

                if (typeof valA === 'string' && typeof valB === 'string') {
                    return valA.localeCompare(valB); // Case-sensitive for strings by default
                }
                if (typeof valA === 'number' && typeof valB === 'number') {
                    return valA - valB; // Numeric sort
                }
                // Fallback for mixed types, or complex objects without keyExtractor: stringify and compare
                return String(valA).localeCompare(String(valB));
            });
        }

        return sortedItems;
    }
}
