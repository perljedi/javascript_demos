BUILDDIR=./build/
TARGET=$(HOME)/
WEBDOC=$(BUILDDIR)/docs
STYLEDIR=$(WEBDOC)/css
SCRIPTDIR=$(WEBDOC)/js
LIBDIR=$(WEBDOC)/js/lib
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
$(LIBDIR): $(WEBDOC)
	if [ ! -d $@ ]; then $(MKDIR) $(LIBDIR); fi

$(DOCTEST): $(WEBDOC)
	if [ ! -d $@ ]; then $(MKDIR) $(DOCTEST); fi

directories: $(WEBDOC) $(DOCTEST) $(STYLEDIR) $(SCRIPTDIR)

$(STYLEDIR)/%.css : $(STYLEDIR)
	$(CP) css/$(@F) $@

$(LIBDIR)/%.js : $(LIBDIR)
	$(CP) lib/$(@F) $@

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

sudoku: $(SCRIPTDIR)/SudokuApp.js $(STYLEDIR)/sudoku.css $(LIBDIR)/jquery-1.10.2.js $(LIBDIR)/angular.js $(LIBDIR)/angular-mocks.js
	$(CP) html/Sudoku.htm $(WEBDOC)

build: conway conway_test fallingblocks life4 life5 sudoku

install: build
	if [ -d $(SCRIPTDIR)/node_modules ]; then rm -rf $(SCRIPTDIR)/node_modules; fi
	$(CP) -r $(BUILDDIR)/* $(TARGET)

.ONESHELL:
test: build
	$(CP) tests/Gruntfile.js $(SCRIPTDIR);
	$(CP) tests/require.js $(SCRIPTDIR);
	cd $(SCRIPTDIR); \
	npm install grunt-contrib-jasmine --save-dev; \
	npm install grunt-template-jasmine-requirejs; \
	npm install grunt-lib-phantomjs; \
	grunt

