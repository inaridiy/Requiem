module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Requiem",
        win: {
          icon: "src/assets/logo.png",
          target: [
            {
              target: "nsis", // 'zip', 'nsis', 'portable'
              arch: ["x64"], // 'x64', 'ia32'
            },
          ],
        },
      },
    },
  },
};
