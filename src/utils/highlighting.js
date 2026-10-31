const CPP_KEYWORDS = new Set([
    'int', 'long', 'float', 'double', 'char', 'bool', 'void', 'auto',
    'const', 'static', 'inline', 'virtual', 'override', 'explicit',
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
    'return', 'class', 'struct', 'public', 'private', 'protected',
    'new', 'delete', 'this', 'nullptr', 'NULL', 'true', 'false',
    'using', 'namespace', 'template', 'typename', 'typedef',
    'try', 'catch', 'throw', 'sizeof',
]);

const CPP_TYPES = new Set([
    'vector', 'string', 'unordered_map', 'unordered_set', 'map', 'set',
    'pair', 'queue', 'deque', 'stack', 'priority_queue',
    'list', 'array', 'bitset', 'tuple',
    'ListNode', 'TreeNode', 'Node', 'TrieNode',
    'INT_MAX', 'INT_MIN', 'LLONG_MAX', 'LLONG_MIN',
]);

export function tokenizeCpp(code) {
    const tokens = [];
    let i = 0;

    while (i < code.length) {
        // Whitespace
        if (code[i] === ' ' || code[i] === '\t') {
            let start = i;
            while (i < code.length && (code[i] === ' ' || code[i] === '\t')) i++;
            tokens.push({ type: 'whitespace', value: code.slice(start, i) });
            continue;
        }

        // Newline
        if (code[i] === '\n') {
            tokens.push({ type: 'newline', value: '\n' });
            i++;
            continue;
        }

        // Single-line comment
        if (code[i] === '/' && code[i + 1] === '/') {
            let start = i;
            while (i < code.length && code[i] !== '\n') i++;
            tokens.push({ type: 'comment', value: code.slice(start, i) });
            continue;
        }

        // Multi-line comment
        if (code[i] === '/' && code[i + 1] === '*') {
            let start = i;
            i += 2;
            while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) i++;
            i += 2;
            tokens.push({ type: 'comment', value: code.slice(start, i) });
            continue;
        }

        // Preprocessor
        if (code[i] === '#') {
            let start = i;
            while (i < code.length && code[i] !== '\n') i++;
            tokens.push({ type: 'preprocessor', value: code.slice(start, i) });
            continue;
        }

        // String
        if (code[i] === '"') {
            let start = i;
            i++;
            while (i < code.length && code[i] !== '"') {
                if (code[i] === '\\') i++;
                i++;
            }
            i++;
            tokens.push({ type: 'string', value: code.slice(start, i) });
            continue;
        }

        // Char
        if (code[i] === "'") {
            let start = i;
            i++;
            while (i < code.length && code[i] !== "'") {
                if (code[i] === '\\') i++;
                i++;
            }
            i++;
            tokens.push({ type: 'string', value: code.slice(start, i) });
            continue;
        }

        // Numbers
        if (/[0-9]/.test(code[i]) || (code[i] === '-' && i + 1 < code.length && /[0-9]/.test(code[i + 1]) && (i === 0 || /[\s(,=<>+\-*/%{[]/.test(code[i - 1])))) {
            let start = i;
            if (code[i] === '-') i++;
            while (i < code.length && /[0-9.]/.test(code[i])) i++;
            if (i < code.length && /[eE]/.test(code[i])) {
                i++;
                if (code[i] === '+' || code[i] === '-') i++;
                while (i < code.length && /[0-9]/.test(code[i])) i++;
            }
            tokens.push({ type: 'number', value: code.slice(start, i) });
            continue;
        }

        // Identifiers and keywords
        if (/[a-zA-Z_]/.test(code[i])) {
            let start = i;
            while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) i++;
            const word = code.slice(start, i);

            if (CPP_KEYWORDS.has(word)) {
                tokens.push({ type: 'keyword', value: word });
            } else if (CPP_TYPES.has(word)) {
                tokens.push({ type: 'type', value: word });
            } else if (i < code.length && code[i] === '(') {
                tokens.push({ type: 'function', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }
            continue;
        }

        // Operators and punctuation
        const op2 = code.slice(i, i + 2);
        if (['->','::','<<','>>','<=','>=','==','!=','&&','||','+=','-=','*=','/=','++','--'].includes(op2)) {
            tokens.push({ type: 'operator', value: op2 });
            i += 2;
            continue;
        }

        if ('+-*/%=<>!&|^~?'.includes(code[i])) {
            tokens.push({ type: 'operator', value: code[i] });
            i++;
            continue;
        }

        // Punctuation
        tokens.push({ type: 'punctuation', value: code[i] });
        i++;
    }

    return tokens;
}

export function getTokenClass(type) {
    switch (type) {
        case 'keyword': return 'token-keyword';
        case 'type': return 'token-type';
        case 'string': return 'token-string';
        case 'number': return 'token-number';
        case 'operator': return 'token-operator';
        case 'punctuation': return 'token-punctuation';
        case 'function': return 'token-function';
        case 'comment': return 'token-comment';
        case 'preprocessor': return 'token-preprocessor';
        default: return '';
    }
}

