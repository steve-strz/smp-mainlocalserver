#!/usr/bin/expect -f

set prompt "#"
set address [lindex $argv 0]

spawn sudo bluetoothctl
expect -re $prompt
send "scan on\r"
send_user "\nSearching bluetooth devices\r"
sleep 10
send_user "\nDone searching bluetooth devices\r"
send "scan off\r"
send "quit\r"
expect eof
