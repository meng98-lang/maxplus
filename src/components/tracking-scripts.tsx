"use client";

import { useEffect } from "react";

interface Pixel {
  id: string;
  type: string;
  name: string;
  pixelId: string;
  customCode: string;
  enabled: boolean;
}

export default function TrackingScripts() {
  useEffect(() => {
    fetch("/api/pixels")
      .then(res => res.json())
      .then((pixels: Pixel[]) => {
        pixels.forEach(pixel => {
          if (!pixel.enabled) return;

          if (pixel.type === "google_analytics" && pixel.pixelId) {
            const script = document.createElement("script");
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${pixel.pixelId}`;
            document.head.appendChild(script);

            const inlineScript = document.createElement("script");
            inlineScript.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${pixel.pixelId}');
            `;
            document.head.appendChild(inlineScript);
          }

          if (pixel.type === "facebook_pixel" && pixel.pixelId) {
            const script = document.createElement("script");
            script.innerHTML = `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixel.pixelId}');
              fbq('track', 'PageView');
            `;
            document.head.appendChild(script);
          }

          if (pixel.type === "tiktok_pixel" && pixel.pixelId) {
            const script = document.createElement("script");
            script.innerHTML = `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a)};
                ttq.load('${pixel.pixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `;
            document.head.appendChild(script);
          }

          if (pixel.type === "custom" && pixel.customCode) {
            const div = document.createElement("div");
            div.innerHTML = pixel.customCode;
            document.head.appendChild(div);
          }
        });
      })
      .catch(() => {});
  }, []);

  return null;
}
