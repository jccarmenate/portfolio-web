export type TokenKind = 'kw' | 'fn' | 'str' | 'text';
export type Token = [text: string, kind: TokenKind];

export interface Snippet {
  /** Project slug (see projects.ts) the snippet comes from. */
  project: string;
  file: string;
  language: string;
  lines: Token[][];
}

/** Short excerpts from the featured projects, typed out in the hero window. */
export const snippets: Snippet[] = [
  {
    project: 'tech-rag',
    file: 'retriever.py',
    language: 'python',
    lines: [
      [['def ', 'kw'], ['noisy_or', 'fn'], ['(query, index):', 'text']],
      [['    p_irrelevant = 1.0', 'text']],
      [['    ', 'text'], ['for ', 'kw'], ['term ', 'text'], ['in ', 'kw'], ['query.terms:', 'text']],
      [['        w = index[term].weight', 'text']],
      [['        p_irrelevant *= (1 - w)', 'text']],
      [['    ', 'text'], ['return ', 'kw'], ['1 - p_irrelevant', 'text']],
    ],
  },
  {
    project: 'multiagent-code-generator',
    file: 'graph.py',
    language: 'python',
    lines: [
      [['graph = ', 'text'], ['StateGraph', 'fn'], ['(AgentState)', 'text']],
      [['graph.', 'text'], ['add_node', 'fn'], ['(', 'text'], ['"architect"', 'str'], [', architect_agent)', 'text']],
      [['graph.', 'text'], ['add_node', 'fn'], ['(', 'text'], ['"coder"', 'str'], [', coder_agent)', 'text']],
      [['graph.', 'text'], ['add_edge', 'fn'], ['(', 'text'], ['"architect"', 'str'], [', ', 'text'], ['"coder"', 'str'], [')', 'text']],
      [['graph.', 'text'], ['set_entry_point', 'fn'], ['(', 'text'], ['"architect"', 'str'], [')', 'text']],
    ],
  },
  {
    project: 'guildwork',
    file: 'auth.ts',
    language: 'typescript',
    lines: [
      [['function ', 'kw'], ['rotateToken', 'fn'], ['(old: string) {', 'text']],
      [['  const p = ', 'text'], ['verify', 'fn'], ['(old, SECRET)', 'text']],
      [['  ', 'text'], ['if ', 'kw'], ['(isRevoked(p.jti)) ', 'text'], ['throw ', 'kw'], ['new AuthError(', 'text'], ['"reuse"', 'str'], [')', 'text']],
      [['  revoke(p.jti)', 'text']],
      [['  ', 'text'], ['return ', 'kw'], ['issuePair(p.userId)', 'text']],
      [['}', 'text']],
    ],
  },
  {
    project: 'captive-portal',
    file: 'portal.py',
    language: 'python',
    lines: [
      [['def ', 'kw'], ['authorize', 'fn'], ['(ip, mac, password):', 'text']],
      [['    h = ', 'text'], ['pbkdf2_hmac', 'fn'], ['(', 'text'], ['"sha256"', 'str'], [', password, SALT)', 'text']],
      [['    ', 'text'], ['if not ', 'kw'], ['compare_digest(h, stored_hash(mac)):', 'text']],
      [['        ', 'text'], ['raise ', 'kw'], ['AuthError(', 'text'], ['"denied"', 'str'], [')', 'text']],
      [['    ipset.add(', 'text'], ['"authorized"', 'str'], [', ip, mac)', 'text']],
    ],
  },
  {
    project: 'hexarena',
    file: 'mcts.py',
    language: 'python',
    lines: [
      [['def ', 'kw'], ['select', 'fn'], ['(node):', 'text']],
      [['    def ', 'kw'], ['score', 'fn'], ['(c):', 'text']],
      [['        ', 'text'], ['return ', 'kw'], ['c.rave + C * ucb(node, c)', 'text']],
      [['    ', 'text'], ['return ', 'kw'], ['max(node.children, key=score)', 'text']],
    ],
  },
];
