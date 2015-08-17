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
    print "request path: $regPath\n";

    #init();

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
                return 1;
            } else {
                print "error executing command: $command: $!\n";
                print $handle "error: $!";
                return 1;
            }
        }

        #switch
        if ($reqPieces[1] eq "switch") {
            if ($reqPieces[2] eq "on" or $reqPieces[2] eq "off") {
                my $command = "sudo python ./RelaySwitcher/executables/$reqPieces[2].py " . (15 + $reqPieces[3]);
                my $result = `$command`;
                if ($? == 0) {
                    print $handle "OK";
                } else {
                    print $handle "error: $!";
                }
                return 1;
            }

            print "invalid switch\n";
            return;
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

            print color("green");
            print "200 Request served without error\n";
            print color("reset");
            return 1;
        } 

        print color("red");
        print "404 unable to find requested file\n";
        print color("reset");

        print $handle "HTTP/1.1 404 UNABLE TO FIND RESOURCE\r\n\r\n";
    }
}
1;
