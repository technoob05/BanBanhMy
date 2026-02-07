import { search, SafeSearchType } from 'duck-duck-scrape';

export interface DuckDuckGoSearchResult {
    title: string;
    link: string;
    snippet: string;
}

/**
 * Performs a search using DuckDuckGo.
 * @param query The search query string.
 * @param maxResults The maximum number of results to return. Defaults to 5.
 * @returns A promise that resolves to an array of search results.
 */
export async function searchDuckDuckGo(query: string, maxResults: number = 5): Promise<DuckDuckGoSearchResult[]> {
    console.log(`[DuckDuckGo Service] Searching for: "${query}" (max ${maxResults} results)`);
    try {
        const searchResults = await search(query, {
            safeSearch: SafeSearchType.MODERATE,
        });

        if (!searchResults || !searchResults.results) {
            console.warn('[DuckDuckGo Service] No results found or unexpected format.');
            return [];
        }

        // Map to our desired format and limit results
        const formattedResults = searchResults.results
            .slice(0, maxResults)
            .map((result) => ({
                title: result.title || '',
                link: result.url || '',
                snippet: result.description || '',
            }))
            .filter(result => result.link && result.title);

        console.log(`[DuckDuckGo Service] Found ${formattedResults.length} results.`);
        return formattedResults;

    } catch (error: unknown) {
        console.error('[DuckDuckGo Service] Error during search:', error);
        return [];
    }
}
