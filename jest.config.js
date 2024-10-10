module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!react-native|react-native-linear-gradient|@react-native|other-libraries-that-need-transpiling)"
  ],
  preset: "react-native",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
};
