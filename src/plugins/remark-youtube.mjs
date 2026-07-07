// Wandelt Absätze, die NUR aus einer YouTube-Adresse bestehen, in eine
// DSGVO-freundliche 2-Klick-Einbettung um: Es wird erst dann eine Verbindung
// zu YouTube aufgebaut (youtube-nocookie.com), wenn die Leserin klickt.
// Das Klick-Verhalten und die Optik liefert src/components/YouTubeConsent.astro.
const YT_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})(?:[?&#]\S*)?$/;

function consentHtml(videoId) {
  // videoId ist per Regex auf [A-Za-z0-9_-]{11} beschränkt — kein Escaping nötig.
  return [
    `<div class="yt-consent" data-yt-id="${videoId}">`,
    '  <button type="button" class="yt-consent-button">',
    '    <span class="yt-consent-play" aria-hidden="true"></span>',
    '    <span class="yt-consent-label">Video ansehen</span>',
    '    <span class="yt-consent-hint">Erst beim Klick wird eine Verbindung zu YouTube hergestellt (youtube-nocookie.com).</span>',
    '  </button>',
    '</div>',
  ].join('\n');
}

export default function remarkYoutube() {
  return (tree) => {
    const transform = (node) => {
      if (!node.children) return;

      node.children.forEach((child, index) => {
        if (child.type === 'paragraph' && child.children?.length === 1) {
          const only = child.children[0];
          const raw =
            only.type === 'link' ? only.url : only.type === 'text' ? only.value.trim() : '';
          const match = raw.match(YT_REGEX);
          if (match) {
            node.children[index] = { type: 'html', value: consentHtml(match[1]) };
            return;
          }
        }
        transform(child);
      });
    };

    transform(tree);
  };
}
