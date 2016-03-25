import sys

result = ""
fileName = "/sys/class/gpio/gpio" + sys.argv[1] + "/value"
relay = open(fileName, "r")

if int(relay.read().strip()) == 0:
	result = "1"
else:
	result = "0"

relay.close()
print result
