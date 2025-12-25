const { defineConfig } = required('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWeight: 1280,
  e2e: {},
  video: true,
});
