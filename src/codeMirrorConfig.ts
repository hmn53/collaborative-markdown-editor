import {
    autocompletion,
    closeBrackets,
    closeBracketsKeymap,
    completionKeymap,
  } from "@codemirror/autocomplete";
  import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
  import {
    defaultHighlightStyle,
    indentOnInput,
    syntaxHighlighting,
  } from "@codemirror/language";
  import { lintKeymap } from "@codemirror/lint";
  import { searchKeymap } from "@codemirror/search";
  import { EditorState } from "@codemirror/state";
  import {
    EditorView,
    crosshairCursor,
    drawSelection,
    dropCursor,
    highlightSpecialChars,
    keymap,
    rectangularSelection,
  } from "@codemirror/view";
  
  export const basicSetup = [
    highlightSpecialChars(),
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...completionKeymap,
      ...lintKeymap,
    ]),
  ];
  
  export const theme = EditorView.theme({
    "&": {
      fontSize: "13pt",
      border: "1px solid #e8e8e8",
      padding: "8px",
      backgroundColor: "#fafafa",
      borderRadius: "6px",
    },
    "&.cm-focused": {
      outline: "none",
      border: "1px solid #d0d0d0",
    },
    ".cm-content": {
      fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    },
  });