BUILDDIR=./build/
TARGET=$(HOME)/
WEBDOC=$(BUILDDIR)/docs
STYLEDIR=$(WEBDOC)/css
SCRIPTDIR=$(WEBDOC)/js
DOCTEST=$(SCRIPTDIR)/spec
CP=/bin/cp
MKDIR=/bin/mkdir -p

.DEFAULT_GOAL=build

$(WEBDOC):
	if [ ! -d $@ ]; then $(MKDIR) $(WEBDOC); fi

$(STYLEDIR): $(WEBDOC)
	if [ ! -d $@ ]; then $(MKDIR) $(STYLEDIR); fi

$(SCRIPTDIR): $(WEBDOC)
	if [ ! -d $@ ]; then $(MKDIR) $(SCRIPTDIR); fi

$(DOCTEST): $(WEBDOC)
	if [ ! -d $@ ]; then $(MKDIR) $(DOCTEST); fi

directories: $(WEBDOC) $(DOCTEST) $(STYLEDIR) $(SCRIPTDIR)

$(STYLEDIR)/%.css : $(STYLEDIR)
	$(CP) css/$(@F) $@

$(SCRIPTDIR)/%.js : $(SCRIPTDIR)
	$(CP) js/$(@F) $@

life4: $(STYLEDIR)/life.css $(SCRIPTDIR)/life4.js
	$(CP) html/life.htm $(WEBDOC)

life5: $(STYLEDIR)/life5.css $(SCRIPTDIR)/life5.js
	$(CP) html/life_oncanvas.htm $(WEBDOC)

fallingblocks: $(STYLEDIR)/FallingBlocks.css $(SCRIPTDIR)/FallingBlocks.js
	$(CP) html/FallingBlocks.htm $(WEBDOC)

conway: $(SCRIPTDIR)/LifeBoard.js $(SCRIPTDIR)/LifeCell.js $(SCRIPTDIR)/LifeInterface.js $(STYLEDIR)/life5.css
	$(CP) html/ConwaysGameOfLife.htm $(WEBDOC)

conway_test: $(DOCTEST) conway
	$(CP) tests/ConwaysLifeTests.htm $(WEBDOC)
	$(CP) tests/spec/*.js $(DOCTEST)

clean:
	rm -rf $(BUILDDIR)

sudoku: $(SCRIPTDIR)/SudokuApp.js $(STYLEDIR)/sudoku.css
	$(CP) html/Sudoku.htm $(WEBDOC)

build: conway conway_test fallingblocks life4 life5 sudoku

install: build
	if [ -d $(SCRIPTDIR)/node_modules ]; then rm -rf $(SCRIPTDIR)/node_modules; fi
	$(CP) -r $(BUILDDIR)/* $(TARGET)

.ONESHELL:
test: build
	$(CP) tests/grunt.js $(SCRIPTDIR);
	cd $(SCRIPTDIR); \
	npm install grunt-jasmine-node; \
	grunt

