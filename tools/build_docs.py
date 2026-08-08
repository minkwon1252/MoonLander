#!/usr/bin/env python3
"""Builds reader-friendly EPUB / PDF / HTML versions of the docs/*.md files.

Markdown renders as raw text in most ebook readers, so the reference documents are also
shipped as EPUB (reflowable, for e-readers) and PDF (fixed, best for the tables).

Usage:  python3 tools/build_docs.py
Needs:  calibre (ebook-convert) for EPUB, Google Chrome for PDF. Both optional —
        whatever is missing is skipped with a warning, and the HTML is always produced.
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DOCS = os.path.join(ROOT, 'docs')

DOCUMENTS = [
    {
        'md': 'TECH_ADVANCE_FORMULA.md',
        'title': 'Tech Race — How Technology Advance Is Calculated',
        'author': 'Selene Program',
    },
]

# Styling aimed at e-ink and small screens: serif body for long-form reading, generous line
# height, and — critically — code blocks that WRAP instead of scrolling off the page, since
# ebook readers have no horizontal scroll.
CSS = """
body { font-family: Georgia, 'Times New Roman', serif; line-height: 1.55;
       margin: 0 auto; padding: 1em; max-width: 42em; color: #111; }
h1 { font-size: 1.7em; line-height: 1.25; border-bottom: 3px solid #1B2A5B;
     padding-bottom: .25em; color: #1B2A5B; page-break-before: avoid; }
h2 { font-size: 1.32em; color: #1B2A5B; margin-top: 1.6em;
     border-bottom: 1px solid #ccc; padding-bottom: .18em; page-break-after: avoid; }
h3 { font-size: 1.1em; color: #33406B; margin-top: 1.2em; page-break-after: avoid; }
p, li { font-size: 1em; }
strong { color: #000; }
blockquote { border-left: 4px solid #D99A1E; background: #FFFBF0;
             margin: 1em 0; padding: .6em 1em; font-style: normal; }
code { font-family: 'DejaVu Sans Mono', Consolas, monospace; font-size: .88em;
       background: #F2F3F7; padding: .1em .3em; border-radius: 3px; }
pre { background: #F2F3F7; border: 1px solid #DDE0EA; border-left: 4px solid #1B2A5B;
      border-radius: 4px; padding: .7em .9em; page-break-inside: avoid; }
/* no horizontal scrolling on an e-reader: wrap long lines instead */
pre code { background: none; padding: 0; font-size: .82em; display: block;
           white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word; }
table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: .86em;
        page-break-inside: avoid; }
th, td { border: 1px solid #C4C9DA; padding: .38em .5em; text-align: left;
         vertical-align: top; }
th { background: #EEF1FA; color: #1B2A5B; }
tr:nth-child(even) td { background: #FAFBFF; }
hr { border: none; border-top: 1px solid #CCC; margin: 1.8em 0; }
ul, ol { padding-left: 1.4em; }
li { margin-bottom: .3em; }
a { color: #1B2A5B; }
"""


def md_to_html_body(md_text):
    """Render Markdown with the extensions this document actually needs."""
    import markdown  # provided by calibre's bundled python, or a system install
    return markdown.markdown(
        md_text,
        extensions=['tables', 'fenced_code', 'sane_lists', 'attr_list', 'toc'],
        output_format='xhtml',
    )


def build_html(md_path, title, out_html):
    with open(md_path, encoding='utf-8') as fh:
        md_text = fh.read()
    body = md_to_html_body(md_text)
    # Drop the anchor-only links Markdown generates for in-page jumps; they do not work in
    # every reader and a dead link is worse than plain text.
    body = re.sub(r'<a href="#[^"]*">([^<]*)</a>', r'\1', body)
    html = (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<!DOCTYPE html>\n'
        '<html xmlns="http://www.w3.org/1999/xhtml"><head>\n'
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n'
        f'<title>{title}</title>\n<style>{CSS}</style>\n</head>\n<body>\n{body}\n</body></html>\n'
    )
    with open(out_html, 'w', encoding='utf-8') as fh:
        fh.write(html)
    return out_html


def build_epub(html_path, out_epub, title, author):
    exe = shutil.which('ebook-convert')
    if not exe:
        print('  ! ebook-convert (calibre) not found — skipping EPUB')
        return None
    cmd = [exe, html_path, out_epub,
           '--title', title, '--authors', author,
           '--language', 'en',
           '--level1-toc', '//h:h1', '--level2-toc', '//h:h2', '--level3-toc', '//h:h3',
           '--page-breaks-before', "//h:h2",
           '--disable-font-rescaling',
           '--no-default-epub-cover']
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print('  ! EPUB conversion failed:\n', r.stdout[-1500:], r.stderr[-1500:])
        return None
    return out_epub


def build_pdf(html_path, out_pdf):
    chrome = shutil.which('google-chrome') or shutil.which('chromium') or shutil.which('chromium-browser')
    if not chrome:
        print('  ! Chrome not found — skipping PDF')
        return None
    with tempfile.TemporaryDirectory() as profile:
        cmd = [chrome, '--headless', '--disable-gpu', '--no-sandbox',
               f'--user-data-dir={profile}',
               '--no-pdf-header-footer',
               f'--print-to-pdf={out_pdf}', 'file://' + os.path.abspath(html_path)]
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    if not os.path.exists(out_pdf):
        print('  ! PDF conversion failed:\n', r.stdout[-800:], r.stderr[-800:])
        return None
    return out_pdf


def main():
    made = []
    for doc in DOCUMENTS:
        md_path = os.path.join(DOCS, doc['md'])
        if not os.path.exists(md_path):
            print(f"  ! missing {md_path}")
            continue
        stem = os.path.splitext(doc['md'])[0]
        print(f"{doc['md']}:")

        html = build_html(md_path, doc['title'], os.path.join(DOCS, stem + '.html'))
        made.append(html)
        print(f"  + {os.path.relpath(html, ROOT)}")

        epub = build_epub(html, os.path.join(DOCS, stem + '.epub'), doc['title'], doc['author'])
        if epub:
            made.append(epub)
            print(f"  + {os.path.relpath(epub, ROOT)}")

        pdf = build_pdf(html, os.path.join(DOCS, stem + '.pdf'))
        if pdf:
            made.append(pdf)
            print(f"  + {os.path.relpath(pdf, ROOT)}")

    for f in made:
        print(f"{os.path.getsize(f) / 1024:8.0f} KB  {os.path.relpath(f, ROOT)}")
    return 0 if made else 1


if __name__ == '__main__':
    sys.exit(main())
