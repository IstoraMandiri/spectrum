/* eslint-disable no-alert, global-require */

if (process.env.NODE_ENV === 'production') {
  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install({
    onUpdateReady: () => {
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      if (window.confirm('A new version of the app has been pushed. Would you like to reload?')) {
        window.location.reload();
      }
    },
  });
}
