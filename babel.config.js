module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    'next/babel' // Add this if you are using Next.js specific Babel features like `next/image`
  ],
};
