// Ermittelt die Lesezeit eines Artikels aus der Wortzahl (ca. 200 Wörter/Minute)
// und stellt sie den Seiten als remarkPluginFrontmatter.lesezeit (Minuten) bereit.
export default function remarkLesezeit() {
  return (tree, file) => {
    let words = 0;

    const visit = (node) => {
      if (node.type === 'text' || node.type === 'inlineCode') {
        words += node.value.split(/\s+/).filter(Boolean).length;
      }
      if (node.children) {
        for (const child of node.children) visit(child);
      }
    };
    visit(tree);

    file.data.astro.frontmatter.lesezeit = Math.max(1, Math.round(words / 200));
  };
}
