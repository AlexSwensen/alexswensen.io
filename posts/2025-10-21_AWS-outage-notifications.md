---
layout: post
title: 'AWS Outage Notifications with Home Assistant'
author: [Alexander Swensen]
tags: ['Home Assistant', 'AWS', 'Home Automation', 'Homelab']
image: /img/post-banners/cable-unplugged.jpg
date: '2025-10-21T21:00:00-05:00'
draft: false
excerpt: It's important to know when your cloud provider is having issues. 😮‍💨 US_EAST_1
---

So, we all saw [the recent AWS outage](https://health.aws.amazon.com/health/status?eventID=arn:aws:health:us-east-1::event/MULTIPLE_SERVICES/AWS_MULTIPLE_SERVICES_OPERATIONAL_ISSUE/AWS_MULTIPLE_SERVICES_OPERATIONAL_ISSUE_BA540_514A652BE1A) that affected a large portion of the internet. If you run services on AWS, it's crucial to be aware of such outages as soon as they happen.
Normally I would have set up a service in AWS to alert me, but what happens when AWS itself is down? Well, the simple answer is I self-host my own stuff. While AWS being down is unlikely, the chance of my homelab AND AWS being down at the same time is even more unlikely. The simplest solution I could think of was to use [Home Assistant](https://www.home-assistant.io/) to monitor AWS status and notify me if there are any issues. I implemented this while the outage was still ongoing, so I could test it in real-time.

I also didn't really want to have to rely on AWS API keys as well, so I chose to check the AWS Status page RSS feed instead. This way, I don't have to worry about managing API keys or permissions, but I can still get timely updates on AWS service status (at least when they post them to the RSS feed).

If you aren't familiar with [Home Assistant](https://www.home-assistant.io/), it's an open-source home automation platform that allows you to control and automate various smart devices and services in your home. One of its features is the ability to create automations based on various triggers, including RSS feed updates. In this case i have it in a Proxmox VM, but it could easily run on a Raspberry Pi (3 or 4b) as well.

To set this up, we can go to the [AWS Status Page](https://health.aws.amazon.com/health/status) and find the RSS feeds we care about. In this case, however, I wanted multi-region on `US-EAST-1`, which happens to be an rss feed.

```
https://status.aws.amazon.com/rss/multipleservices-us-east-1.rss
```

Hopefully this doesn't change often, but if it does, you can always find the latest RSS feed links on the AWS Status Page.

Anyway in home assistant, we can add an integration with `Feedreader` which can monitor rss feeds. Once we have that set up, we can create an automation that triggers when a new entry is added to the AWS RSS feed. More specifically, we want to know when the description changes as thats the tag they use for the status updates. Then we can have Home Assistant send us a notification via our preferred method (I use the app notification on my phone).

Assuming you have the Feedreader integration set up, the automation would look something like this:

```yaml
alias: AWS Status Notification
description: ''
triggers:
  - trigger: state
    entity_id:
      - event.multiple_services_n_virginia_service_status # this is the feedreader entity for the rss feed
    attribute: description
conditions: []
actions:
  - device_id: my_mobile_phone_id_here
    domain: mobile_app
    type: notify
    message: ⚠️ AWS Status Has An Update
    title: AWS Notification
mode: single
```

Here is a screenshot also of the automation in Home Assistant: ![Home Assistant AWS Notification Automation](/img/screenshot-aws-status-notification.png)

There is one final thing we need to setup though. By default, the Feedreader integration only occasionally checks for updates (I believe every hour). This is not ideal for our use case, as we want to be notified as soon as possible when there is an outage. To fix this, we can adjust the scan interval for the Feedreader integration to check more frequently.

This is done in yet another automation that runs every 10 minutes and forces the Feedreader to check for updates. Here is what that automation looks like:

```yaml
alias: Poll AWS Status every 10 minutes
description: ''
triggers:
  - trigger: time_pattern
    minutes: /10
conditions: []
actions:
  - action: homeassistant.update_entity
    metadata: {}
    data:
      entity_id:
        - event.multiple_services_n_virginia_service_status # again, the feedreader entity for the rss feed, yours will likely be different
mode: single
```

![Home Assistant Polling Automation](/img/screenshot-aws-poll-status.png)
With these two automations in place, Home Assistant will now monitor the AWS status RSS feed and notify you immediately when there are any updates regarding service outages or issues. This way, you can stay informed and take action as needed to mitigate any potential impact on your services running on AWS. And at most you will get a notification every 10 minutes if there is an ongoing issue, and you can check the AWS status page for more details.

While this assumes that AWS is posting updates to the RSS feed in a timely manner, it's still a good way to stay informed about the status of your cloud services without relying on AWS itself to notify you.

Happy automating. I hope the recent AWS outage didn't cause you too much trouble!
