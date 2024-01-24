// https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
// https://www.style-dictionary-play.dev/

// Sending messages back and forth between iframe and iframe wrapper site

// iframe.contentWindow.postMessage() to send message
// window.eventListener('message') to receive

// Create an iframe and load your style-dictionary-play project by URL
const sdpIframe = document.createElement("iframe");

sdpIframe.src =
  "https://style-dictionary-play.dev/#project=tVXNjoIwEH4VgzdDwL1ssl43ca97X81mhIJFbElbjITw7tspIFB/MOrOAcr8zzdfQ+kEnEU09hLJmbNwyhWbTFaO5LkIyMpZTH5QgSrFd4RJfzbzZ8Z55aBl7dYBWQoq4mIvMaZsYwLZ/zZZBDCJjl+C5xkaGy+388kEieixtslwYNrkNA2/QW1rq/n0dbw/8IpoSmSveZSyO6JLSKSiDBTFQTDV7wEEhY0O9Ib9NCl1y6BO/fon7xqGWqr2uK4PldsCkdyDQyLHZ01eMGo3aXJ70AQOIANBM+UT+X5zUnzpR+W4LVECEKF5WNRC1YAkWwIhZbEFUMBTLgY6A1uRkWYJtd3tWw+Q5o25NHYv4kx5G5DEM7aqm6GyV6TIUf1fD4oIRUEUV/u4ACBG+6Z5C0GrLc0N7WT1HgsozlpPabxVlnZsJGuo6aeRARkGAOxJSPP9k0U+jFwvEoLYPVnizchFUle9CyZI+DgDpsvlXEtv225/Q4SwJ3LP55j9fiYZHo4xCZ0sJp2R65FLYGissTznfw8RSfTPSK+2eE05A/DNgu2tfFU9KDxk5vglr/4A";
document.body.appendChild(sdpIframe);

// Wait for iframe to load before we send postMessage to it
sdpIframe.addEventListener("load", () => {
  // Catch the response from the SDP iframe
  window.addEventListener("message", (ev) => {
    const { data } = ev;
    switch (data.type) {
      case "sd-dictionary":
        // Request enriched tokens from the SDP iframe based on first configured platform
        sdpIframe.contentWindow.postMessage(
          {
            type: "sd-enriched-tokens-request",
            platform: Object.keys(data.dictionary.platforms)[0],
          },
          "*"
        );
        break;
      case "sd-enriched-tokens":
        const { tokens, allTokens } = data;
        // These tokens are fully parsed, resolved, meta-data applied
        console.log(tokens, allTokens);
        break;
    }
  });

  // Request dictionary object from the SDP iframe
  sdpIframe.contentWindow.postMessage({ type: "sd-dictionary-request" }, "*");
});
