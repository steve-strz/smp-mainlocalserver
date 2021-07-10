#!/usr/bin/expect -f

set prompt "#"
set address [lindex $argv 0]

spawn sudo bluetoothctl
expect -re $prompt
send "scan on\r"
send_user "\nSleeping\r"
sleep 20
send_user "\n Done sleeping\r"
send "scan off\r"
send "quit\r"
expect eof
