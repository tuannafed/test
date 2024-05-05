/**
 * @type {import('next').NextConfig}
 */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: [
      'quizzes.vfftech.com',
      'quizzes.chuctet.online',
      'images.unsplash.com',
      'localhost',
      'vumax.me',
      'lipsum.app',
      'northernlightspizza.com'
    ]
  },
  env: {
    siteName: 'Classifieds',
    uploadSizeLimit: 20971520,
    uploadAcceptType: 'image/jpeg, image/png',
    formLimitTextarea: 500
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  }
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });

// module.exports = withBundleAnalyzer({
//   reactStrictMode: true
// });
