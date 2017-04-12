(function(exports){
  'use strict';

  /**
   * Utility library to simplify common JavaScript operations.
   *
   * @license
   * Copyright (c) 2017 Brian Edmonds
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */

  var $id = document.getElementById.bind(document);
  exports.$id = $id;

  // Listen for +evt+ on +el+ with callback +fn+.
  /**
   * Shorthand to add an event callback to an element.
   *
   * @param {object} el - Element to bind the event listener to.
   * @param {string} evt - Type of event to listen for. For example 'click'.
   * @param {Function} fn - Callback to invoke.
   */
  function $e(el, evt, fn) { el.addEventListener(evt, fn); };
  exports.$e = $e;

  /**
   * Create a new DOM Element, with optional child elements.
   *
   * @param {string} tagName - Type of element to create.
   * @param {Array} children - (optional) Nodes to insert into the new element.
   * @param {Object} options - (optional) Additional options.
   * @returns {HTMLElement}
   */

  function $mkele(tagName, children, options){
    // Safari, IE and Opera do not support default parameters.
    children = children || [];
    options = options || {};

    var el = document.createElement(tagName);

    if (!$isUndef(options.id)) el.id = options.id;

    if (options.html !== undefined) {
      for (var key in options.html) {
        $set(el, key, options.html[key]);
      }
    }

    if (children === null) return el;

    if (children.constructor === Array) {
      $each(children, function(i){ $dom.add(el, i); });
    } else if(children.constructor === String) {
      $dom.add(el, $mktxt(children));
    }

    return el;
  }
  exports.$mkele = $mkele;

  /**
   * @alias document.createTextNode
   */
  var $mktxt = document.createTextNode.bind(document);
  exports.$mktxt = $mktxt;

  /**
   * @alias document.querySelector
   */
  var $first = document.querySelector.bind(document);
  exports.$first = $first;

  /**
   * @alias document.querySelectorAll
   **/
  var $all   = document.querySelectorAll.bind(document);
  exports.$all = $all;

  /**
   * Shorthand to retrieve an attribute from an element.
   *
   * @param {HTMLElement} element - The element to probe.
   * @params {string} attr - The attribute's name.
   * @returns The attribute's value.
   */
  function $get(element, attr) { return element.getAttribute(attr); }
  exports.$get = $get;

  /**
   * Shorthand to set the value of an attribute on an element.
   *
   * @param {HTMLElement} element - The element to work on.
   * @param {string} attr - The attribute's name.
   * @param value - The value to give to the attribute.
   */
  function $set(element, attr, value) { element.setAttribute(attr, value); }
  exports.$set = $set;

  /**
   * Return true if the supplied argument is undefined.
   * @return {boolean}
   */
  function $isUndef(i) { return (typeof i === 'undefined'); }
  exports.$isUndef = $isUndef;

  /**
   * Return true if the supplied argument is null.
   * @return {boolean}
   */
  function $isNull(i)  { return i === null; }
  exports.$isNull = $isNull;

  /**
   * Run +fn+ for each element of +list+.
   *
   * +fn+ is expected to take one argument, which is an element of +list+.
   *
   * Because it's useful to have forEach functionality on HTMLElement
   * Collections.
   *
   * @param {Iterable} list - List to iterate through.
   * @param {Function} fn - Function taking one argument.
   */
  function $each(list, fn) {
    for (var i = 0, len = list.length; i < len; ++i) {
      fn(list[i]);
    }
  };

  /**
   * Return an array of items built from the return value of +fn+,
   * run once for each member of +list+.
   *
   * +fn+ is expected to take one or two arguments: the fist if the
   * current element of +list+ and the second the current array index.
   *
   * @param {Iterable} list
   * @param {Function} fn
   * @returns {Array} of the same length as +list+.
   **/
  function $map(list, fn) {
    var out = [];

    for (var i = 0, len = list.length; i < len; ++i) {
      out.push(fn(list[i], i));
    }

    return out;
  }
  exports.$map = $map;

  // Aliases for common DOM maniuplations.
  var $dom = {
    add: function(node, child, before) {
      if ($isUndef(before) || $isNull(before)) {
        node.appendChild(child);
      } else {
        node.insertBefore(child, before);
      }
    },

    rm: function(el) {
      if ($isUndef(el) || $isNull(el)) return;

      el.parentNode.removeChild(el);
    }
  };

  exports.$dom = $dom;
})(window);
