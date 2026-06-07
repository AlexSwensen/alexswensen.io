'use client';

import { useEffect } from 'react';

type TrackPayload = {
  eventType: 'view' | 'click';
  username: string;
  linkId?: string;
  referrer?: string;
};

type LinktreeTrackerProps = {
  apiBaseUrl: string;
  username: string;
};

const trackEvent = (apiBaseUrl: string, payload: TrackPayload) => {
  const body = JSON.stringify({
    ...payload,
    referrer: document.referrer || undefined,
  });

  const endpoint = `${apiBaseUrl}/analytics/events`;

  if (typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  });
};

export function LinktreeTracker({ apiBaseUrl, username }: LinktreeTrackerProps) {
  useEffect(() => {
    trackEvent(apiBaseUrl, {
      eventType: 'view',
      username,
    });
  }, [apiBaseUrl, username]);

  return null;
}

export function trackLinkClick(apiBaseUrl: string, username: string, linkId: string) {
  trackEvent(apiBaseUrl, {
    eventType: 'click',
    username,
    linkId,
  });
}
