// .vuepress/plugins/permalinkCollector.js
const fs = require('fs');
const path = require('path');

module.exports = (options, ctx) => {
  const permalinks = [];

  return {
    extendPageData(page) {
      if (page.frontmatter.permalink) {
        // Determine the output path in the build directory (dist folder)
        const outputPath = page.frontmatter.permalink.endsWith('/')
          ? `${page.frontmatter.permalink}index.html`
          : `${page.frontmatter.permalink}.html`;
        
        permalinks.push({
          permalink: page.frontmatter.permalink,
          buildFilePath: outputPath
        });
      }
    },

    generated() {
      const outputDir = ctx.outDir;
      const outputFile = path.resolve(outputDir, 'permalinks.json');

      // Write permalinks to a JSON file in the output directory
      fs.writeFileSync(outputFile, JSON.stringify(permalinks, null, 2));
      console.log(`Permalink data saved to ${outputFile}`);
    }
  };
};
