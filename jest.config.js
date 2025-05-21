module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    // Handle CSS imports (if you use CSS modules)
    '\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module aliases (if you have them in jsconfig.json or tsconfig.json)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/img/(.*)$': '<rootDir>/public/img/$1', // Example if you have images in public/img
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
  },
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\.module\.(css|sass|scss)$',
  ],
   // Automatically clear mock calls and instances between every test
  clearMocks: true,
};
