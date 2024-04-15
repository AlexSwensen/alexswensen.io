---
layout: post
title: 'Github Actions Scripts'
author: [Alexander Swensen]
tags: ['Linux', 'Apple']
date: '2024-04-10T17:13:00-05:00'
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

