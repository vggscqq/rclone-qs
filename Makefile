ZIP_FILE := rclone-qs.zip
SOURCE_DIR := .

.PHONY: all clean

#all: $(ZIP_FILE)

#$(ZIP_FILE): $(wildcard $(SOURCE_DIR)/*)
#	rm -f $(ZIP_FILE)
#	zip -r $@ $(SOURCE_DIR)
#

dev:
	-gnome-extensions uninstall rclone-qs@vggscqq.github.com
	rm rclone-qs@vggscqq.github.com.shell-extension.zip
	gnome-extensions pack
	gnome-extensions install --force ./rclone-qs@vggscqq.github.com.shell-extension.zip
	#dbus-run-session -- gnome-shell --nested --wayland
	gnome-extensions enable rclone-qs@vggscqq.github.com

clean:
	rm -f $(ZIP_FILE)

