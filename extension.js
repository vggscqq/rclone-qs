const {Gio, GObject} = imports.gi;
const {PACKAGE_VERSION} = imports.misc.config;

const Util = imports.misc.util;

const QuickSettings = imports.ui.quickSettings;
const QuickSettingsMenu = imports.ui.main.panel.statusArea.quickSettings;

const FeatureToggle = GObject.registerClass(
  class FeatureToggle extends QuickSettings.QuickToggle {
    _init() {
      super._init({
        'title': 'rclone-qs',
        toggleMode: true,
      });

      this.iconName = 'folder-remote-symbolic';
      this.connectObject(
        'clicked', () => this._toggleMode(),
        this);

    }

    _toggleMode() {
      if(this.checked) {
        log("Enabled");
        Util.spawn(['rclone-mount.sh'])
      }
      else {
        log("Disabled");
        Util.spawn(['rclone-mount.sh'])
      }

      if (this.checked) {
        // Create the FeatureIndicator object if it doesn't exist already.
        if (!this._indicator) {
          this._indicator = new topIndicator();
          log('dsdfsfsdf')
        }
      
        // Add the FeatureIndicator object to the QuickSettingsMenu.
        //QuickSettingsMenu._indicators.add_child(this._indicator);
      }

      else {
        // Destroy the FeatureIndicator object if it exists.
        if (this._indicator) {
          this._indicator.destroy();
          this._indicator = null;
        }
      }
    }
  }
);

const topIndicator = GObject.registerClass(
  class topIndicator extends QuickSettings.SystemIndicator {
    _init() {
      super._init();

      this._indicator = this._addIndicator();
      this._indicator.iconName = 'folder-remote-symbolic';

      this.quickSettingsItems.push(new FeatureToggle());

      this.connect('destroy', () => {
        this.quickSettingsItems.forEach((item) => item.destroy());
      });

      QuickSettingsMenu._indicators.add_child(this);
    }
  }
);

const FeatureIndicator = GObject.registerClass(
  class FeatureIndicator extends QuickSettings.SystemIndicator {
    _init() {
      super._init();

      this._indicator = this._addIndicator();
      this._indicator.iconName = 'folder-remote-symbolic';

      this.quickSettingsItems.push(new FeatureToggle());

      this.connect('destroy', () => {
        this.quickSettingsItems.forEach((item) => item.destroy());
      });

      //QuickSettingsMenu._indicators.add_child(this);
      QuickSettingsMenu._addItems(this.quickSettingsItems);
    }
  }
);


class Extension {
  constructor(uuid) {
    this._uuid = uuid;
    this._indicator = null;
  }

  enable() {
    this._indicator = new FeatureIndicator();
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
  }
}

function init(meta) {
  return new Extension(meta.uuid);
}
