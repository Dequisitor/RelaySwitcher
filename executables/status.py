str = ""
relay0 = open('/sys/class/gpio/gpio22/value', 'r')
relay1 = open('/sys/class/gpio/gpio23/value', 'r')

if int(relay0.read().strip()) == 0:
	str += "on/"
else:
	str += "off/"

if int(relay1.read().strip()) == 0:
	str += "on"
else:
	str += "off"

print str
