export type TokenKind = 'kw' | 'fn' | 'str' | 'text';
export type Token = [text: string, kind: TokenKind];

export interface Snippet {
  /** Project slug (see projects.ts) the snippet comes from. */
  project: string;
  /** Short project name for the window's link. */
  short: string;
  /** Source file and line range the excerpt was copied from. */
  file: string;
  language: string;
  lines: Token[][];
}

interface Excerpt extends Omit<Snippet, 'lines'> {
  /** Verbatim lines from the repo (only the common indentation is removed). */
  code: string[];
}

const KEYWORDS: Record<string, Set<string>> = {
  python: new Set(['def', 'if', 'for', 'in', 'is', 'return', 'continue', 'not', 'and', 'or', 'else', 'None', 'True', 'False']),
  typescript: new Set(['if', 'await', 'const', 'return', 'new', 'throw', 'else', 'null']),
};

/** Groups: 1 comment, 2 string, 3 word. Anything else is plain text. */
const TOKEN = /(#.*|\/\/.*)|(f?"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|([A-Za-z_]\w*)|\s+|./g;

/** Minimal highlighter: keywords, strings and names that are called or defined. */
function tokenize(line: string, language: string): Token[] {
  const tokens: Token[] = [];
  const push = (text: string, kind: TokenKind) => {
    const last = tokens[tokens.length - 1];
    if (last && last[1] === kind) last[0] += text;
    else tokens.push([text, kind]);
  };
  for (const match of line.matchAll(TOKEN)) {
    const [text, comment, string, word] = match;
    if (comment) push(text, 'text');
    else if (string) push(text, 'str');
    else if (word) {
      const called = line[(match.index ?? 0) + word.length] === '(';
      push(text, KEYWORDS[language]?.has(word) ? 'kw' : called ? 'fn' : 'text');
    } else push(text, 'text');
  }
  return tokens;
}

/**
 * Excerpts copied verbatim from the projects' own source, typed out in the
 * hero window. Keep `file` (path:lines) in sync with `code`.
 */
const excerpts: Excerpt[] = [
  {
    project: 'tech-rag',
    short: 'Tech RAG',
    file: 'inference_network.py:61-67',
    language: 'python',
    code: [
      'for term in query_terms:',
      '    p_rk_di = self.link_weight(term, doc_id)',
      '    if p_rk_di == 0.0:',
      '        continue',
      '    p_q_rk = self.query_term_weight(term, query_terms)',
      '    belief_of_no_evidence *= 1 - p_rk_di * p_q_rk',
      'return 1 - belief_of_no_evidence',
    ],
  },
  {
    project: 'multiagent-code-generator',
    short: 'Multiagent',
    file: 'docker_runner.py:43-48',
    language: 'python',
    code: [
      'network_mode="none",',
      'mem_limit=settings.sandbox_mem_limit,',
      'nano_cpus=settings.sandbox_cpu_nanos,',
      'pids_limit=settings.sandbox_pids_limit,',
      'security_opt=["no-new-privileges:true"],',
      'cap_drop=["ALL"],',
    ],
  },
  {
    project: 'guildwork',
    short: 'GuildWork',
    file: 'auth.ts:139-144',
    language: 'typescript',
    code: [
      'if (stored.revokedAt) {',
      '  await prisma.refreshToken.updateMany({',
      '    where: { userId: stored.userId, revokedAt: null },',
      '    data: { revokedAt: new Date() }',
      '  });',
      '  clearRefreshCookie(res);',
    ],
  },
  {
    project: 'captive-portal',
    short: 'Captive Portal',
    file: 'users.py:29-32',
    language: 'python',
    code: [
      'if salt is None:',
      '    salt = secrets.token_bytes(16)',
      'dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, _PBKDF2_ITERATIONS)',
      'return f"{_PBKDF2_ALGO}${_PBKDF2_ITERATIONS}${salt.hex()}${dk.hex()}"',
    ],
  },
  {
    project: 'hexarena',
    short: 'HexArena',
    file: 'ai.py:80-84',
    language: 'python',
    code: [
      'if use_rave:',
      '    rv = self.rave_v.get(child.move, 0)',
      '    rq = self.rave_w.get(child.move, 0) / rv if rv else 0.0',
      '    beta = math.sqrt(RAVE_K / (RAVE_K + 3.0 * child.visits))',
      '    score = (1 - beta) * q + beta * rq + u',
    ],
  },
];

export const snippets: Snippet[] = excerpts.map(({ code, ...rest }) => ({
  ...rest,
  lines: code.map((line) => tokenize(line, rest.language)),
}));
