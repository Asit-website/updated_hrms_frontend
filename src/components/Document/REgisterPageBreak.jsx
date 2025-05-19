import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class PageBreakBlot extends BlockEmbed {
  static create() {
    const node = super.create();
    node.setAttribute('contenteditable', 'false');
    node.classList.add('ql-page-break');
    return node;
  }
}

PageBreakBlot.blotName = 'page-break';
PageBreakBlot.tagName = 'div';

// Register the custom blot
Quill.register(PageBreakBlot);