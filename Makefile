WEBDOC=~/docs
STYLEDIR=$(WEBDOC)/css
SCRIPTDIR=$(WEBDOC)/js
CP=/bin/cp
MKDIR=/bin/mkdir

$(WEBDOC):
	if [ ! -d $@ ]; then $(MKDIR) $(WEBDOC); fi

$(STYLEDIR): $(WEBDOC)
	if [ ! -d $@ ]; then $(MKDIR) $(STYLEDIR); fi

$(SCRIPTDIR): $(WEBDOC)
	if [ ! -d $@ ]; then $(MKDIR) $(SCRIPTDIR); fi

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

all: life4 life5 fallingblocks

default: all


