// Copyright 2009 Google Inc. All Rights Reserved.

goog.require('goog.dom');
goog.require('goog.ui.Zippy');


/**
 * Iterates over a list of note data objects, creates a Note instance
 * for each one, and tells the instance to build its DOM structure.
 * @param {Array.<Object>} data The notes data.
 * @param {Element} noteContainer The element under which DOM nodes for
 *     the notes should be added.
 * @return {Array.<tutorial.notepad.Note>} An array containing the resulting
 *     instances.
 */
tutorial.notepad.makeNotes = function(data, noteContainer) {
  var notes = [];
  for (var i = 0; i < data.length; i++) {
    var note = new tutorial.notepad.Note(data[i], noteContainer);
    notes.push(note);
    note.makeNoteDom();
  }
  return notes;
};



/**
 * Manages the data and interface for a single note.
 * @param {Array.<Object>} data The data for a single note.
 * @param {Element} noteContainer The element under which DOM nodes for
 *     the notes should be added.
 * @constructor
 */
tutorial.notepad.Note = function(data, noteContainer) {
  this.title = data.title;
  this.content = data.content;
  this.parent = noteContainer;
};


/**
 * Creates the DOM structure for the note and adds it to the document.
 */
tutorial.notepad.Note.prototype.makeNoteDom = function() {
  // Create DOM structure to represent the note.
  this.headerElement = goog.dom.createDom('div', null, this.title);
  this.contentElement = goog.dom.createDom('div', null, this.content);

  // Create the editor text area and save button.
  this.editorElement = goog.dom.createDom('textarea');
  var saveBtn = goog.dom.createDom('input',
      {'type': 'button', 'value': 'Save'});
  this.editorContainer = goog.dom.createDom('div', {'style': 'display:none;'},
      this.editorElement, saveBtn);

  this.contentContainer = goog.dom.createDom('div', null,
      this.contentElement, this.editorContainer);

  // Wrap the editor and the content div in a single parent so they can
  // be toggled in unison.
  var newNote = goog.dom.createDom('div', null,
      this.headerElement, this.contentContainer);

  // Add the note's DOM structure to the document.
  this.parent.appendChild(newNote);

  // Attach the Zippy behavior.
  this.zippy = new goog.ui.Zippy(this.headerElement, this.contentContainer);
};
