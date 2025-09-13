const { ImagenImageGenerator } = require('./generate-images.js');
const path = require('path');

const fixedPrompts = {
  'education-platform.jpg': {
    prompt: 'Educational technology classroom, diverse students engaged with digital learning tablets, modern classroom setting with interactive whiteboards, collaborative learning environment, bright and inspiring atmosphere',
    aspectRatio: '16:9'
  },
  'hero-background.jpg': {
    prompt: 'Abstract digital transformation background, connecting networks and communities, bridge metaphor with digital elements, professional and inspiring, blue and purple gradients, modern clean design',
    aspectRatio: '16:9' // Changed from 21:9 to 16:9
  }
};

async function fixFailedImages() {
  const generator = new ImagenImageGenerator();
  const publicDir = path.join(__dirname, '../public/generated');

  console.log('🔧 Fixing failed image generation...\n');

  for (const [filename, config] of Object.entries(fixedPrompts)) {
    const outputPath = path.join(publicDir, filename);

    try {
      console.log(`Regenerating: ${filename}`);
      console.log(`Prompt: ${config.prompt.substring(0, 100)}...`);

      await generator.generateImage(
        config.prompt,
        outputPath,
        config.aspectRatio
      );

      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`Failed to regenerate ${filename}:`, error.message);
    }

    console.log('');
  }

  console.log('🎉 Image fixing complete!');
}

fixFailedImages().catch(console.error);