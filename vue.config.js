module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Requiem",
        appId:"com.electron.requiem",
        mac: {
          icon: "src/assets/logo.png",
          target: "dmg",
        },
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
