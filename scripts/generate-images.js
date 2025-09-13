const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class ImagenImageGenerator {
  constructor() {
    this.auth = new GoogleAuth({
      keyFile: './sa-private-key.json',
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    this.projectId = 'yobi-2f529';
    this.location = 'us-central1';
  }

  async getAccessToken() {
    const client = await this.auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken.token;
  }

  async generateImage(prompt, outputPath, aspectRatio = '16:9', imageCount = 1) {
    try {
      const accessToken = await this.getAccessToken();

      const requestBody = {
        instances: [{
          prompt: prompt
        }],
        parameters: {
          sampleCount: imageCount,
          aspectRatio: aspectRatio,
          safetyFilterLevel: "block_some",
          personGeneration: "allow_adult"
        }
      };

      const response = await axios.post(
        `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/publishers/google/models/imagen-3.0-generate-001:predict`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data && response.data.predictions && response.data.predictions.length > 0) {
        const imageData = response.data.predictions[0];

        // Save base64 image to file
        if (imageData.bytesBase64Encoded) {
          const buffer = Buffer.from(imageData.bytesBase64Encoded, 'base64');
          fs.writeFileSync(outputPath, buffer);
          console.log(`✅ Image generated successfully: ${outputPath}`);
          return outputPath;
        }
      }

      throw new Error('No image data received from API');
    } catch (error) {
      console.error(`❌ Error generating image: ${error.message}`);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      }
      throw error;
    }
  }
}

// Image prompts for the website
const imagePrompts = {
  // Portfolio images
  'digital-banking.jpg': {
    prompt: 'Professional digital banking dashboard interface on laptop screen, modern fintech design, clean UI with charts and financial data, blue and green color scheme, high-tech office environment, realistic photography style',
    aspectRatio: '16:9'
  },
  'education-platform.jpg': {
    prompt: 'Modern educational technology platform, students using tablets and laptops, interactive learning environment, diverse young people engaged in digital learning, bright classroom setting, inspiring and inclusive atmosphere',
    aspectRatio: '16:9'
  },
  'healthcare-analytics.jpg': {
    prompt: 'Healthcare data visualization on multiple monitors, medical analytics dashboard, hospital setting, healthcare professionals analyzing patient data, clean modern medical technology interface, professional medical environment',
    aspectRatio: '16:9'
  },
  'environmental-platform.jpg': {
    prompt: 'Environmental monitoring dashboard with satellite imagery, forest conservation data, indigenous community members using technology, sustainable technology in natural setting, earth tones and green colors',
    aspectRatio: '16:9'
  },

  // Service category images
  'digital-transformation.jpg': {
    prompt: 'Digital transformation concept, organization evolving from traditional to digital, modern office with people collaborating using digital tools, transformation arrows, professional business setting',
    aspectRatio: '16:9'
  },
  'web-platform-engineering.jpg': {
    prompt: 'Software engineering team working on web platform development, multiple monitors showing code and interfaces, modern tech office, collaborative development environment, clean and professional',
    aspectRatio: '16:9'
  },
  'data-insights.jpg': {
    prompt: 'Data analytics and insights visualization, beautiful data dashboards on screens, business intelligence interface, professional analyst working with data, modern office with analytics displays',
    aspectRatio: '16:9'
  },
  'resilient-systems.jpg': {
    prompt: 'Secure and resilient technology infrastructure, network visualization, cybersecurity concept, server room with advanced security systems, high-tech security monitoring, professional IT environment',
    aspectRatio: '16:9'
  },

  // Hero and about images
  'hero-background.jpg': {
    prompt: 'Abstract digital transformation concept, connecting networks and communities, bridge metaphor with digital elements, inspiring and professional, blue and purple gradients, modern and clean',
    aspectRatio: '21:9'
  },
  'about-mission.jpg': {
    prompt: 'Global impact and collaboration, diverse people working together with technology, world map with connection points, mission-driven organization atmosphere, inspiring and inclusive',
    aspectRatio: '16:9'
  }
};

async function generateAllImages() {
  const generator = new ImagenImageGenerator();
  const publicDir = path.join(__dirname, '../public/generated');

  // Create directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('🎨 Starting image generation...\n');

  for (const [filename, config] of Object.entries(imagePrompts)) {
    const outputPath = path.join(publicDir, filename);

    try {
      console.log(`Generating: ${filename}`);
      console.log(`Prompt: ${config.prompt.substring(0, 100)}...`);

      await generator.generateImage(
        config.prompt,
        outputPath,
        config.aspectRatio
      );

      // Add a delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`Failed to generate ${filename}:`, error.message);
    }

    console.log(''); // Empty line for readability
  }

  console.log('🎉 Image generation complete!');
  console.log(`📁 Images saved to: ${publicDir}`);
}

// Run if called directly
if (require.main === module) {
  generateAllImages().catch(console.error);
}

module.exports = { ImagenImageGenerator, generateAllImages };