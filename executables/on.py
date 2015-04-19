import sys
import RPi.GPIO as io

pin = int(sys.argv[1])
io.setmode(io.BOARD)
io.setup(pin, io.OUT)
io.output(pin, 0)
