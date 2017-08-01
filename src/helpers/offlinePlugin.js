/* eslint-disable no-alert, global-require */

const enabled = process.env.NODE_ENV === 'production';

// TODO start a timer and auto-refresh if we're not
if (enabled) {
  let autoReload = true;
  setTimeout(() => { autoReload = false; }, 10 * 1000); // 10 secs
  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install({
    onUpdateReady: () => {
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      if (autoReload) {
        return window.location.reload();
      }
      if (window.confirm('A new version of the app has been pushed. Would you like to reload?')) {
        return window.location.reload();
      }
      return null;
    },
  });
}
