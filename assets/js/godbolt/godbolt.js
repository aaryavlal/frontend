/**
 * Godbolt Compiler Explorer API Handler
 *
 * Exposes a function to compile and execute C/Rust code using godbolt.org
 * Supports file paths + raw plaintext as input.
 */

const GODBOLT_API_BASE = 'https://godbolt.org/api';

/**
 * Compiles and executes C code using the Godbolt API.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.source] - Raw C source code (use this OR filePath, not both)
 * @param {string} [options.filePath] - Path to a C source file (use this OR source, not both)
 * @param {string} [options.compiler=''] - Compiler ID (prefer 'cg152' or 'r190')
 * @param {string} [options.userArguments=''] - Compiler arguments (e.g., '-O3 -Wall')
 * @param {string[]} [options.args=[]] - Command line arguments for the executed program
 * @param {string} [options.stdin=''] - Standard input to provide to the program
 * @param {Object[]} [options.env=[]] - Environment variables as [{name, value}]
 * @param {Object[]} [options.libraries=[]] - Libraries as [{id, version}]
 * @param {string} [options.lang=''] - Language ('c' or 'rust')
 * @returns {Promise<Object>} - The API response containing execution results
 */
export async function executeCode(options = {}) {
    const {
        source,
        compiler = '',
        userArguments = '',
        args = [],
        stdin = '',
        env = [],
        libraries = [],
        lang = ''
    } = options;

    // Must have source
    if (!source) {
        throw new Error('Must provide "source"');
    }

    // Build runtime tools for env vars
    const runtimeTools = env.length > 0 ? [{
        name: 'env',
        options: env.map(e => ({ name: e.name, value: e.value }))
    }] : [];

    // Build request payload
    const payload = {
        source,
        compiler: compiler,
        options: {
            userArguments: userArguments,
            executeParameters: {
                args: args,
                stdin: stdin,
                runtimeTools: runtimeTools
            },
            compilerOptions: {
                executorRequest: true
            },
            filters: {
                execute: true
            },
            tools: [],
            libraries: libraries
        },
        lang: lang,
        allowStoreCodeDebug: true
    };

    // Make API request
    const response = await fetch(`${GODBOLT_API_BASE}/compiler/${compiler}/compile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Godbolt API error (${response.status}): ${errorText}`);
    }

    return await response.json();
}

/**
 * Public function to parse Godbolt result automatically
 * @param {Object} result - The API response
 */
export function getResult(result) {
    if (result.buildResult.code != 0) {
        return getStderr(result);
    } else if (getExitCode(result) != 0) {
        return getExitCode(result) + getStderr(result);
    } else {
        return getStdout(result);
    }
}

/**
 * Helper to extract stdout from the execution result
 * @param {Object} result - The API response
 * @returns {string} - The stdout output
 */
function getStdout(result) {
    const stdout = result.stdout ?? result.execResult?.stdout;
    if (stdout && Array.isArray(stdout)) {
        return stdout.map(line => line.text).join('\n');
    }
    return '';
}

/**
 * Helper to extract stderr from the execution result
 * @param {Object} result - The API response
 * @returns {string} - The stderr output
 */
function getStderr(result) {
    const stderr = result.stderr;
    if (stderr && Array.isArray(stderr)) {
        return stderr.map(line => line.text).join('\n') + result.buildResult.stderr.map(line => line.text).join('\n');
    }
    return '';
}

/**
 * Helper to get the exit code from the execution result
 * @param {Object} result - The API response
 * @returns {number|null} - The exit code, or null if not available
 */
function getExitCode(result) {
    return result.code ?? result.execResult?.code ?? null;
}

export async function executeCodeFile(options = {}) {
    const { filePath, ...rest } = options;

    // Fetch file internally
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${filePath}`);
    }
    const source = await response.text();

    return executeCode({ source, ...rest });
}

window.Godbolt = {
    executeCode,
    getResult,
    executeCodeFile,
}
