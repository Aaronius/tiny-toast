'use strict'

var tinyToast
var deferTimeoutId

function createCssStyleSheet () {
  // code taken from
  // https://davidwalsh.name/add-rules-stylesheets
  const style = document.createElement('style')
  // WebKit hack :(
  // style.appendChild(document.createTextNode(''))
  document.head.appendChild(style)
  return style.sheet
}

function insertStyle (className, sheet, style) {
  // insert a rule for each style property
  Object.keys(style).forEach((key) => {
    const value = style[key]
    sheet.insertRule(`.${className} { ${key}: ${value} }`, 0)
  })
}

function createTinyToastStyle () {
  const className = 'tinyToast'
  const style = {
    color: '#333',
    position: 'fixed',
    bottom: '0em',
    right: '1em',
    'background-color': '#7FFFD4',
    'border-radius': '5px',
    'border-width': '1px',
    'border-color': '#73E1BC',
    'border-style': 'solid',
    padding: '1em 2em',
    'z-index': 1000
  }

  const sheet = createCssStyleSheet()
  insertStyle(className, sheet, style)
  return className
}

function createDom () {
  if (tinyToast) {
    return tinyToast
  }

  const className = createTinyToastStyle()

  tinyToast = document.createElement('h3')
  tinyToast.classList.add(className)
  document.body.appendChild(tinyToast)
  return tinyToast
}

function createMessage (text) {
  createDom().textContent = text
}

function closeMessage () {
  if (tinyToast) {
    document.body.removeChild(tinyToast)
    tinyToast = null
  }
}

function maybeDefer (fn, timeoutMs) {
  clearTimeout(deferTimeoutId)

  if (timeoutMs) {
    deferTimeoutId = setTimeout(fn, timeoutMs)
  } else {
    fn()
  }
}

function hide (timeoutMs) {
  maybeDefer(closeMessage, timeoutMs)
}

var tinyToastApi = {
  show: function show (text) {
    createMessage(text)
    return tinyToastApi
  },
  hide: hide
}

module.exports = tinyToastApi
