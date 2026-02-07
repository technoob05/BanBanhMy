import * as cheerio from 'cheerio';
import { DuckDuckGoSearchResult } from '@/lib/duckduckgo';

// --- Configuration ---
const MAX_CONTEXT_LENGTH = 4000;
const MAX_SNIPPET_LENGTH = 500;
const FETCH_TIMEOUT = 5000;

// --- Prioritized Domains ---
const PRIORITIZED_DOMAINS = [
    'who.int',
    'food.gov.uk',
    'ratings.food.gov.uk',
    'gov.uk/government/organisations/food-standards-agency',
    'food.ec.europa.eu',
    'ec.europa.eu',
    'efsa.europa.eu',
    'europa.eu',
    'commission.europa.eu',
];

// --- Interfaces ---
export interface Citation {
    source: string;
    url: string;
    title: string;
}

export interface RAGResult {
    context: string;
    citations: Citation[];
}

// --- Helper Functions ---
function getDomainName(url: string): string | null {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.replace(/^www\./, '');
    } catch (e) {
        return null;
    }
}

function getSourceName(domain: string): string {
    if (domain.includes('who.int')) return 'WHO';
    if (domain.includes('food.gov.uk') || domain.includes('ratings.food.gov.uk') || domain.includes('gov.uk/government/organisations/food-standards-agency')) return 'UK FSA';
    if (domain.includes('efsa.europa.eu')) return 'EU EFSA';
    if (domain.includes('food.ec.europa.eu') || domain.includes('ec.europa.eu') || domain.includes('commission.europa.eu') || domain.includes('europa.eu')) return 'EU Commission/Portal';
    return domain.split('.')[0]?.toUpperCase() || domain;
}

async function fetchAndExtractText(url: string): Promise<string | null> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'NutriCareBot/1.0 (+https://your-app-url.com/bot-info)',
                'Accept': 'text/html',
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`[RAG] Failed to fetch ${url}: Status ${response.status}`);
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.warn(`[RAG] Skipped non-HTML content at ${url}: ${contentType}`);
            return null;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        $('script, style, nav, footer, header, noscript, iframe, button, input, select, textarea, aside').remove();
        let text = $('main').text() || $('article').text() || $('body').text();

        text = text.replace(/\s\s+/g, ' ').replace(/\n+/g, '\n').trim();

        console.log(`[RAG] Successfully extracted text from ${url} (Length: ${text.length})`);
        return text;

    } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.warn(`[RAG] Fetch timed out for ${url}`);
        } else {
            console.error(`[RAG] Error fetching/extracting ${url}:`, error);
        }
        return null;
    }
}

// --- Main RAG Function ---
export async function performRAG(
    query: string,
    searchResults: DuckDuckGoSearchResult[],
    maxResultsToProcess: number = 3
): Promise<RAGResult> {
    console.log(`[RAG] Starting RAG process for query: "${query}"`);
    const citations: Citation[] = [];
    let combinedContext = `Information related to "${query}":\n\n`;

    const sortedResults = [...searchResults].sort((a, b) => {
        const domainA = getDomainName(a.link);
        const domainB = getDomainName(b.link);
        const isAPrioritized = domainA ? PRIORITIZED_DOMAINS.some(pd => domainA.includes(pd)) : false;
        const isBPrioritized = domainB ? PRIORITIZED_DOMAINS.some(pd => domainB.includes(pd)) : false;

        if (isAPrioritized && !isBPrioritized) return -1;
        if (!isAPrioritized && isBPrioritized) return 1;
        return 0;
    });

    let processedCount = 0;
    for (const result of sortedResults) {
        if (processedCount >= maxResultsToProcess) break;
        if (combinedContext.length >= MAX_CONTEXT_LENGTH) break;

        const domain = getDomainName(result.link);
        if (!domain) {
            console.warn(`[RAG] Skipping invalid URL: ${result.link}`);
            continue;
        }

        console.log(`[RAG] Processing result: ${result.title} (${result.link})`);
        const extractedText = await fetchAndExtractText(result.link);

        if (extractedText) {
            processedCount++;
            const sourceName = getSourceName(domain);
            const snippet = extractedText.substring(0, MAX_SNIPPET_LENGTH);
            const citation: Citation = {
                source: sourceName,
                url: result.link,
                title: result.title,
            };
            citations.push(citation);

            const contextToAdd = `Source: ${sourceName} (${result.title})\nURL: ${result.link}\nContent Snippet:\n${snippet}\n\n---\n\n`;
            if (combinedContext.length + contextToAdd.length <= MAX_CONTEXT_LENGTH) {
                combinedContext += contextToAdd;
            } else {
                const remainingSpace = MAX_CONTEXT_LENGTH - combinedContext.length;
                if (remainingSpace > 100) {
                    combinedContext += contextToAdd.substring(0, remainingSpace - 4) + '...\n';
                }
                console.warn(`[RAG] Context length limit reached.`);
                break;
            }
        }
    }

    return {
        context: combinedContext.trim(),
        citations: citations,
    };
}
