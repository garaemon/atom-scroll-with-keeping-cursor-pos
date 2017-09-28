'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'scroll-with-keeping-cursor-pos:scroll-down':
      () => this.scrollDownWithKeepingCursorPosition(),
      'scroll-with-keeping-cursor-pos:scroll-up':
      () => this.scrollUpWithKeepingCursorPosition(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      scrollWithKeepingCursorPosViewState: this.scrollWithKeepingCursorPosView.serialize()
    };
  },

  scrollUpWithKeepingCursorPosition() {
      const editor = atom.workspace.getActiveTextEditor();
      if (!editor.element) {
          return;
      }
      const editorElement = editor.element;
      editorElement.setScrollTop(editorElement.getScrollTop() - editor.getLineHeightInPixels());
      editor.moveUp(1);
  },

  scrollDownWithKeepingCursorPosition() {
      const editor = atom.workspace.getActiveTextEditor();
      if (!editor.element) {
          return;
      }
      const editorElement = editor.element;
      editorElement.setScrollTop(editorElement.getScrollTop() + editor.getLineHeightInPixels());
      editor.moveDown(1);
  },
};
