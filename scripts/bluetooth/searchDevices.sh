#!/usr/bin/expect -f

set prompt "#"
set address [lindex $argv 0]

spawn sudo bluetoothctl
expect -re $prompt
send "scan on\r"
send_user "\n[i] Searching bluetooth devices\r"
sleep 10
send_user "\n[i] Done searching bluetooth devices\r"
send "scan off\r"
send "quit\r"
expect eof
