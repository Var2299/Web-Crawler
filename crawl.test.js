const { normalizeURL, getURLsFromHtml } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip http', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getsURLsFromHtml', () => {
    const inputHTMLBody = `
    <html>
        <body>
           <a href = "https://blog.boot.dev">
                           boot.dev Blog
            </a>
           </body>
      </html>

    `
    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})
test('getsURLsFromHtml relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
           <a href = "/path/">
                           boot.dev Blog
            </a>
           </body>
      </html>

    `
    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})
test('getsURLsFromHtml both', () => {
    const inputHTMLBody = `
    <html>
        <body>
           <a href = "https://blog.boot.dev/path1/">
                           boot.dev Blog path one
            </a>
            <a href = "/path2/">
                           boot.dev Blog path two
            </a>
           </body>
      </html>

    `
    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})
test('getsURLsFromHtml both', () => {
    const inputHTMLBody = `
    <html>
        <body>
           <a href = "invalid">
                           Invalid URL
            </a>
           </body>
      </html>

    `
    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})