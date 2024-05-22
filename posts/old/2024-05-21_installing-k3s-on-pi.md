---
layout: post
title: 'Github Actions Scripts'
author: [Alexander Swensen]
tags: ['Github', 'Actions', 'Javascript']
date: '2024-04-15T17:13:00-05:00'
draft: true
excerpt: Because there are few things better than inline javascript in your automations!
---

# WIP Notes on installing k3s on pi
  
```bash
  curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION="v1.28.9+k3s1" K3S_KUBECONFIG_MODE="644" sh -

  curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

  chmod 700 get_helm.sh
  ./get_helm.sh

```