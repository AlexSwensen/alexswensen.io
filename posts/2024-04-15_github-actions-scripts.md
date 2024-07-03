---
layout: post
title: 'Github Actions Scripts'
author: [Alexander Swensen]
tags: ['Github', 'Actions', 'Javascript']
date: '2024-04-15T17:13:00-05:00'
draft: false
excerpt: Because there are few things better than inline javascript in your automations!
---

Github actions, like many CI/CD tools, are a great way to automate your workflow. They are easy to set up, and can be as simple or as complex as you need them to be. They are also free for public repositories, which is great for open source projects.

One of the things I like about Github actions is that you can write your scripts in a variety of languages. You can use bash, python, ruby, etc. But one of the things I like the most is that you can write your scripts in javascript. This is great because I am a javascript developer, and I like to write my scripts in javascript.

Here is an example of a simple Github action that runs a script in javascript:

```yaml
name: My Workflow
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a one-line script
        run: node -e "console.log('Hello, world!')"
```

It only gets better from here though. You can write your scripts in javascript, and then use them in your workflow. Here is an example of a simple Github action that runs a script in javascript:

```yaml
name: My Workflow
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a script
        run: node my-script.js
```

So far we have been using raw javascript, and executing node directly, but github provides an action to inline javascript, and use it in your workflow. Here we will introduce the `actions/github-script` action:

```yaml
name: My Workflow
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a script
        uses: actions/github-script@v7
        with:
          script: |
            console.log('Hello, world!')
```

This is where things start to get fun. I would highly recommend reading up on the [documentation](https://github.com/actions/github-script) for the `actions/github-script` action, as it is very powerful. You can use it to interact with the Github API, and do all sorts of cool things.

Finally,  if you are using ECMAScript modules, you can use the built in `import()` function to import modules and call scripts built within your repository. (you could use require if you are using commonJS).

Note: be sure to add `type: module` to your `package.json` file if you are using ECMAScript modules.

This is my favorite way to write scripts in Github actions, as it allows me to write my scripts in a modular way, keep them organized, and allows for easy local debugging, while still deploying them in a CI/CD environment.

```yaml
name: My Workflow
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a script from a module in the repository
        uses: actions/github-script@v7
        with:
          script: |
            const myScript = await import('${{ github.workspace }}/my-script.js')
            myScript();
```

```javascript
// my-script.js
export function myScript() {
  console.log('Hello, world!');
}
```

You can also use the return value of the script in your workflow. Just be sure the step that runs your script has an id. Here is an example of how you can do that:

```yaml

name: My Workflow
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a script from a module in the repository
        id: my-script
        uses: actions/github-script@v7
        with:
          script: |
            const myScript = await import('${{ github.workspace }}/my-script.js')
            return myScript();
      - name: Get the return value of the script
        run: echo "${{ steps.my-script.outputs.result }}"
```

```javascript
// my-script.js
export function myScript() {
  return 'Hello, world!';
}
```

I hope this helps you get started with Github actions, and I hope you enjoy writing your scripts in javascript as much as I do!
