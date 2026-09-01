(function () {
  var DATA = JSON.parse(document.getElementById('component-data').textContent);
  var FAMILY_ORDER = ['Primitives', 'Chrome', 'Sections', 'Content'];
  var FLAG_LABEL = {
    slots: 'slots',
    image: 'image prop',
    richtext: 'rich text',
    state: 'interactive',
    data: 'fetches data',
  };

  var state = {
    q: '',
    fams: new Set(),
    flags: new Set(),
    id: null,
    tab: 'jsx',
  };

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function el(id) {
    return document.getElementById(id);
  }

  /* ---------------- syntax highlighting ---------------- */
  var GRAMMAR = {
    jsx: [
      ['com', /\/\/[^\n]*/],
      ['str', /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/],
      [
        'kw',
        /\b(?:import|from|export|default|const|let|var|function|return|if|else|null|true|false|new|typeof|Boolean|Array|Number|String|Math|JSON|Intl)\b/,
      ],
      ['tag', /<\/?[A-Za-z][\w.]*|\/>/],
      ['num', /\b\d+(?:\.\d+)?\b/],
    ],
    yml: [
      ['com', /#[^\n]*/],
      ['key', /^\s*[\w$-]+(?=:)/],
      ['str', /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/],
      ['kw', /\b(?:true|false|null)\b/],
      ['num', /(?<=\s)\d+(?:\.\d+)?\b/],
    ],
    mocks: [
      ['key', /"(?:[^"\\]|\\.)*"(?=\s*:)/],
      ['str', /"(?:[^"\\]|\\.)*"/],
      ['kw', /\b(?:true|false|null)\b/],
      ['num', /-?\b\d+(?:\.\d+)?\b/],
    ],
  };
  var RX = {};
  Object.keys(GRAMMAR).forEach(function (k) {
    RX[k] = new RegExp(
      GRAMMAR[k]
        .map(function (r) {
          return '(?<' + r[0] + '>' + r[1].source + ')';
        })
        .join('|'),
      'g',
    );
  });

  // Highlight line by line: no token in this corpus spans a newline, so this is
  // safe and guarantees we never emit a span that straddles a line boundary.
  function highlight(code, lang) {
    var rx = RX[lang];
    return code
      .split('\n')
      .map(function (line, i) {
        var out = '',
          last = 0,
          m;
        rx.lastIndex = 0;
        while ((m = rx.exec(line)) !== null) {
          if (m[0] === '') {
            rx.lastIndex++;
            continue;
          }
          out += esc(line.slice(last, m.index));
          var cls = Object.keys(m.groups).find(function (g) {
            return m.groups[g] !== undefined;
          });
          out += '<span class="tk-' + cls + '">' + esc(m[0]) + '</span>';
          last = m.index + m[0].length;
        }
        out += esc(line.slice(last));
        return (
          '<span class="ln" data-n="' +
          (i + 1) +
          '">' +
          (out || '​') +
          '</span>'
        );
      })
      .join('');
  }

  /* ---------------- filtering ---------------- */
  function matches(c) {
    if (state.fams.size && !state.fams.has(c.family)) return false;
    for (var f of state.flags) if (!c.flags[f]) return false;
    if (!state.q) return true;
    var q = state.q.toLowerCase();
    if (c.id.indexOf(q) > -1) return true;
    if (c.name.toLowerCase().indexOf(q) > -1) return true;
    if (c.description.toLowerCase().indexOf(q) > -1) return true;
    if (
      c.props.some(function (p) {
        return p.name.toLowerCase().indexOf(q) > -1;
      })
    )
      return true;
    if (
      c.slots.some(function (s) {
        return s.toLowerCase().indexOf(q) > -1;
      })
    )
      return true;
    return false;
  }

  // Results in the order the rail renders them, so the boot selection and the
  // fallback after a filter change always agree with what the reader sees.
  function orderedHits() {
    var hits = DATA.filter(matches);
    return FAMILY_ORDER.reduce(function (acc, fam) {
      return acc.concat(
        hits.filter(function (c) {
          return c.family === fam;
        }),
      );
    }, []).concat(
      hits.filter(function (c) {
        return FAMILY_ORDER.indexOf(c.family) === -1;
      }),
    );
  }

  /* ---------------- rail ---------------- */
  function renderRail() {
    var hits = orderedHits();
    el('rail-count').textContent =
      hits.length + (hits.length === 1 ? ' result' : ' results');
    var active = state.fams.size || state.flags.size || state.q;
    el('rail-sub').textContent = active ? 'filtered' : 'all';
    el('reset').hidden = !active;

    if (!hits.length) {
      el('results').innerHTML =
        '<p class="empty">Nothing matches <b>' +
        esc(state.q || 'these filters') +
        '</b>. Try a shorter term, or clear the filters above.</p>';
      return;
    }

    var html = '';
    FAMILY_ORDER.forEach(function (fam) {
      var group = hits.filter(function (c) {
        return c.family === fam;
      });
      if (!group.length) return;
      html +=
        '<div class="group-label">' +
        esc(fam) +
        ' &middot; ' +
        group.length +
        '</div><ul>';
      group.forEach(function (c) {
        var dots = Object.keys(FLAG_LABEL)
          .filter(function (f) {
            return c.flags[f];
          })
          .map(function () {
            return '<i class="dot"></i>';
          })
          .join('');
        html +=
          '<li><button class="entry" data-id="' +
          esc(c.id) +
          '" aria-current="' +
          (c.id === state.id) +
          '">' +
          '<span class="en">' +
          esc(c.name) +
          '</span>' +
          '<span class="em"><span>' +
          esc(c.id) +
          '</span>' +
          '<span class="dotrow">' +
          dots +
          '</span></span></button></li>';
      });
      html += '</ul>';
    });
    el('results').innerHTML = html;

    if (
      !hits.some(function (c) {
        return c.id === state.id;
      })
    )
      select(hits[0].id, false);
  }

  /* ---------------- detail ---------------- */
  function renderDetail() {
    var c = DATA.find(function (x) {
      return x.id === state.id;
    });
    if (!c) {
      el('detail').innerHTML = '';
      return;
    }

    var facts = [
      ['Props', c.props.length],
      [
        'Required',
        c.props.filter(function (p) {
          return p.required;
        }).length,
      ],
      ['Slots', c.slots.length],
      ['Mocks', c.mocks.length],
      ['Lines', c.lines],
      ['On pages', c.usedOn.length],
    ]
      .map(function (f) {
        return (
          '<div class="fact"><dt>' +
          f[0] +
          '</dt><dd' +
          (f[1] === 0 ? ' class="none"' : '') +
          '>' +
          (f[1] === 0 ? '&mdash;' : f[1]) +
          '</dd></div>'
        );
      })
      .join('');

    var propRows = c.props.length
      ? c.props
          .map(function (p) {
            return (
              '<tr><td class="pname">' +
              esc(p.name) +
              '</td>' +
              '<td><span class="kind" data-k="' +
              esc(p.kind) +
              '">' +
              esc(p.kind) +
              '</span>' +
              (p.enum.length
                ? '<div class="enums">' +
                  p.enum
                    .map(function (e) {
                      return '<span>' + esc(e) + '</span>';
                    })
                    .join('') +
                  '</div>'
                : '') +
              '</td>' +
              '<td>' +
              (p.required ? '<span class="req">req</span>' : '') +
              '</td>' +
              '<td class="ex">' +
              esc(
                p.example.length > 120
                  ? p.example.slice(0, 120) + '…'
                  : p.example,
              ) +
              '</td></tr>'
            );
          })
          .join('')
      : '';

    var tabs = [
      ['jsx', 'index.jsx'],
      ['yml', 'component.yml'],
      ['mocks', 'mocks.json'],
    ];

    el('detail').innerHTML =
      '<button class="back" id="back">&larr; All components</button>' +
      '<div class="dhead">' +
      '<div class="dtitle"><h2>' +
      esc(c.name) +
      '</h2>' +
      '<code class="machine">' +
      esc(c.id) +
      '</code>' +
      '<span class="fam">' +
      esc(c.family) +
      '</span></div>' +
      '<p class="desc">' +
      esc(c.description) +
      '</p>' +
      '</div>' +
      '<dl class="facts">' +
      facts +
      '</dl>' +
      (c.props.length
        ? '<section class="sect"><h3>Props<span class="hint">' +
          'set in the Canvas editor</span></h3><div class="tablewrap"><table>' +
          '<thead><tr><th>Name</th><th>Type</th><th></th><th>Example</th></tr></thead>' +
          '<tbody>' +
          propRows +
          '</tbody></table></div></section>'
        : '') +
      '<section class="sect"><h3>Slots<span class="hint">' +
      'where other components go</span></h3>' +
      (c.slots.length
        ? '<div class="pills">' +
          c.slots
            .map(function (s) {
              return '<span class="pill">' + esc(s) + '</span>';
            })
            .join('') +
          '</div>'
        : '<p class="noslots">No slots &mdash; this component takes props only.</p>') +
      '</section>' +
      '<section class="sect"><h3>Workbench mocks<span class="hint">preview states</span></h3>' +
      '<div class="pills">' +
      c.mocks
        .map(function (m) {
          return '<span class="pill plain">' + esc(m) + '</span>';
        })
        .join('') +
      '</div></section>' +
      (c.usedOn.length
        ? '<section class="sect"><h3>Used on</h3><div class="usedon">' +
          c.usedOn
            .map(function (u) {
              return '<a>' + esc(u) + '</a>';
            })
            .join('') +
          '</div></section>'
        : '') +
      '<section class="sect"><h3>Source</h3><div class="codebox">' +
      '<div class="codebar" role="tablist">' +
      tabs
        .map(function (t) {
          return (
            '<button class="ctab" role="tab" data-tab="' +
            t[0] +
            '" aria-selected="' +
            (state.tab === t[0]) +
            '">' +
            t[1] +
            '</button>'
          );
        })
        .join('') +
      '<button class="copy" id="copy">Copy</button>' +
      '</div>' +
      '<pre class="code" id="codeout"><code></code></pre>' +
      '</div></section>';

    paintCode();
    var back = el('back');
    if (back)
      back.addEventListener('click', function () {
        document.body.dataset.view = 'list';
      });
  }

  function paintCode() {
    var c = DATA.find(function (x) {
      return x.id === state.id;
    });
    var out = el('codeout');
    if (!c || !out) return;
    out.querySelector('code').innerHTML = highlight(
      c.src[state.tab],
      state.tab,
    );
    out.scrollTop = 0;
  }

  /* ---------------- selection ---------------- */
  function select(id, scroll) {
    state.id = id;
    if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    document.querySelectorAll('.entry').forEach(function (b) {
      b.setAttribute('aria-current', String(b.dataset.id === id));
    });
    renderDetail();
    if (scroll) {
      var cur = document.querySelector('.entry[aria-current="true"]');
      if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
    }
  }

  function toast(msg) {
    var t = el('toast');
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(t._h);
    t._h = setTimeout(function () {
      t.classList.remove('on');
    }, 1600);
  }

  /* ---------------- counts ---------------- */
  el('wm-count').textContent = DATA.length + ' components';
  FAMILY_ORDER.forEach(function (f) {
    document.querySelector('[data-c="' + f + '"]').textContent = DATA.filter(
      function (c) {
        return c.family === f;
      },
    ).length;
  });
  Object.keys(FLAG_LABEL).forEach(function (f) {
    document.querySelector('[data-f="' + f + '"]').textContent = DATA.filter(
      function (c) {
        return c.flags[f];
      },
    ).length;
  });

  /* ---------------- events ---------------- */
  el('q').addEventListener('input', function (e) {
    state.q = e.target.value.trim();
    el('searchwrap').classList.toggle('has-value', !!state.q);
    renderRail();
  });
  el('clearq').addEventListener('click', function () {
    el('q').value = '';
    state.q = '';
    el('searchwrap').classList.remove('has-value');
    renderRail();
    el('q').focus();
  });

  document.querySelectorAll('[data-fam]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.fam;
      state.fams.has(f) ? state.fams.delete(f) : state.fams.add(f);
      b.setAttribute('aria-pressed', String(state.fams.has(f)));
      renderRail();
    });
  });
  document.querySelectorAll('[data-flag]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.flag;
      state.flags.has(f) ? state.flags.delete(f) : state.flags.add(f);
      b.setAttribute('aria-pressed', String(state.flags.has(f)));
      renderRail();
    });
  });
  el('reset').addEventListener('click', function () {
    state.fams.clear();
    state.flags.clear();
    state.q = '';
    el('q').value = '';
    el('searchwrap').classList.remove('has-value');
    document.querySelectorAll('[data-fam],[data-flag]').forEach(function (b) {
      b.setAttribute('aria-pressed', 'false');
    });
    renderRail();
  });

  el('results').addEventListener('click', function (e) {
    var b = e.target.closest('.entry');
    if (!b) return;
    select(b.dataset.id, false);
    document.body.dataset.view = 'detail';
  });

  el('detail').addEventListener('click', function (e) {
    var tab = e.target.closest('.ctab');
    if (tab) {
      state.tab = tab.dataset.tab;
      document.querySelectorAll('.ctab').forEach(function (t) {
        t.setAttribute('aria-selected', String(t.dataset.tab === state.tab));
      });
      paintCode();
      return;
    }
    if (e.target.closest('#copy')) {
      var c = DATA.find(function (x) {
        return x.id === state.id;
      });
      var text = c.src[state.tab];
      var btn = e.target.closest('#copy');
      var done = function () {
        btn.textContent = 'Copied';
        btn.dataset.done = '1';
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.dataset.done = '';
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          toast(
            'Copy blocked by the browser — select the code and copy manually.',
          );
        });
      } else {
        toast(
          'Copy blocked by the browser — select the code and copy manually.',
        );
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== el('q')) {
      e.preventDefault();
      el('q').focus();
      el('q').select();
      return;
    }
    if (e.key === 'Escape' && document.activeElement === el('q')) {
      el('q').blur();
      return;
    }
    if (
      (e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
      document.activeElement !== el('q')
    ) {
      var ids = [].map.call(document.querySelectorAll('.entry'), function (b) {
        return b.dataset.id;
      });
      var i = ids.indexOf(state.id);
      if (i === -1) return;
      e.preventDefault();
      var next =
        ids[
          e.key === 'ArrowDown'
            ? Math.min(i + 1, ids.length - 1)
            : Math.max(i - 1, 0)
        ];
      if (next) select(next, true);
    }
  });

  var themeBtn = el('theme');
  themeBtn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var isDark = cur
      ? cur === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('ci-theme', next);
    } catch (err) {
      /* storage unavailable */
    }
  });
  try {
    var saved = localStorage.getItem('ci-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch (err) {
    /* storage unavailable */
  }

  /* ---------------- boot ---------------- */
  var initial = decodeURIComponent(location.hash.slice(1));
  state.id = DATA.some(function (c) {
    return c.id === initial;
  })
    ? initial
    : orderedHits()[0].id;
  document.body.dataset.view = window.matchMedia('(max-width: 900px)').matches
    ? 'list'
    : 'detail';
  renderRail();
  renderDetail();
})();
