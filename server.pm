package relays;

use Cwd;
use Term::ANSIColor;

sub init {
    system("sudo echo 22 > /sys/class/gpio/export");
    system("sudo echo 23 > /sys/class/gpio/export");
}

sub handleRequest {
    my $handle = $_[1];
    my $reqType = $_[2];
    my $regPath = "RelaySwitcher/public" . $_[3];
	my $reqBody = $_[4];
    print "request path: $regPath\n";

    if ($reqType eq "POST") {
        print "recieved content: $reqBody\n";
        print $handle "HTTP/1.1 200 OK\r\n\r\n";
        return "OK";
    }

    if ($reqType eq "GET") {
        #search apis
        my @reqPieces = split("/", $_[3]);

        #status
        if ($reqPieces[1] eq "status") {
            my $command = "sudo python ./RelaySwitcher/executables/status.py " . (22 + $reqPieces[2]);
            my $result = `$command`;
            if ($? == 0) {
                print "command: $command: $result";
                print $handle $result;
                return "OK";
            } else {
                return "error executing command: $command: $?"
            }
        }

        #switch
        if ($reqPieces[1] eq "switch") {
            if ($reqPieces[2] eq "on" or $reqPieces[2] eq "off") {
                my $command = "sudo python ./RelaySwitcher/executables/$reqPieces[2].py " . (15 + $reqPieces[3]);
                my $result = `$command`;
                if ($? == 0) {
                    print $handle "OK";
                    return "OK";
                } else {
                    return "error: $!";
                }
            }

            return "invalid switch";
        }

        #main page
        print "reqPieces length: @reqPieces\n";
        if (@reqPieces == 0) {
            print $handle "HTTP/1.1 307 REDIRECT\r\n";
            print $handle "Location: /" . __PACKAGE__ . "/views/index.html\r\n\r\n";
            return "OK";
        }

        #search files
        if (-e $regPath) {
            print $handle "HTTP/1.1 200 OK\r\n\r\n";
            my $file;
            open($file, "<" . $regPath);
            while (<$file>) {
                print $handle $_;
            }
            close $file;
            return "OK";
        } 

        return "unable to find requested file";
    }
    return "unable to find requested file";
}
1;
