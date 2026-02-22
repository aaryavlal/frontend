/**
 * Microblog API
 * Handles all microblog-related API calls
 */

import { pythonURI, fetchOptions } from './config.js';

const MICROBLOG_BASE = `${pythonURI}/api/microblog`;

async function requestJson(url, options, errorMessage) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || errorMessage);
    }
    return await response.json();
}

function buildOptions(method, body) {
    const options = {
        ...fetchOptions,
        method,
        credentials: 'include'
    };

    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }

    return options;
}

/**
 * Fetch microblog posts
 * @param {string} pagePath - Optional page path to filter posts
 * @returns {Promise<Object>} - Microblog posts data
 */
export async function fetchPosts(pagePath) {
    const url = pagePath
        ? `${MICROBLOG_BASE}?pagePath=${encodeURIComponent(pagePath)}`
        : MICROBLOG_BASE;

    return await requestJson(url, buildOptions('GET'), 'Failed to fetch posts');
}

/**
 * Create a new microblog post
 * @param {Object} postData - Post data {content, topicPath}
 * @returns {Promise<Object>} - Created post data
 */
export async function createPost(postData) {
    return await requestJson(
        MICROBLOG_BASE,
        buildOptions('POST', postData),
        'Failed to create post'
    );
}

/**
 * Update an existing microblog post
 * @param {Object} postData - Post data {id, content, topicPath}
 * @returns {Promise<Object>} - Updated post data
 */
export async function updatePost(postData) {
    return await requestJson(
        MICROBLOG_BASE,
        buildOptions('PUT', postData),
        'Failed to update post'
    );
}

/**
 * Delete a microblog post
 * @param {number} postId - Post ID to delete
 * @returns {Promise<Object>} - Deletion confirmation
 */
export async function deletePost(postId) {
    return await requestJson(
        MICROBLOG_BASE,
        buildOptions('DELETE', { id: postId }),
        'Failed to delete post'
    );
}

/**
 * Create a reply to a microblog post
 * @param {Object} replyData - Reply data {postId, content, topicPath}
 * @returns {Promise<Object>} - Created reply data
 */
export async function createReply(replyData) {
    return await requestJson(
        `${MICROBLOG_BASE}/reply`,
        buildOptions('POST', replyData),
        'Failed to create reply'
    );
}

/**
 * Fetch replies for a specific post
 * @param {number} postId - Post ID to fetch replies for
 * @returns {Promise<Object>} - Replies data
 */
export async function fetchReplies(postId) {
    return await requestJson(
        `${MICROBLOG_BASE}/reply?postId=${postId}`,
        buildOptions('GET'),
        'Failed to fetch replies'
    );
}

/**
 * Add a reaction to a post
 * @param {Object} reactionData - Reaction data {postId, reactionType}
 * @returns {Promise<Object>} - Updated post with reactions
 */
export async function addReaction(reactionData) {
    return await requestJson(
        `${MICROBLOG_BASE}/reaction`,
        buildOptions('POST', reactionData),
        'Failed to add reaction'
    );
}

/**
 * Remove a reaction from a post
 * @param {Object} reactionData - Reaction data {postId, reactionType}
 * @returns {Promise<Object>} - Updated post without reaction
 */
export async function removeReaction(reactionData) {
    return await requestJson(
        `${MICROBLOG_BASE}/reaction`,
        buildOptions('DELETE', reactionData),
        'Failed to remove reaction'
    );
}
