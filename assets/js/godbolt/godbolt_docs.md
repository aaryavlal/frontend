---
layout: post
title: "Godbolt Compiler Explorer API Handler Docs"
permalink: /godbolt_docs
---

TODO: Actually document

## Usage

### Executing from a .md file w/ editor
```md
<!--Load the required editor files and Godbolt handler-->
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/ace.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-rust.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/mode-c_cpp.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.43.5/src-min/theme-monokai.js"></script>
<script type="module" src="{{site.baseurl}}/assets/js/godbolt/godbolt.js"></script>

<!--From a filepath-->
{% raw %}
{% include editor.html code_path="c/hello.c" lang="c" %}
{% endraw %}

<!--or-->

<!--From inline-->
{% raw %}
{% include editor.html code='fn main() { println!("meow"); }' lang="rust" %}
{% endraw %}
````

### Executing from source code

```js
<script type="module">
  import { executeCode, getStdout, getStderr, getExitCode } from '{{site.baseurl}}/assets/js/godbolt.js';

  executeCode({
      source: '#include <stdio.h>\nint main() { printf("Hello!\\n"); return 0; }',
      compiler: 'cg152', // GCC 15.2
      userArguments: '-O3',
      lang: 'c'
  }).then(result => {
      console.log(getStdout(result));
  });
</script>
```

### Executing from file

```js
<script type="module">
  import { executeCodeFromFile, getStdout } from '{{site.baseurl}}/assets/js/godbolt.js';

  executeCodeFromFile({
      filePath: '{{site.baseurl}}/assets/c/test.c',
      compiler: 'cg152' // GCC 15.2
      userArguments: '-O3',
      lang: 'c'
  }).then(result => {
      console.log(getStdout(result));
  });
</script>
```
