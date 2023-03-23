EXTENSION_NAME = TextSelectionPosition
VERSION = 1.0
ZIP_FILE = $(EXTENSION_NAME)-v$(VERSION).zip

FILES = \
	manifest.json \
	background.js \
	contentScript.js \
	styles.css \
	icon.png

package:
	zip -r $(ZIP_FILE) $(FILES)

.PHONY: package
