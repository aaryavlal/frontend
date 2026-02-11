/**
 * Microblog API
 * Handles all microblog-related API calls
 */

import { pythonURI, fetchOptions } from './config.js';

/**
 * Fetch microblog posts
 * @param {string} pagePath - Optional page path to filter posts
 * @returns {Promise<Object>} - Microblog posts data
 */
export async function fetchPosts(pagePath) {
    const url = pagePath
        ? `${pythonURI}/api/microblog?pagePath=${encodeURIComponent(pagePath)}`
        : `${pythonURI}/api/microblog`;

    const response = await fetch(url, {
        ...fetchOptions,
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch posts');
    }

    return await response.json();
}

/**
 * Create a new microblog post
 * @param {Object} postData - Post data {content, topicPath}
 * @returns {Promise<Object>} - Created post data
 */
export async function createPost(postData) {
    const response = await fetch(`${pythonURI}/api/microblog`, {
        ...fetchOptions,
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create post');
    }

    return await response.json();
}

/**
 * Update an existing microblog post
 * @param {Object} postData - Post data {id, content, topicPath}
 * @returns {Promise<Object>} - Updated post data
 */
export async function updatePost(postData) {
    const response = await fetch(`${pythonURI}/api/microblog`, {
        ...fetchOptions,
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update post');
    }

    return await response.json();
}

/**
 * Delete a microblog post
 * @param {number} postId - Post ID to delete
 * @returns {Promise<Object>} - Deletion confirmation
 */
export async function deletePost(postId) {
    const response = await fetch(`${pythonURI}/api/microblog`, {
        ...fetchOptions,
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({ id: postId })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete post');
    }

    return await response.json();
}

/**
 * Create a reply to a microblog post
 * @param {Object} replyData - Reply data {postId, content, topicPath}
 * @returns {Promise<Object>} - Created reply data
 */
export async function createReply(replyData) {
    const response = await fetch(`${pythonURI}/api/microblog/reply`, {
        ...fetchOptions,
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(replyData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create reply');
    }

    return await response.json();
}

/**
 * Fetch replies for a specific post
 * @param {number} postId - Post ID to fetch replies for
 * @returns {Promise<Object>} - Replies data
 */
export async function fetchReplies(postId) {
    const response = await fetch(`${pythonURI}/api/microblog/reply?postId=${postId}`, {
        ...fetchOptions,
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch replies');
    }

    return await response.json();
}

/**
 * Add a reaction to a post
 * @param {Object} reactionData - Reaction data {postId, reactionType}
 * @returns {Promise<Object>} - Updated post with reactions
 */
export async function addReaction(reactionData) {
    const response = await fetch(`${pythonURI}/api/microblog/reaction`, {
        ...fetchOptions,
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(reactionData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add reaction');
    }

    return await response.json();
}

/**
 * Remove a reaction from a post
 * @param {Object} reactionData - Reaction data {postId, reactionType}
 * @returns {Promise<Object>} - Updated post without reaction
 */
export async function removeReaction(reactionData) {
    const response = await fetch(`${pythonURI}/api/microblog/reaction`, {
        ...fetchOptions,
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(reactionData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove reaction');
    }

    return await response.json();
}
