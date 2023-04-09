exports.config = {
  baseUrl: "http://localhost:4200/",
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../../features/*.feature"],
  cucumberOpts: {
    require: ["./step-definitions/*.steps.ts"],
    format: "progress",
    strict: false,
    requireModule: ["ts-node/register"],
  },
};
