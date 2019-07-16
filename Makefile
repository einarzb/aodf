CC=arm-linux-gnueabi-gcc
# CC=gcc
ALL=run_root_settings
TGT=/data/run_root_settings
# -s :Remove all symbol table and relocation information from the executable.

all: $(ALL)

clean:
	rm -f $(ALL)

install: $(ALL)
	mv $^ $(TGT)
	chmod +s $(TGT)$^
